import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import AdSense from "./Adsense";

const kanit = Kanit({
  subsets: ['thai', 'latin'], // รองรับภาษาไทย
  weight: ['400', '500', '700'], // เลือกน้ำหนักที่ต้องการ
  variable: '--font-kanit', // ถ้าต้องการใช้เป็น CSS variable
  display: 'swap', // ลด CLS
})

export const metadata: Metadata = {
  title: "POKEMON MOVE THAI",
  description: "แปล move pokemon ภาษาไทย",
  robots: "index , follow" ,
  keywords: ["แปลท่าโปเกมอน" , "pokemon move แปลไทย" , "ชื่อท่าโปเกมอนภาษาไทย" , "ท่าโปเกมอนพร้อมคำแปล" , "รายชื่อท่าโปเกมอนภาษาไทย" , "ความหมายท่าโปเกมอน" , "รายชื่อท่าโจมตีโปเกมอนแปลไทย" , "แปลชื่อท่า pokemon"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context":"https://schema.org",
    "@type":"WebPage",
    "name":"POKEMON MOVE THAI",
    "description": "เว็บไซต์แปล move pokemon เป็นภาษาไทย พร้อมคำอธิบายความหมายและรายละเอียดท่าโจมตีต่างๆ",
    "headline": "แปล move pokemon ภาษาไทย",
    "url":"https://pokemonmovesthai.vercel.app/",
    "inLanguage": "th-TH"
  }
  
  return (
    <html lang="th">
       <head>
        <AdSense pId="8642023158448076"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={kanit.className}
      >
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
