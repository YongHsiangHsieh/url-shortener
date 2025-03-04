import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import { cacheService } from './cacheService';
import { bloomFilterService } from './bloomFilterService';

const prisma = new PrismaClient();

export class UrlService {
  private generateShortCode(): string {
    return nanoid(10);
  }

  async createUrl(originalUrl: string, shortCode?: string, ttl?: number): Promise<any> {
    const code = shortCode || this.generateShortCode();
    const expiresAt = ttl ? new Date(Date.now() + ttl * 1000) : null;

    const url = await prisma.shortenedURL.create({
      data: {
        originalUrl,
        shortCode: code,
        expiresAt,
      },
    });

    // Add to Bloom Filter
    bloomFilterService.add(code);

    if (ttl) {
      await cacheService.set(code, originalUrl, ttl);
    } else {
      await cacheService.set(code, originalUrl);
    }

    return url;
  }

  async getUrl(shortCode: string): Promise<any> {
    // Check Bloom Filter first
    if (!bloomFilterService.mightExist(shortCode)) {
      return null; // URL definitely doesn't exist
    }

    // Try cache first
    const cachedUrl = await cacheService.get(shortCode);
    if (cachedUrl) {
      return {
        shortCode,
        originalUrl: cachedUrl,
      };
    }

    // If not in cache, check database
    const url = await prisma.shortenedURL.findUnique({
      where: { shortCode },
    });

    if (!url) {
      return null;
    }

    if (url.expiresAt && url.expiresAt < new Date()) {
      await this.deleteUrl(shortCode);
      return null;
    }

    // Cache the result for future requests
    await cacheService.set(shortCode, url.originalUrl);
    return url;
  }

  async updateUrl(shortCode: string, originalUrl: string): Promise<any> {
    // Check Bloom Filter first
    if (!bloomFilterService.mightExist(shortCode)) {
      throw new Error('URL does not exist');
    }

    const url = await prisma.shortenedURL.update({
      where: { shortCode },
      data: { originalUrl },
    });

    await cacheService.set(shortCode, originalUrl);
    return url;
  }

  async deleteUrl(shortCode: string): Promise<boolean> {
    try {
      await prisma.shortenedURL.delete({
        where: { shortCode },
      });
      await cacheService.del(shortCode);
      
      // Note: We can't truly remove from Bloom Filter
      // We'll handle this through periodic rebuilds
      return true;
    } catch {
      return false;
    }
  }
}

export const urlService = new UrlService(); 