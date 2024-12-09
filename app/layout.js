import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Peerlist Form Builder",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
