import { Montserrat_Alternates, Poppins, Bungee } from "next/font/google";

export const titleFont = Montserrat_Alternates({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const popularFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const logoFont = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});