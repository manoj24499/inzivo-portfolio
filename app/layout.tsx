import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jb = JetBrains_Mono({ variable: "--font-jb", subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Inzivo Project Portfolio",
  description:
    "Attendance and field-force management platform for office, work-from-home and field teams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable} ${jb.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
