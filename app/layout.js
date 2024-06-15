import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Footer from './components/footer.js'
import Header from './components/header.js'

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
          <div className="container h-full">
            <Header/>

            <div className="container px-5 w-1/2 ">{children}</div>

            <Footer/>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
