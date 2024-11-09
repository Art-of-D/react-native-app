import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as Location from "expo-location";
import PickedImage from "../../tools/PickedImage/PickedImage";
import images from "../../../utils/images";
import Input from "../../tools/Input/Input";
import Button from "../../tools/Button/Button";
import IconInput from "../../tools/IconInput/IconInput";
import ButtonIcon from "../../tools/ButtonIcon/ButtonIcon";
import { Screens } from "../../../utils/enums/routes";
import { RouteParams } from "../../../utils/interfaces/routeParams";
import { useSelector } from "react-redux";
import { Post, PostComments } from "../../../utils/types/post";
import styles from "./stylesCreatePostsScreen";
import { addPost } from "../../../utils/firestore";

enum ImageTips {
  EDIT = "Редагувати фото",
  ADD = "Завантажте фото",
}

export default function CreatePostsScreen() {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const navigator = useNavigation();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const route =
    useRoute<RouteProp<{ Registration: RouteParams }, "Registration">>();
  const photoUri = route.params?.photoUri;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, [location]);

  useEffect(() => {
    if (photoUri) {
      setSelectedImage(photoUri);
    }
  }, [photoUri]);

  const resetStats = () => {
    setSelectedImage("");
    setTitle("");
    setLocation("");
    setErrorMsg("");
  };

  const createPost = async () => {
    if (!title || !location || !selectedImage) {
      Alert.alert("Заповніть усі поля");
      return;
    }

    setErrorMsg("Please wait...");

    const pinOnMap = await getLocation();

    if (
      !pinOnMap ||
      pinOnMap.latitude === undefined ||
      pinOnMap.longitude === undefined
    ) {
      setErrorMsg("Could not retrieve location data. Try again later.");
      setTimeout(() => {
        resetStats();
        (navigator as any).goBack();
        fetchPosts();
      }, 3000);

      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      owner: currentUser.email,
      title,
      location,
      image: selectedImage,
      comments: {} as PostComments,
      coordinates: {
        latitude: pinOnMap.latitude,
        longitude: pinOnMap.longitude,
      },
    };

    addPost(currentUser.userId, newPost);
    resetStats();

    (navigator as any).navigate(Screens.Posts);
  };

  const deletePost = () => {
    resetStats();
    (navigator as any).navigate(Screens.Posts);
  };

  const getLocation = async () => {
    try {
      const data = await Location.getCurrentPositionAsync({});
      return {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      };
    } catch (error) {
      setErrorMsg("Could not retrieve location.");
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{errorMsg}</Text>
        </View>
      )}
      <View style={styles.postWrapper}>
        <View style={styles.pickedImageWrapper}>
          <PickedImage
            stylesImageWrapper={styles.imageWrapper}
            stylesImage={styles.image}
            stylesButton={[
              styles.imageButton,
              selectedImage ? styles.imageButtonReady : null,
            ]}
            stylesButtonIcon={[
              styles.buttonIcon,
              selectedImage ? styles.buttonIconReady : null,
            ]}
            buttonIcon={images.CAMERA}
            deleteImageFunc={false}
            image={selectedImage}
            handleSelectedImage={setSelectedImage}
          />
          <Text style={styles.text}>
            {selectedImage ? ImageTips.EDIT : ImageTips.ADD}
          </Text>
        </View>
        <Input
          stylesInput={styles.textInput}
          stylesFocusedInput={styles.textInputFocused}
          textContentOption="name"
          placeholder="Назва..."
          value={title}
          onChangeText={setTitle}
        />
        <IconInput
          iconSource={images.PIN_MAP}
          placeholder="Місцевість..."
          textContentOption="location"
          value={location}
          onChangeText={setLocation}
          stylesWrapper={styles.mapWrapper}
          stylesInput={[styles.textInput, styles.textInputMap]}
          stylesFocusedInput={styles.textInputFocused}
          stylesIcon={styles.mapIcon}
        />
        <Button
          text="Опублікувати"
          stylesButton={[
            styles.buttonSubmit,
            selectedImage && title && location
              ? styles.buttonSubmitReady
              : null,
          ]}
          stylesText={[
            styles.buttonSubmitText,
            selectedImage && title && location
              ? styles.buttonSubmitTextReady
              : null,
          ]}
          onPress={createPost}
        />
        <ButtonIcon
          stylesButton={styles.buttonDelete}
          stylesIcon={styles.buttonDeleteIcon}
          icon={images.TRASH_BOX}
          onPress={deletePost}
        />
      </View>
    </View>
  );
}
function fetchPosts() {
  throw new Error("Function not implemented.");
}
