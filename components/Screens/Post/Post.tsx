import { Text, View, Image, Pressable } from "react-native";
import IconText from "../../Tools/IconText/IconText";
import images from "../../../utils/images";
import styles from "./stylesPost";
export default function Post(props: any) {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Image source={props.image} style={styles.image} />
      <Text>{props.title}</Text>
      <View style={styles.bottomWrapper}>
        <IconText
          classNameWrapper={styles.iconTextWrapper}
          classNameIcon={styles.icon}
          iconSource={images.COMMENT}
          classNameText={styles.textIcon}
          text={props.comments}
        />
        <IconText
          classNameWrapper={styles.iconTextWrapper}
          classNameIcon={styles.icon}
          iconSource={images.PIN_MAP}
          classNameText={styles.textIconMap}
          text={props.location}
        />
      </View>
    </Pressable>
  );
}
