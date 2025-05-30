import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ['thai', 'latin'], // รองรับภาษาไทย
  weight: ['400', '500', '700'], // เลือกน้ำหนักที่ต้องการ
  variable: '--font-kanit', // ถ้าต้องการใช้เป็น CSS variable
  display: 'swap', // ลด CLS
})

export const metadata: Metadata = {
  title: "POKEMON MOVE THAI",
  description: "แปล move pokemon ภาษาไทย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={kanit.className}
      >
        {children}
      </body>
    </html>
  );
}
