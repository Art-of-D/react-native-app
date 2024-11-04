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
export type PostComment = {
  id: string;
  text: string;
  date: string;
  email: string;
};
export type PostComments = {
  [key: string]: PostComment;
};

export default function CreatePostsScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user, dataHandler } = params as any;
  const [title, setTitle] = useState<string>("");
  const [pinOnMap, setPinOnMap] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

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
      comments: {} as PostComments,
    };
    dataHandler("posts", { [newPost.id]: newPost });

    setSelectedImage("");
    setTitle("");
    setPinOnMap("");

    (navigation as any).navigate("Публікації", { user });
  };

  const deletePost = () => {
    setSelectedImage("");
    setTitle("");
    setPinOnMap("");
    (navigation as any).navigate("Публікації", { user });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
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
          {selectedImage ? "Редагувати фото" : "Завантажте фото"}
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
        value={pinOnMap}
        onChangeText={setPinOnMap}
        stylesWrapper={styles.mapWrapper}
        stylesInput={[styles.textInput, styles.textInputMap]}
        stylesFocusedInput={styles.textInputFocused}
        stylesIcon={styles.mapIcon}
      />
      <Button
        text="Опублікувати"
        stylesButton={[
          styles.buttonSubmit,
          selectedImage && title && pinOnMap ? styles.buttonSubmitReady : null,
        ]}
        stylesText={[
          styles.buttonSubmitText,
          selectedImage && title && pinOnMap
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
  );
}
