import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/components/AuthProvider";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Socialex, un espacio para compartir",
  description: "Socialex es un espacio para compartir y conectar con quienes quieras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased text-white bg-black`}
        >
          <div className="bg-main-gradient"></div>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
