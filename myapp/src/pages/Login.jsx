import React, { useState } from "react"
import { useLoaderData, useNavigate, Form } from "react-router-dom"
import { loginUser } from "../api"

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const data = await loginUser({ email, password })
    console.log(data)
    return null
}

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export default function Login() {
    // const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const message = useLoaderData()
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    function handleSubmit(e) {
        e.preventDefault()
        setError(null)
            // console.log(loginFormData)
            // console.log(e.target)
            // loginUser(loginFormData)
            // replace: true will cause the navigation to replace the current entry in the history stack instead of adding a new one
            .then(data => navigate("/host", { replce: true }))
            .catch(
                err => { setError(err) }
            )
            .finally(setStatus("submitting"))
    }

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setLoginFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    return (
        <div className="login-container">
            {message && <h3 className="red">{message}</h3>}
            <h1>Sign in to your account</h1>
            {error && <h3 className="red">{error.message}</h3>}
            <Form method={"post"} className="login-form">
                <input
                    name="email"
                    // onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                // value={loginFormData.email}
                />
                <input
                    name="password"
                    // onChange={handleChange}
                    type="password"
                    placeholder="Password"
                // value={loginFormData.password}
                />
                <button disabled={status === "submitting"}
                >
                    {status === "submitting"
                        ? "Logging..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}