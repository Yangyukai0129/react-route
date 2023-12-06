import React from "react";
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
    // const { currentVan } = useOutletContext(); 中的 { currentVan } 表示從 useOutletContext() 返回的對象中提取 currentVan 這個屬性，然後賦值給 currentVan 這個變數。
    // 這樣的寫法可以使你更簡潔地獲取你需要的數據，而不必額外寫 const currentVan = useOutletContext().currentVan;
    const { currentVan } = useOutletContext()
    return (
        <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    )
}