'use client'
import { useEffect } from "react"

type AdBannerTypes = {
    dataAdSlot: string,
    dataAdFormat:string,
    dataFullWidthResponsive:boolean
}
const AdBanner = ({
    dataAdSlot,
    dataAdFormat,
    dataFullWidthResponsive
}:AdBannerTypes)=>{
    useEffect(()=>{
        try{
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error: any) {
            console.log(error.message)
        }
        
    } , []);
    return(
        <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: "90px", minWidth: "300px" }}
            data-ad-client="ca-pub-8642023158448076"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
        >
        </ins>
    )
}

export default AdBanner