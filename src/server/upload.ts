import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { supabase } from '@/lib/supabase'; // ২য় স্টেপে তৈরি করা ফাইল

export const uploadImage = createServerFn({ method: 'POST' })
  .validator(z.object({
    filename: z.string(),
    contentType: z.string(),
    base64Data: z.string()
  }))
  .handler(async ({ data }) => {
    try {
      // ফাইলের নাম ইউনিক করা
      const safeFilename = data.filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const uniqueFilename = `${Date.now()}-${safeFilename}`;

      // base64 ডেটাকে বাফারে (Buffer) কনভার্ট করা
      const base64Data = data.base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Supabase Storage-এ আপলোড করা
      const { data: uploadData, error } = await supabase
        .storage
        .from('sayham-kayes-images') // আপনার তৈরি করা বাকেটের নাম 
        .upload(uniqueFilename, buffer, {
          contentType: data.contentType || 'image/jpeg',
          upsert: true
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw new Error('Supabase Upload failed');
      }

      // আপলোড সাকসেসফুল হলে ছবির পাবলিক লিংক (URL) বের করা
      const { data: publicUrlData } = supabase
        .storage
        .from('sayham-kayes-images')
        .getPublicUrl(uniqueFilename);

      // ডাটাবেসে সেভ করার জন্য পাবলিক লিংকটি রিটার্ন করা
      return publicUrlData.publicUrl;

    } catch (e) {
      console.error('File upload failed', e);
      throw new Error('Upload failed');
    }
  });

export const deleteImageFromStorage = async (imageUrl: string | null | undefined) => {
  try {
    if (!imageUrl || !imageUrl.includes('supabase.co')) return; // যদি ইমেজ না থাকে বা Supabase-এর লিংক না হয়

    // URL থেকে শুধু ফাইলের নামটি বের করা
    const urlObj = new URL(imageUrl);
    const pathParts = urlObj.pathname.split('/');
    const filename = pathParts[pathParts.length - 1];

    if (!filename) return;

    // Supabase থেকে ফাইল ডিলিট করা
    const { error } = await supabase
      .storage
      .from('sayham-kayes-images')
      .remove([filename]);

    if (error) {
      console.error("Supabase image delete error:", error);
    } else {
      console.log(`Image ${filename} deleted from Supabase`);
    }
  } catch (e) {
    console.error("Error deleting image:", e);
  }
};
