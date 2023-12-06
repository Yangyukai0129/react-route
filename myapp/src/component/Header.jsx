import React from "react";
// Link跟NavLink一樣，只是NavLink內的className跟style可以寫成function形式
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">#VANLIFE</Link>
            <nav>
                <NavLink
                    // 絕對路徑寫法/host
                    to="host"
                    // 如果不使用destructure的寫法: className={(props) => props.sActive ? "active-link" : null}
                    className={({ isActive }) => isActive ? "active-link" : null}
                >Host
                </NavLink>
                <NavLink
                    to="about"
                    className={({ isActive }) => isActive ? "active-link" : null}
                >About
                </NavLink>
                <NavLink
                    to="vans"
                    className={({ isActive }) => isActive ? "active-link" : null}
                >Vans
                </NavLink>
            </nav>
        </header>
    )
}