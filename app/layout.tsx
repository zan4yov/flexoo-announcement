import type { Metadata } from "next";
import { Anybody, Instrument_Sans } from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pengumuman Rekrutmen | Flexoo Software House",
  description: "Cek hasil seleksi rekrutmen Flexoo Software House dengan NRP kamu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${anybody.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
