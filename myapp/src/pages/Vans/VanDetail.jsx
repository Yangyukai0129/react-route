import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link, useLoaderData } from "react-router-dom";
import { getVans } from "../../api"

export function loader({ params }) {
    // console.log(params)
    return getVans(params.id)
}

export default function VanDetail() {
    // 改用useLoaderData而不是用useEffect(1)
    // const param = useParams()
    const location = useLocation()
    const van = useLoaderData()
    console.log(location)
    // 改用useLoaderData而不是用useEffect(2)
    // const [van, setvan] = useState([null])
    // useEffect(() => {
    //     fetch(`/api/vans/${param.id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data.vans)
    //             setvan(data.vans)
    //         })
    // }, [param.id])

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

            {/* 改用useLoaderData而不是用useEffect(3) */}
            {/* {van ? ( */} {/* 在api.js已經有判斷了所以一定會有資料，就不用做這層判斷 */}
            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
            {/* ) : <h2>Loading...</h2>} */}
        </div>
    )
}