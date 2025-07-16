import { buildPdf } from '@/actions/build-pdf';
import { ContentItem } from '@/types/pdf/ContentItem';
import { ContentRendererTypes } from '@/config/pdf-setup';

describe('buildPdf', () => {
  it('returns success message and data URI', async () => {
    const items = [
      new ContentItem({
        content: {
          name: 'John Doe',
          email: 'john@example.com',
          website: 'example.com',
          phone: '555-5555',
          summary: 'Test summary'
        },
        rendererKey: ContentRendererTypes.TITLE
      })
    ];

    const result = await buildPdf(items, 'Test');
    expect(result.message).toBe('SUCCESS');
    expect(result.dataUriString).toMatch(/^data:application\/pdf;.*base64,/);
  });
});
