import { notarize } from "@electron/notarize";

export default async function notarizing(context: any) {
  const { electronPlatformName, appOutDir, packager } = context;

  if (electronPlatformName !== "darwin") {
    return;
  }

  const appName = packager.appInfo.productFilename;

  console.log("🔑 Notarizing the app...");
  try {
    await notarize({
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLE_ID || "",
      appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD || "",
      teamId: process.env.APPLE_TEAM_ID || "", // Required for notarization
    });
    console.log("✅ Notarization complete.");
  } catch (error) {
    console.error("❌ Notarization failed:", error);
    throw error;
  }
}
