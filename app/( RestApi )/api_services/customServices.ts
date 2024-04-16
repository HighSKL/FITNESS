import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// постепенное внедрение rtk queries

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL+"/api/"}),
    endpoints: (build) =>({
        getProfile: build.query({
            query: ()=>({
                url: "user/profile"
            })
        })
    }),
})