export const get = async (path: string, params?: Object) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}${params?setParamsInURL(params):''}`, { cache: 'no-store' }).then(res=>res.json()))
export const post = async (path: string, data: Object) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, {cache: 'no-store', method: "POST", body: JSON.stringify(data)}).then(res=>res.json()))
export const put = async (path: string, data: Object) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, {cache: 'no-store', method: "PUT", body: JSON.stringify(data)}).then(res=>res.json()))
export const DELETE = async (path: string, data: Object) => (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, {cache: 'no-store', method: "DELETE", body: JSON.stringify(data)}).then(res=>res.json()))

function setParamsInURL(obj: any){
    let string: string = '?'
    for(let key in obj){
      if(Object.keys(obj)[Object.keys(obj).length-1] != key)
        string+=`${key}=${obj[key]}&`
      else
        string+=`${key}=${obj[key]}`
    }
    return string
}