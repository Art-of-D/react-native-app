import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Post } from "../../../App";
import styles from "./stylesMapScreen";
import { useRoute } from "@react-navigation/native";
import { MapScreenRouteProp } from "../../../utils/interfaces/routeParams";

type Marker = {
  id: string;
  title: string;
  owner: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export default function MapScreen() {
  const route = useRoute<MapScreenRouteProp>();
  const post = route.params?.post as Post;
  const [marker, setMarker] = useState<Marker>({
    id: "default",
    title: "Default Location",
    owner: "owner@mail",
    coordinates: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });

  useEffect(() => {
    const postMarker = {
      id: post.id,
      title: post.title,
      owner: post.owner,
      coordinates: {
        latitude: post.coordinates.latitude,
        longitude: post.coordinates.longitude,
      },
    };
    setMarker(postMarker);
  }, [post]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: marker.coordinates.latitude,
          longitude: marker.coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          key={marker.id}
          coordinate={marker.coordinates}
          title={marker.title}
          description={`Post by ${marker.owner}`}
        />
      </MapView>
    </View>
  );
}
