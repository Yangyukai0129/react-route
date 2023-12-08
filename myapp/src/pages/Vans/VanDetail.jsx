import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

export default function VanDetail() {
    const param = useParams()
    const location = useLocation()
    // console.log(param)
    console.log(location)

    const [van, setvan] = useState([null])
    useEffect(() => {
        fetch(`/api/vans/${param.id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.vans)
                setvan(data.vans)
            })
    }, [param.id])

    // 目前只有type的篩選，如果多加其他篩選的話會返回會報錯，所以用此種方法讓返回時不會報錯
    const search = location.state && location.state.search || ""
    const type = location.state && location.state.type || "all"
    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>

            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}