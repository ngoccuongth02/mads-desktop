import { notarize } from "@electron/notarize";
import type { AfterPackContext } from "electron-builder/out";

export default async function notarizing(context: AfterPackContext) {
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
      tool: "notarytool", // Ensure we use the modern notarization method
      appPath: `${appOutDir}/${appName}.app`,
      teamId: process.env.APPLE_TEAM_ID || "", // Required for notarytool
      appleId: process.env.APPLE_ID || "",
      appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD || "",
    });
    console.log("✅ Notarization complete.");
  } catch (error) {
    console.error("❌ Notarization failed:", error);
    throw error;
  }
}
