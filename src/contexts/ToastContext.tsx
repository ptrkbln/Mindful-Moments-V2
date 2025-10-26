import { createContext, useState, useMemo, useContext } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

type ToastContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  variant: "success" | "error";
  setVariant: Dispatch<SetStateAction<"success" | "error">>;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<"success" | "error">("success");

  const value = useMemo(
    () => ({ isOpen, setIsOpen, message, setMessage, variant, setVariant }),
    [isOpen, message, variant]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
