import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const uploadImage = createServerFn({ method: 'POST' })
  .validator(z.object({
    filename: z.string(),
    contentType: z.string(),
    base64Data: z.string()
  }))
  .handler(async ({ data }) => {
    try {
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      // ensure dir exists
      await mkdir(uploadsDir, { recursive: true });
      
      // Basic sanitization
      const safeFilename = data.filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const uniqueFilename = `${Date.now()}-${safeFilename}`;
      const filePath = join(uploadsDir, uniqueFilename);
      
      // Strip off the data:image/png;base64, part if present
      const base64Data = data.base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      await writeFile(filePath, buffer);
      
      return `/uploads/${uniqueFilename}`;
    } catch (e) {
      console.error('File upload failed', e);
      throw new Error('Upload failed');
    }
  });
