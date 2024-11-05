import { Text, View, Image, Pressable } from "react-native";
import IconText from "../../Tools/IconText/IconText";
import images from "../../../utils/images";
import styles from "./stylesPost";

interface PostProps {
  image: any;
  title: string;
  comments: number;
  location: string;
  onPress: () => void;
}

export default function Post({
  onPress,
  image,
  title,
  comments,
  location,
}: PostProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.postWrapper}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.bottomWrapper}>
          <IconText
            stylesWrapper={styles.iconTextWrapper}
            stylesIcon={styles.icon}
            iconSource={images.COMMENT}
            stylesText={styles.textIcon}
            text={comments}
          />
          <IconText
            stylesWrapper={styles.iconTextWrapper}
            stylesIcon={styles.icon}
            iconSource={images.PIN_MAP}
            stylesText={styles.textIconMap}
            text={location}
          />
        </View>
      </View>
    </Pressable>
  );
}
