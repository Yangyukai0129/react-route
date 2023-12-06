import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function HostVans() {
    const [van, setVan] = useState([])
    useEffect(() => {
        fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => {
                // console.log(data.vans)
                setVan(data.vans)
            })
    })

    const hostVansEls = van.map(van => (
        <Link
            to={`/host/vans/${van.id}`}
            key={van.id}
            className="host-class-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
            </div>
        </Link>
    ))
    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    van.length > 0 ? (
                        <section>
                            {hostVansEls}
                        </section>
                    ) : (
                        <h2>Loading...</h2>
                    )
                }
            </div>
        </section>
    )
}