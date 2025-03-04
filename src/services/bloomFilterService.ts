import { BloomFilter } from 'bloom-filters';
import { PrismaClient } from '@prisma/client';

export class BloomFilterService {
  private filter: BloomFilter;
  private prisma: PrismaClient;

  constructor() {
    // Initialize with size 10000 and 7 hash functions
    // The size should be larger than the expected number of items
    // The number of hash functions affects the false positive rate
    this.filter = new BloomFilter(10000, 7);
    this.prisma = new PrismaClient();
    this.initializeFilter();
  }

  private async initializeFilter(): Promise<void> {
    try {
      // Load all existing shortCodes into the filter
      const urls = await this.prisma.shortenedURL.findMany({
        select: { shortCode: true }
      });
      
      urls.forEach(url => {
        this.filter.add(url.shortCode);
      });
      
      console.log('Bloom Filter initialized with existing URLs');
    } catch (error) {
      console.error('Failed to initialize Bloom Filter:', error);
    }
  }

  public add(shortCode: string): void {
    this.filter.add(shortCode);
  }

  public remove(shortCode: string): void {
    // Note: Bloom Filters don't support true removal
    // We'll need to rebuild the filter periodically to handle deletions
    // This is a limitation of Bloom Filters
  }

  public mightExist(shortCode: string): boolean {
    return this.filter.has(shortCode);
  }

  // Method to rebuild the filter (should be called periodically)
  public async rebuildFilter(): Promise<void> {
    this.filter = new BloomFilter(10000, 7);
    await this.initializeFilter();
  }
}

export const bloomFilterService = new BloomFilterService(); 