import { expect } from 'chai';
import { urlService } from '../src/services/urlService';

describe('URL Service', () => {
  const testUrl = 'https://example.com';
  let shortCode: string;

  it('should create a new shortened URL', async () => {
    const result = await urlService.createUrl(testUrl);
    expect(result.originalUrl).to.equal(testUrl);
    expect(result.shortCode).to.have.length(10);
    shortCode = result.shortCode;
  });

  it('should retrieve an existing URL', async () => {
    const result = await urlService.getUrl(shortCode);
    expect(result.originalUrl).to.equal(testUrl);
  });

  it('should update an existing URL', async () => {
    const newUrl = 'https://updated-example.com';
    const result = await urlService.updateUrl(shortCode, newUrl);
    expect(result.originalUrl).to.equal(newUrl);
  });

  it('should delete an existing URL', async () => {
    const result = await urlService.deleteUrl(shortCode);
    expect(result).to.be.true;
  });
}); 