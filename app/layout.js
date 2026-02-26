import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { dbConnect } from "@/services/mongo";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "sonner";
import GlobalToast from "@/components/GlobalToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Eventry",
    template: "%s | Eventry",
  },
  description: "Discover and join the best events near you.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    siteName: "Eventry",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="py-8">{children}</main>
          <GlobalToast />
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
