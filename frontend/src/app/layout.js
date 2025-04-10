//WORK ORDERS: ERP System Simulator
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GeistSans } from "geist/font/sans";
import ClientProvider from "./ClientProvider";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import Sidebar from '@/components/Sidebar/Sidebar';

export const metadata = {
  title: "Leafy Factory",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body><ClientProvider>
      <Header/>
      <NavigationBar/>
      <Sidebar/>
      <main>{children}</main>
      </ClientProvider>
    </body>
    </html>
  );
}