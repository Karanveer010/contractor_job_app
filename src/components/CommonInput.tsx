import React from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "@react-navigation/native";

interface CommonInputProps {
  viewStyle?: object;
  textInputStyle?: object;
  placeholder?: string;
  leftImg?: any;
  rightImg?: any;
  isSecure?: boolean;
  onChange?: any;
  keyboardType?: any;
  maxLength?: any;
  onRightPress?: () => void;
  value?: string;
}

const CommonInput: React.FC<CommonInputProps> = ({
  viewStyle,
  placeholder,
  textInputStyle,
  leftImg,
  keyboardType,
  rightImg,
  value,
  isSecure,
  onChange,
  maxLength,
  onRightPress,
}) => {
  const { colors } = useTheme();
  const styles = style(colors);
  return (
    <View style={[styles.parent, viewStyle]}>
      {leftImg && <Image source={leftImg} style={styles.imgStyle} />}
      <TextInput
        secureTextEntry={isSecure}
        placeholderTextColor={"grey"}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        style={[styles.textInput, textInputStyle]}
        onChangeText={onChange}
        maxLength={maxLength}
      />
      {rightImg && (
        <Pressable
          style={{ alignSelf: "center", padding: 8 }}
          onPress={onRightPress}
        >
          <Image source={rightImg} style={styles.imgStyle} />
        </Pressable>
      )}
    </View>
  );
};

const style = (colors: any) =>
  StyleSheet.create({
    parent: {
      width: "100%",
      height: 48,
      backgroundColor: "#fffafad8",
      borderRadius: 15,
      overflow: "hidden",
      marginVertical: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
    },
    absolutePosition: {
      flex: 1,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    textInput: {
      flex: 1,
      color: "#000000",
    },
    imgStyle: {
      width: 18,
      height: 18,
      alignSelf: "center",
    },
  });

export default CommonInput;
