import { Platform, Text, TextInput } from "react-native";
import { ToastService } from "./ToastManager";

interface AppUtilsInterface {
  validatePhone: (phone: string) => boolean;
  validateEmail: (email: string) => boolean;
  fontSize: (size: number) => number;
  showToast: (text?: string, color?: string) => void;
}

const AppUtils: AppUtilsInterface = {
  //Phone validation
  validatePhone: (phone: string) => {
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  },

  //Adjust Font Size
  fontSize(size) {
    return Platform.OS == "ios" ? size : size - 3;
  },

  //Email validation
  validateEmail: (email: string) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  },
  // Toast
  showToast: (text: string, color: string) => {
    setTimeout(() => {
      ToastService?.show(text, 1000, color);
    }, 800);
  },
};

export default AppUtils;
