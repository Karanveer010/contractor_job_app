import NetInfo from "@react-native-community/netinfo";

export const listenNetwork = (callback: Function) => {
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      callback();
    }
  });
};
