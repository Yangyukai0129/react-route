import React, { Suspense, useEffect, useState } from "react";
import { useParams, Link, NavLink, Outlet, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../util";

export async function loader({ request, params }) {
    await requireAuth(request)
    return defer({ detail: getHostVans(params.id) })

}

export default function HostVanDetail() {
    const param = useParams()
    const dataPromise = useLoaderData()

    // console.log(param)
    // const [currentVan, setCurrentVan] = useState(null)
    // useEffect(() => {
    //     // 使用 param.id 來取得 URL 參數中的 id
    //     fetch(`/api/host/vans/${param.id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setCurrentVan(data.vans);
    //         });
    // }, [param.id])
    // if (!currentVan) {
    //     return <h1>Loading...</h1>
    // }

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



                <Suspense fallback={<h2>Loading...</h2>}>
                    <Await resolve={dataPromise.detail}>
                        {
                            (currentVan) => {
                                return (
                                    <>
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

                                        <Outlet context={{ currentVan }} />
                                    </>
                                )

                            }
                        }
                    </Await >
                </Suspense >

            </div>




        </section >
    )
}