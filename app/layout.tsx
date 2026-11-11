import type { Metadata } from "next";
import { Fira_Mono, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Brand type is Argentum Sans (not on Google Fonts); Montserrat is the family it derives from.
const brand = Montserrat({
  variable: "--font-brand",
  subsets: ["latin"],
});

const pill = Plus_Jakarta_Sans({
  variable: "--font-pill",
  subsets: ["latin"],
  weight: ["800"],
});

const mono = Fira_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Pengumuman Oprec Flexoo 2027",
  description: "Cek hasil seleksi Open Recruitment Flexoo Software House 2027 dengan NRP kamu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${brand.variable} ${pill.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
