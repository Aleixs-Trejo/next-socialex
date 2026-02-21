import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Socialex | Un espacio para compartir",
  description: "Socialex es un espacio para compartir y conectar con quienes quieras.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://next-socialex.vercel.app",
    siteName: "Socialex",
    title: "Socialex | Un espacio para compartir",
    description:
      "Socialex es un espacio para compartir y conectar con quienes quieras.",
    images: [
      {
        url: "https://res.cloudinary.com/dpap5lqxq/image/upload/v1769989002/cover_wdm3rn.png",
        width: 1200,
        height: 630,
        alt: "Vista previa de Socialex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Socialex | Un espacio para compartir",
    description:
      "Socialex es un espacio para compartir y conectar con quienes quieras.",
    images: [
      {
        url: "https://res.cloudinary.com/dpap5lqxq/image/upload/v1769989002/cover_wdm3rn.png",
        width: 1200,
        height: 630,
        alt: "Vista previa de Socialex",
      },
    ],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: "#7b2cbf",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased text-white bg-black`}>
        <Providers>
          <div className="bg-main-gradient"></div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
