import Script from "next/script";

type AdsenseType = {
    pId: string;
}
const AdSense = ({pId}:AdsenseType)=>{
    return(
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    )
}

export default AdSense