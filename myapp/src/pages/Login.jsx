import React, { useState } from "react"
import { useLoaderData, useNavigate, Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../api"

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("login", true)
        console.log(data)
        return window.location.replace(pathname) //原寫法return redirect("/host")，但因為migrate.js問題所以會有問題
    }
    catch (err) {
        return err.message
    }
}

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export default function Login() {
    // const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const message = useLoaderData()
    const [status, setStatus] = useState("idle")
    // const [error, setError] = useState(null)
    const navigate = useNavigate()
    const navigation = useNavigation()
    const errorMessage = useActionData()
    console.log(navigation)

    function handleSubmit(e) {
        e.preventDefault()
            // setError(null)
            // console.log(loginFormData)
            // console.log(e.target)
            // loginUser(loginFormData)
            // replace: true will cause the navigation to replace the current entry in the history stack instead of adding a new one
            .then(data => navigate("/host", { replce: true }))
            // .catch(
            //     err => { setError(err) }
            // )
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
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            <Form
                method={"post"}
                className="login-form"
                // 用法跟navigate的replace一樣，按返回的時候history stake會把這個記錄刪掉所以不會顯示此頁面
                replace
            >
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
                <button disabled={navigation.status === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}