"use client";
import { PropsWithChildren, useState, createContext } from "react";
type alertType = "warning" | "error" | "success" | "info" | "";
const ALERT_TIME = 5000;

interface IAlertContext {
  text: string;
  type: alertType;
  setAlert: (text: string, type: alertType) => void;
}
const AlertContext = createContext<IAlertContext>({
  text: "",
  type: "",
  setAlert: () => {},
});
export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [text, setText] = useState("");
  const [type, setType] = useState<alertType>("");
  const setAlert = (text: string, type: alertType) => {
    setText(text);
    setType(type);
    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };
  return (
    <AlertContext.Provider value={{ text, type, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertContext;
