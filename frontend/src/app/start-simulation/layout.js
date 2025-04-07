//JOBS: MES System Simulator
import '../styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GeistSans } from "geist/font/sans";
import ClientProvider from "../ClientProvider";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/NavigationBar/NavigationBar";

export const metadata = {
  title: "Leafy Factory",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <div className={GeistSans.className}>
      <ClientProvider>
        <Header />
        {children}
      </ClientProvider>
    </div>
  );
}
