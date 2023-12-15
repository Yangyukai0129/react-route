import React, { Suspense, useEffect, useState } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../api";
import { requireAuth } from "../../util";

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ van: getHostVans() })
}

export default function HostVans() {
    // 改用useLoaderData而不是用useEffect(1)
    // const [van, setVan] = useState([])
    const dataPromise = useLoaderData()
    // 改用useLoaderData而不是用useEffect(2)
    // useEffect(() => {
    //     fetch("/api/host/vans")
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data.vans)
    //             setVan(data.vans)
    //         })
    // })


    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <Suspense fallback={<h2>Loading van...</h2>}>
                <Await resolve={dataPromise.van}>{
                    (van) => {
                        const hostVansEls = van.map(van => (
                            <Link
                                to={van.id}
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

                            <div className="host-vans-list">
                                {
                                    // 因為使用api.js，所以一定會有van就不需要這段代碼
                                    // van.length > 0 ? (
                                    < section >
                                        {hostVansEls}
                                    </section>
                                    // ) : (
                                    //     <h2>Loading...</h2>
                                    // )
                                }
                            </div>

                        )
                    }}
                </Await >
            </Suspense>
        </section>
    )
}