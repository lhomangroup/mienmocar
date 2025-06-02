declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_MAPBOX_API_KEY: string;
      EXPO_PUBLIC_API_URL: string;
      // Add other environment variables here
    }
  }
}

// Ensure this file is treated as a module
export {};