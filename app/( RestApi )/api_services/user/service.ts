import { post, get, patch } from "../requests"

// get
export const getProfile = () => get("user/profile")

// post
export const createUser =  (username: string, email: string, password: string) => 
    post("user/registration", {username, email, password})
export const authUser = (email:string, password:string) => post("user/login", {email, password})
export const logOutUser = () => post("user/logout", {})

// patch
export const updateParameters = ( weight: number, height: number ) => patch("user/parameters", { weight, height })
export const updateWeight = ( weight: number ) => patch("user/parameters", { weight })
export const updateHeight = ( height: number ) => patch("user/parameters", { height })