import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FitLog — Train With Intent. Log Every Set.",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="fitlog" className="dark">
      <body
        className={`${oswald.variable} ${inter.variable} antialiased bg-[#0f1115] text-zinc-100 min-h-screen flex flex-col selection:bg-[#ccff00] selection:text-black`}
      >
        <PlanProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <ToastContainer />
        </PlanProvider>
      </body>
    </html>
  );
}
