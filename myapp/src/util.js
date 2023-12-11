import { redirect } from "react-router-dom"

export async function requireAuth() {
    const isLoggedIn = false

    if (!isLoggedIn) {
        // 這是教學的作法，可是會有問題，還找不到問題點
        // throw redirect("/login")
        const redirectUrl = "/login";
        // 手动执行重定向
        window.location.replace(redirectUrl);
        // 或者抛出一个自定义的错误，然后在加载器中捕获并处理
        // throw new RedirectError(redirectUrl);
    }

}