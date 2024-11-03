import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import images from "../../../utils/images";
import Input from "../../Tools/Input/Input";
import Button from "../../Tools/Button/Button";
import IconInput from "../../Tools/IconInput/IconInput";
import ButtonIcon from "../../Tools/ButtonIcon/ButtonIcon";
import styles from "./stylesCreatePostsScreen";

export default function CreatePostsScreen() {
  const navigation = useNavigation();
  const {
    params: { cookies, user },
  } = useRoute();
  const [title, setTitle] = useState<string>("");
  const [pinOnMap, setPinOnMap] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const createPost = () => {
    if (!title || !pinOnMap || !selectedImage) {
      Alert.alert("Заповніть усі поля");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      owner: user.email,
      title,
      location: pinOnMap,
      image: selectedImage,
      comments: [],
    };

    const updatedPosts = cookies.posts
      ? [...cookies.posts, newPost]
      : [newPost];
    cookies.set("posts", { posts: updatedPosts });
    setSelectedImage(undefined);
    setTitle("");
    setPinOnMap("");

    navigation.navigate("Публікації", { cookies, user });
  };

  const deletePost = () => {
    setSelectedImage(undefined);
    setTitle("");
    setPinOnMap("");
    navigation.navigate("Публікації", { cookies, user });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <PickedImage
          stylesImageWrapper={styles.imageWrapper}
          stylesImage={styles.image}
          stylesButton={[
            styles.imageButton,
            selectedImage && styles.imageButtonReady,
          ]}
          stylesButtonIcon={[
            styles.buttonIcon,
            selectedImage && styles.buttonIconReady,
          ]}
          buttonIcon={images.CAMERA}
          deleteImageFunc={false}
          image={selectedImage}
          handleSelectedImage={setSelectedImage}
        />
        <Text style={styles.text}>
          {selectedImage ? "Редагувати фото" : "Завантажте фото"}
        </Text>
      </View>
      <Input
        classNameInput={styles.textInput}
        classNameFocusedInput={styles.textInputFocused}
        textContentType="name"
        placeholder="Назва..."
        value={title}
        onChangeText={setTitle}
      />
      <IconInput
        iconSource={images.PIN_MAP}
        placeholder="Місцевість..."
        textContentType="location"
        value={pinOnMap}
        onChangeText={setPinOnMap}
        classNameWrapper={styles.mapWrapper}
        classNameInput={[styles.textInput, styles.textInputMap]}
        classNameFocusedInput={styles.textInputFocused}
        classNameIcon={styles.mapIcon}
      />
      <Button
        text="Опублікувати"
        classNameButton={[
          styles.buttonSubmit,
          selectedImage && title && pinOnMap && styles.buttonSubmitReady,
        ]}
        classNameText={[
          styles.buttonSubmitText,
          selectedImage && title && pinOnMap && styles.buttonSubmitTextReady,
        ]}
        onPress={createPost}
      />
      <ButtonIcon
        classNameButton={styles.buttonDelete}
        classNameIcon={styles.buttonDeleteIcon}
        icon={images.TRASH_BOX}
        onPress={deletePost}
      />
    </View>
  );
}
