import { F as createSsrRpc } from "./router-Dk3yfq2s.mjs";
import { c as createServerFn } from "./server-CqYADRQX.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const uploadImage = createServerFn({
  method: "POST"
}).validator(objectType({
  filename: stringType(),
  contentType: stringType(),
  base64Data: stringType()
})).handler(createSsrRpc("44ce3ddcd2b2a0e83783fd817dfb43fc7d2bc03b374e642f09ce156293206648"));
export {
  uploadImage as u
};
