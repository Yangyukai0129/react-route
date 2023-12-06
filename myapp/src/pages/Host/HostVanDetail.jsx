import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";

export default function HostVanDetail() {
    const param = useParams()
    // console.log(param)
    const [currentVan, setCurrentVan] = useState(null)
    useEffect(() => {
        // 使用 param.id 來取得 URL 參數中的 id
        fetch(`/api/host/vans/${param.id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentVan(data.vans);
            });
    }, [param.id])
    if (!currentVan) {
        return <h1>Loading...</h1>
    }

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                // 因為返回的話會返回到前一個route(/host)，所以用relative改成path就可以返回到前一個路徑
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} width={150} />
                    <div>
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>
                <nav className="host-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Photo
                    </NavLink>
                </nav>
                {/* 解構賦值是為了將 currentVan 中的屬性展開，並將它們作為上下文（context）傳遞給子路由 */}
                {/* 當你在 <Outlet> 中使用 context={{ ...currentVan }} 時，它實際上等同於：
                    <Outlet context={{ name: "VanName", price: 100, /* 其他屬性... */ }
                {/* 這樣，子路由可以透過 useOutletContext 簡單地獲取到相應的上下文數據，而不需要深入層次地訪問上下文對象。這使得代碼更簡潔且易於理解，同時也方便了上下文數據的管理和傳遞。 */}
                <Outlet context={{ currentVan }} />
            </div>
        </section>
    )
}