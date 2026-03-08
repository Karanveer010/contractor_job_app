import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

interface CommonButtonProps {
  btnStyle?: ViewStyle;
  txtStyle?: TextStyle;
  titleTxt?: string;
  onPress?: () => void;
  isLoading?: boolean;
  img?: any;
  imgTintColor?: any;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  btnStyle,
  txtStyle,
  titleTxt,
  onPress,
  isLoading,
  img,
  imgTintColor,
}) => {
  const { colors } = useTheme();
  const styles = style(colors);
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#4F8CFF", "#3B82F6"]}
        style={[styles.primaryButton, btnStyle]}
      >
        {isLoading && <ActivityIndicator color="#FFFFFF" />}
        <View style={styles.fullWidth}>
          {
            <Text style={[styles.primaryText, txtStyle]}>
              {isLoading ? "Loading..." : titleTxt}
            </Text>
          }
          {img && (
            <Image
              tintColor={imgTintColor}
              source={img}
              style={{ width: 24, height: 24, marginHorizontal: 8 }}
            />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const style = (colors: any) =>
  StyleSheet.create({
    btn: {
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      alignSelf: "center",
      paddingVertical: 12,
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: colors.primary,
      flexDirection: "row",
    },
    btntxt: {
      fontSize: 16,
      color: "white",
    },
    disabled: {
      backgroundColor: "#B0B0B0",
    },
    primaryButton: {
      borderRadius: 16,
      marginBottom: 16,
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    fullWidth: {
      paddingVertical: 16,
      alignItems: "center",
    },
    primaryText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default CommonButton;
