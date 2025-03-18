import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { OrderProvider } from "@/context/OrderContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Moon Muffin",
  description: "Moon Muffin by C+",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <OrderProvider>
          <Header />
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
