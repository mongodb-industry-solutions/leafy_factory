
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GeistSans } from "geist/font/sans";
import ClientProvider from "./ClientProvider";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/NavigationBar/NavigationBar";

export const metadata = {
  title: "Overview",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body><ClientProvider>
      <Header/>
      <NavigationBar/>
      {children}
      </ClientProvider>
    </body>
    </html>
  );
}
