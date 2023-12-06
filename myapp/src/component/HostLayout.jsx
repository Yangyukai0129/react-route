import React from "react";
// Link跟NavLink一樣，只是NavLink內的className跟style可以寫成function形式
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return (
        <>
            <nav className="host-nav">
                <NavLink
                    // 與cd.跳到現在路徑是一樣意思
                    to="."
                    style={({ isActive }) => isActive ? activeStyles : null}
                    // 此路徑目前有/跟host，所以增加其他路徑的話會一起被使用。寫上end，如果有增加其他路徑，會停止此路徑
                    end
                >Dashboard
                </NavLink>
                <NavLink
                    // 絕對路徑寫法/host/income
                    to="income"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >Income
                </NavLink>
                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >vans
                </NavLink>
                <NavLink
                    to="reviews"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >Reviews
                </NavLink>
            </nav >
            <Outlet />
        </>
    )
}