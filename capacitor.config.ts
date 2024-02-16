import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'log-in',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
