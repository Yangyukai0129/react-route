import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {

    const [vans, setVans] = useState([])
    const [searchParams, setSearchParam] = useSearchParams()

    const typeFilter = searchParams.get("type")
    // console.log(typeFilter)

    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setVans(data.vans)
            })
    }, [])

    const displayedVans = typeFilter ? vans.filter(item => item.type.toLowerCase() === typeFilter) : vans

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
            </Link>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </div>
    ))

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                {/* 寫法一 */}
                {/* <Link
                    to="?type=simple"
                    className="van-type simple"
                >simple</Link>
                <Link
                    to="?type=rugged"
                    className="van-type rugged"
                >rugged</Link>
                <Link
                    to="?type=luxury"
                    className="van-type luxury"
                >luxury</Link>
                <Link
                    to="."
                    className="van-type clear-filters"
                >clear</Link> */}
                {/* 寫法二 */}
                <button onClick={() => setSearchParam({ type: "simple" })} className="van-type simple">simple</button>
                <button onClick={() => setSearchParam({ type: "rugged" })} className="van-type rugged">rugged</button>
                <button onClick={() => setSearchParam({ type: "luxury" })} className="van-type luxury">luxury</button>
                <button onClick={() => setSearchParam({})} className="van-type clear-filters">clear</button>
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}