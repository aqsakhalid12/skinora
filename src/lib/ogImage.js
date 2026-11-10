import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };
// Which part of the square photo is shown (px from the top of the 1200x1200 image)
const OG_OFFSET = 420;

// Social preview: public/images/og-image.jpg cropped to 1200x630 + brand name
export async function renderOgImage() {
  const file = await readFile(path.join(process.cwd(), 'public', 'images', 'og-image.jpg'));
  const src = `data:image/jpeg;base64,${file.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', background: '#f6f1ea' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={1200} height={1200} alt="" style={{ position: 'absolute', left: 0, top: -OG_OFFSET }} />
        <div style={{ position: 'absolute', top: 56, left: 0, width: '100%', display: 'flex', justifyContent: 'center', fontSize: 64, letterSpacing: 18, color: '#1f1b18' }}>
          SKINORA
        </div>
      </div>
    ),
    OG_SIZE
  );
}
