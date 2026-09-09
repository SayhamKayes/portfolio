import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import pkg from "agora-token";
const { RtcTokenBuilder, RtcRole } = pkg;

const generateAgoraTokenSchema = z.object({
  channelName: z.string(),
  uid: z.number().optional().default(0), // 0 means Agora generates a UID
});

export const generateAgoraToken = createServerFn({ method: "POST" })
  .validator((data) => generateAgoraTokenSchema.parse(data))
  .handler(async ({ data }) => {
    const { channelName, uid } = data;
    
    const appId = process.env.VITE_AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;

    if (!appId || !appCertificate) {
      throw new Error("Agora credentials are not configured in environment variables.");
    }

    const role = RtcRole.PUBLISHER;
    // Token validity: 1 hour (3600 seconds)
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build the token
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs, // token expire time
      privilegeExpiredTs  // privilege expire time
    );

    return { token, channelName, uid };
  });
