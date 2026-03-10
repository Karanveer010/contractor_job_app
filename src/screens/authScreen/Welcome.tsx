import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../../redux/navigation/RouteKeys/appRoutes";
import { Image } from "expo-image";
import CommonButton from "../../components/CommonButton";
import { useSelector } from "react-redux";

const Welcome = ({}: any) => {
  const auth = useSelector((state: any) => state.userData.auth);
  const navigation: any = useNavigation();

  useEffect(() => {
    if (auth) {
      navigation?.navigate(AppRoutes?.NonAuthStack);
    }
  }, [auth]);

  return (
  
    <LinearGradient
      colors={["#0F1B2D", "#10233F", "#0B1A2A"]}
      style={styles.container}
    >
         <StatusBar barStyle={"light-content"} />
      <View style={styles.centerContainer}>
        <Image
          source={require("../../assets/cjm.png")}
          style={styles.iconBox}
        />

        <Text style={styles.subtitle}>Contractor Job Management</Text>
      </View>

      <View style={styles.buttonContainer}>
        <CommonButton
          onPress={() => navigation.navigate(AppRoutes.CreateAccount)}
          titleTxt="Create Account"
        />

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate(AppRoutes.Login)}
        >
          <Text style={styles.secondaryText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        By continuing, you agree to CJM's Terms of Service and Privacy Policy
      </Text>
    </LinearGradient>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  centerContainer: {
    alignItems: "center",
    marginTop: "50%",
  },
  iconBox: {
    width: 190,
    height: 190,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#A0AEC0",
  },
  buttonContainer: {
    marginBottom: 100,
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: 16,
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
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
  },
  secondaryText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
  },
  footerText: {
    fontSize: 11,
    color: "#64748B",
    textAlign: "center",
  },
});
