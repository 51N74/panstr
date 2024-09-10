import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Panstr",
  description: "Web Blog on Nostr",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="nord" lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="">
            <Header />
              {children}
            <Footer />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
