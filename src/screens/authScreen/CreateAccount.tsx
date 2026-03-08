import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import CommonView from "../../components/CommonView";
import CommonButton from "../../components/CommonButton";
import CustomHeader from "../../components/Customheader";
import CommonInput from "../../components/CommonInput";
import AppUtils from "../../appUtils";
import appUtils from "../../appUtils";
import { signupApi } from "../../services/authServices";
import { setAuth, setUser } from "../../redux/userData";
import AppRoutes from "../../redux/navigation/RouteKeys/appRoutes";

const CreateAccount: React.FC = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [eyeOpen, setEyeOpen] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUp = () => {
    if (!fullName || !email || !confirmPassword) {
      AppUtils?.showToast("All fields are required");
      return;
    }

    if (!appUtils?.validateEmail(email)) {
      AppUtils?.showToast("Please enter valid email");
      return;
    }

    if (confirmPassword?.length < 8) {
      AppUtils?.showToast("Password must be at least 8 characters");
      return;
    }

    let body: any = {
      name: fullName?.trim(),
      email: email?.toLowerCase()?.trim(),
      password: confirmPassword?.trim(),
    };

    signupApi(body)
      .then((res: any) => {
        if (res?.status === 200 || res?.ok) {
          dispatch(setUser(res?.data?.data ?? {}));
          dispatch(setAuth(true));
          navigation.navigate(AppRoutes.NonAuthStack);
          AppUtils?.showToast("Account created successfully", "green");
        } else {
          AppUtils?.showToast("Failed to create account");
        }
      })
      .catch((error: any) => {
        console.log("Signup Error:", error);
        if (error?.response) {
          const message = error?.response?.data?.message || "Server error";
          AppUtils?.showToast(message);
        } else if (error?.request) {
          AppUtils?.showToast("Network error, please try again");
        } else {
          AppUtils?.showToast("Something went wrong");
        }
      });
  };
  return (
    <CommonView
      view={
        <View style={style.parent}>
          <CustomHeader
            title="Create Account"
            subtitle="Join us and manage your projects efficiently"
          />
          <View
            style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
          >
            <CommonInput
              placeholder="Full name"
              onChange={(text: string) => setFullName(text)}
              value={fullName}
              maxLength={40}
            />
            <CommonInput
              placeholder="Email"
              onChange={(text: string) => setEmail(text)}
              value={email}
              keyboardType={"email"}
              maxLength={40}
            />
            <CommonInput
              placeholder="Password"
              onChange={(text: string) => setConfirmPassword(text)}
              value={confirmPassword}
              maxLength={8}
              onRightPress={() => {
                setEyeOpen(!eyeOpen);
              }}
              rightImg={
                !eyeOpen
                  ? require("../../assets/show.png")
                  : require("../../assets/hide.png")
              }
              isSecure={eyeOpen}
            />
            <Text style={style.passtxt}>
              Password must be at least 8 characters
            </Text>

            <CommonButton
              btnStyle={{ marginTop: "8%" }}
              onPress={() => {
                signUp();
              }}
              titleTxt={"Create Account"}
            />

            <Text style={style.normalText}>
              {"Already have an account?"}{" "}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={style.actionText}>"Sign In"</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      }
    />
  );
};

const style = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "flex-start",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: "#eaf6f9",
  },
  titleText: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    lineHeight: 25,
  },
  passtxt: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginLeft: 5,
    color: "grey",
    marginTop: 5,
    textAlign: "left",
  },
  normalText: {
    fontSize: 15,
    alignSelf: "center",
    color: "grey",
    textAlign: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#4F8CFF",
    top: 5,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
});
export default CreateAccount;
