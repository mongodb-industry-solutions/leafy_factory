"use client";

import { Provider } from "react-redux";
import { Factory } from "../redux/Store";

export default function ClientProvider({ children }) {
  return <Provider store={Factory}>{children}</Provider>;
}