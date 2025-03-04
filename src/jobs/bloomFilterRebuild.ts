import { bloomFilterService } from '../services/bloomFilterService';

// Rebuild the Bloom Filter every 24 hours
const REBUILD_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function startBloomFilterRebuildJob() {
  setInterval(async () => {
    console.log('Starting Bloom Filter rebuild...');
    try {
      await bloomFilterService.rebuildFilter();
      console.log('Bloom Filter rebuild completed');
    } catch (error) {
      console.error('Failed to rebuild Bloom Filter:', error);
    }
  }, REBUILD_INTERVAL);
} 