import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export function loader() {
    return getVans()
}

export default function Vans() {

    // 改用useLoaderData而不是用useEffect(1)
    // const [vans, setVans] = useState([])
    // const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParam] = useSearchParams()
    const [error, setError] = useState(null)
    // 改用useLoaderData而不是用useEffect(把data改成vans)(2)
    const vans = useLoaderData()
    // console.log(data)
    // const location = useLocation()
    // console.log(location)
    // console.log(searchParams.toString())

    const typeFilter = searchParams.get("type")
    // console.log(typeFilter)

    // 改用useLoaderData而不是用useEffect(3)
    // useEffect(() => {
    //     async function loadVans() {
    //         setLoading(true)
    //         try {
    //             const data = await getVans()
    //             setVans(data)
    //         } catch (err) {
    //             setError(err)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     loadVans()
    // }, [])

    const displayedVans = typeFilter ? vans.filter(item => item.type.toLowerCase() === typeFilter) : vans

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{ search: `?${searchParams.toString()}`, type: typeFilter }}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
            </Link>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </div >
    ))

    function handleFilterChange(key, value) {
        setSearchParam(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }

            // console.log(prevParams.toString())
            return prevParams
        })
    }

    // 改用useLoaderData而不是用useEffect(4         )
    // if (loading) {
    //     return <h1>Loading...</h1>
    // }

    // if (error) {
    //     return <h1>There was an error:{error.message}</h1>
    // }

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
                {typeFilter ? <Link
                    to="."
                    className="van-type clear-filters"
                >clear</Link> : null} */}
                {/* 寫法二 */}
                {/* <button onClick={() => setSearchParam({ type: "simple" })}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                >simple</button>
                <button onClick={() => setSearchParam({ type: "rugged" })}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                >rugged</button>
                <button onClick={() => setSearchParam({ type: "luxury" })}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                >luxury</button> */}
                {/* 如果沒有篩選的話不會出現clear */}
                {/* {typeFilter ? <button onClick={() => setSearchParam({})} className="van-type clear-filters">clear</button> : null} */}
                {/* 寫法三(多加其他篩選可以在頁面顯示，e.g.原本只能顯示?type=rugged，用這個寫法的話可以顯示?type=rugged&name=Modest Explorer ) */}
                <button onClick={() => handleFilterChange("type", "simple")}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>simple</button>
                <button onClick={() => handleFilterChange("type", "rugged")}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>rugged</button>
                <button onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>luxury</button>
                {typeFilter ? <button onClick={() => handleFilterChange("type", null)}
                    className="van-type clear-filters">clear</button> : null}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}