import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import CommonView from "../../components/CommonView";
import CommonButton from "../../components/CommonButton";
import CustomHeader from "../../components/Customheader";
import CommonInput from "../../components/CommonInput";
import AppRoutes from "../../redux/navigation/RouteKeys/appRoutes";
import AppUtils from "../../appUtils";
import { loginApi } from "../../services/authServices";
import { setAuth, setToken, setUser } from "../../redux/userData";
import * as SecureStore from "expo-secure-store";
const login: React.FC = ({ route }: any) => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const routeEmail = route?.params?.email ?? "";
  const routePassword = route?.params?.password ?? "";

  const [email, setEmail] = useState<string>(routeEmail ?? "");
  const [eyeOpen, setEyeOpen] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>(
    routePassword ?? "",
  );

  const login = () => {
    if (!email || !confirmPassword) {
      AppUtils?.showToast("All fields are required");
      return;
    }

    if (!AppUtils?.validateEmail(email)) {
      AppUtils?.showToast("Please enter valid email");
      return;
    }

    if (confirmPassword?.length < 8) {
      AppUtils?.showToast("Password must be at least 8 characters");
      return;
    }
    setLoad(true);
    let body: any = {
      email: email?.toLowerCase()?.trim(),
      password: confirmPassword?.trim(),
    };

    loginApi(body)
      .then(async (res: any) => {
        if (res?.status === 200 || res?.ok) {
          await SecureStore.setItemAsync("token", res?.data?.data?.token);
          await dispatch(setToken(res?.data?.data?.token ?? ""));
          dispatch(setUser(res?.data?.data ?? {}));
          dispatch(setAuth(true));
          navigation.replace(AppRoutes.NonAuthStack);
        } else {
          AppUtils?.showToast("Failed to create account");
          setLoad(false);
        }
      })
      .catch((error: any) => {
        if (error?.response) {
          const message = error?.response?.data?.message || "Server error";
          AppUtils?.showToast(message);
        } else if (error?.request) {
          AppUtils?.showToast("Network error, please try again");
        } else {
          AppUtils?.showToast("Something went wrong");
        }
      })
      .finally(() => {
        setLoad(false);
      });
  };
  return (
    <CommonView
      view={
        <View style={style.parent}>
          <CustomHeader title="Welcome Back" subtitle="Sign in to continue" />
          <View
            style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
          >
            <CommonInput
              placeholder="Email"
              onChange={(text: string) => setEmail(text)}
              value={email}
              keyboardType={"email"}
              maxLength={50}
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
            <Text style={style.passtxt}>Forgot password?</Text>

            <CommonButton
              btnStyle={{ marginTop: "8%" }}
              onPress={() => {
                login();
              }}
              isLoading={load}
              titleTxt={"Sign In"}
            />

            <Text style={style.normalText}>
              {"Don't have an account?"}
              {"  "}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(AppRoutes.CreateAccount);
                }}
              >
                <Text style={style.actionText}>"Create Account"</Text>
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
    alignSelf: "flex-end",
    marginLeft: 5,
    color: "#4F8CFF",
    marginTop: 5,
    fontWeight: 400,
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
export default login;
