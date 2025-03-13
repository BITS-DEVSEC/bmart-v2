import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.bmart.bunna",
  appName: "BMART",
  webDir: "out",
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
