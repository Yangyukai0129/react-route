import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Vans() {

    const [vans, setVans] = useState([])
    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setVans(data.vans)
            })
    }, [])

    const vanElements = vans.map(van => (
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
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}