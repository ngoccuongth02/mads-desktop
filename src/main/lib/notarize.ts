import { notarize } from "@electron/notarize";
import { BuildResult } from "electron-builder";

export default async function notarizing(context: BuildResult) {
  const { electronPlatformName, appOutDir, packager } = context;

  if (electronPlatformName !== "darwin") {
    console.log("Not a macOS build. Skipping notarization.");
    return;
  }

  const appName = packager.appInfo.productFilename;
  const appBundleId = packager.appInfo.id; // Get appBundleId from package info

  if (!appBundleId) {
    throw new Error("❌ appBundleId is missing. Check your electron-builder.yml.");
  }

  console.log("🔑 Notarizing the app...");
  try {
    await notarize({
      appBundleId,
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLE_ID || "",
      appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD || "",
      teamId: process.env.APPLE_TEAM_ID || "",
    });
    console.log("✅ Notarization complete.");
  } catch (error) {
    console.error("❌ Notarization failed:", error);
    throw error;
  }
}
