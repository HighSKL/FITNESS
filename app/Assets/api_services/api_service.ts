// import { headers } from "next/headers"

// export const createUser = async (username: string, email: string, password: string) => {
//     return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/registration`, {
//         method: "POST",
//         body: JSON.stringify({ username: username, email: email, password: password })
//     }).then(respones=>respones.json())
// }

// export const loginUser = async (email:string, password: string) => { 
//     return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`)
// }

// export async function getProfile(){
//     return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`).then(res=>res.json())
// }

// export async function authUser(email:string, password:string){
//     return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
//         method: 'POST',
//         body: JSON.stringify({email: email, password: password})
//     }).then(res=>res.json())
// }

// export async function logOutUser(){
//     return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
//         method: 'POST'
//     }).then(res=>res.json())
// }