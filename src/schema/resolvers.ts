import { urlService } from '../services/urlService';

export const resolvers = {
  Query: {
    getUrl: async (_: any, { shortCode }: { shortCode: string }) => {
      return urlService.getUrl(shortCode);
    },
  },
  Mutation: {
    createUrl: async (_: any, { originalUrl, shortCode, ttl }: { originalUrl: string; shortCode?: string; ttl?: number }) => {
      return urlService.createUrl(originalUrl, shortCode, ttl);
    },
    updateUrl: async (_: any, { shortCode, originalUrl }: { shortCode: string; originalUrl: string }) => {
      return urlService.updateUrl(shortCode, originalUrl);
    },
    deleteUrl: async (_: any, { shortCode }: { shortCode: string }) => {
      return urlService.deleteUrl(shortCode);
    },
  },
}; 