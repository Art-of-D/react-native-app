import { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./stylesCreatePostsScreen";
import PickedImage from "../../Tools/PickedImage/PickedImage";
import images from "../../../utils/images";
import Input from "../../Tools/Input/Input";
import Button from "../../Tools/Button/Button";

export default function CreatePostsScreen() {
  const [title, setTitle] = useState<string>("");
  const [pinOnMap, setPinOnMap] = useState<string>("");
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <PickedImage
          stylesImageWrapper={styles.imageWrapper}
          stylesImage={styles.image}
          stylesButton={styles.imageButton}
          stylesButtonIcon={styles.buttonIcon}
          buttonIcon={images.CAMERA}
        />
        <Text style={styles.text}>Завантажте фото</Text>
      </View>
      <Input
        classNameInput={styles.textInput}
        classNameFocusedInput={styles.textInputFocused}
        textContentType="name"
        placeholder="Назва..."
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.mapWrapper}>
        <Image source={images.PIN_MAP} style={styles.mapIcon} />
        <Input
          classNameInput={[styles.textInput, styles.textInputMap]}
          classNameFocusedInput={styles.textInputFocused}
          textContentType="location"
          placeholder="Місцевість..."
          value={pinOnMap}
          onChangeText={setPinOnMap}
        />
      </View>
      <Button
        text="Опублікувати"
        classNameButton={styles.buttonSubmit}
        classNameText={styles.buttonSubmitText}
        onPress={() => {}}
      />
      <TouchableOpacity style={styles.buttonDelete} onPress={() => {}}>
        <Image source={images.TRASH_BOX} style={styles.buttonDeleteIcon} />
      </TouchableOpacity>
    </View>
  );
}
