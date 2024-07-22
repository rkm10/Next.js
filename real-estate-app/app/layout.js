import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Estate App",
  description: "This is my next js and react combined project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className={inter.className}>
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
