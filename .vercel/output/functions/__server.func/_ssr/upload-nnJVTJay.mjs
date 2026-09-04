import { c as createServerRpc } from "./createServerRpc-DLZfK7kq.mjs";
import { c as createServerFn } from "./server-CqYADRQX.mjs";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const uploadImage_createServerFn_handler = createServerRpc({
  id: "44ce3ddcd2b2a0e83783fd817dfb43fc7d2bc03b374e642f09ce156293206648",
  name: "uploadImage",
  filename: "src/server/upload.ts"
}, (opts) => uploadImage.__executeServer(opts));
const uploadImage = createServerFn({
  method: "POST"
}).validator(objectType({
  filename: stringType(),
  contentType: stringType(),
  base64Data: stringType()
})).handler(uploadImage_createServerFn_handler, async ({
  data
}) => {
  try {
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, {
      recursive: true
    });
    const safeFilename = data.filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uniqueFilename = `${Date.now()}-${safeFilename}`;
    const filePath = join(uploadsDir, uniqueFilename);
    const base64Data = data.base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    await writeFile(filePath, buffer);
    return `/uploads/${uniqueFilename}`;
  } catch (e) {
    console.error("File upload failed", e);
    throw new Error("Upload failed");
  }
});
export {
  uploadImage_createServerFn_handler
};
