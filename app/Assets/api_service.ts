import { headers } from "next/headers"

export const createUser = async (username: string, email: string, password: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registration`, {
        method: "POST",
        body: JSON.stringify({ username: username, email: email, password: password })
    }).then(respones=>respones.json())
}

export const loginUser = async (email:string, password: string) => { 
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`)
}

export async function getProfile(){
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`).then(res=>res.json())
}

export async function authUser(email:string, password:string){
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify({email: email, password: password})
    }).then(res=>res.json())
}

export async function logOutUser(){
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: 'POST'
    }).then(res=>res.json())
}