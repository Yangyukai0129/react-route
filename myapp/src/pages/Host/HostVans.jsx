import React, { useEffect, useState } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../api";
import { requireAuth } from "../../util";

export async function loader() {
    await requireAuth()
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
        <>
            <Await resolve={dataPromise.van}>

            </Await>
            <section>
                <h1 className="host-vans-title">Your listed vans</h1>
                <div className="host-vans-list">
                    {
                        // 因為使用api.js，所以一定會有van就不需要這段代碼
                        // van.length > 0 ? (
                        <section>
                            {hostVansEls}
                        </section>
                        // ) : (
                        //     <h2>Loading...</h2>
                        // )
                    }
                </div>
            </section>
        </>
    )
}