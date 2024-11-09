import "dotenv/config";

export default {
  expo: {
    name: "react-native-app",
    version: "1.1.0",
    orientation: "portrait",
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.MAP_KEY,
      },
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.MAP_KEY,
        },
      },
    },
  },
};
