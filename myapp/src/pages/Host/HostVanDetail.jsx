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
                <nav>
                    <NavLink to=".">Details</NavLink>
                    <NavLink to="pricing">Pricing</NavLink>
                    <NavLink to="photos">Photo</NavLink>
                </nav>
                <Outlet />
            </div>
        </section>
    )
}