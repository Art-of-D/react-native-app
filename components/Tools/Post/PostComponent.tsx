import { Text, View } from "react-native";
import IconText from "../IconText/IconText";
import images from "../../../utils/images";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../../utils/enums/routes";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { PostType } from "../../../utils/types/post";
import styles from "./stylesPost";

interface PostProps {
  post: PostType;
  onPress: () => void;
}

export default function PostComponent({ onPress, post }: PostProps) {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.postWrapper}>
        <ButtonIcon
          stylesButton={styles.imageButton}
          onPress={onPress}
          icon={{ uri: post.image }}
          stylesIcon={styles.image}
        />
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.bottomWrapper}>
          <IconText
            stylesWrapper={styles.iconTextWrapper}
            stylesIcon={styles.icon}
            iconSource={images.COMMENT}
            stylesText={styles.textIcon}
            text={post?.comments?.length > 0 ? post.comments.length : 0}
          />
          <View style={styles.locationWrapper}>
            <ButtonIcon
              stylesButton={styles.iconTextWrapper}
              onPress={() =>
                (navigator as any).navigate(Screens.Map, {
                  post,
                })
              }
              icon={images.PIN_MAP}
              stylesIcon={styles.icon}
            />
            <Text style={styles.textIconMap}>{post.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
