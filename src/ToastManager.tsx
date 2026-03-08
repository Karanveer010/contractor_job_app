import React, { useState } from "react";
import { View } from "react-native";
import Toast from "./components/Toast";

let showToastFn: (message: string, duration?: number, color?: string) => void;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    duration?: number;
    color?: string;
  } | null>(null);

  showToastFn = (message: string, duration?: number, color?: string) => {
    setToast({ message, duration, color });
  };

  const handleClose = () => {
    setToast(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {children}
      {toast && (
        <Toast
          message={toast?.message}
          duration={toast?.duration}
          color={toast?.color}
          onClose={handleClose}
        />
      )}
    </View>
  );
}

export const ToastService = {
  show: (message: string, duration?: number, color?: string) => {
    if (showToastFn) showToastFn(message, duration, color);
  },
};
