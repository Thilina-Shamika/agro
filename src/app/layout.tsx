import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { fetchHeaderData } from "@/lib/wordpress";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VerdaAgro - Agricultural Solutions",
  description: "Professional agricultural services and solutions for modern farming",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await fetchHeaderData();

  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${poppins.variable} antialiased`}
      >
        <Header data={headerData} />
              <main>
          {children}
        </main>
              <SiteFooter />
      </body>
    </html>
  );
}
