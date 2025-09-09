import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f50f7dd8a40d46cebae8b69cf6b3c336',
  appName: 'Smart Khata Ledger',
  webDir: 'dist',
  server: {
    url: 'https://f50f7dd8-a40d-46ce-bae8-b69cf6b3c336.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f172a',
      showSpinner: false
    }
  }
};

export default config;