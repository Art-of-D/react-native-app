import "dotenv/config";

export default {
  expo: {
    name: "react-native-app",
    version: "1.2.0",
    orientation: "portrait",
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.MAP_KEY,
      },
    },
    android: {
      package: "com.rn.app",
      config: {
        googleMaps: {
          apiKey: process.env.MAP_KEY,
        },
      },
    },
    extra: {
      eas: {
        projectId: "c35e1e41-7a60-4f82-a9d2-27389499999a",
      },
    },
  },
};
