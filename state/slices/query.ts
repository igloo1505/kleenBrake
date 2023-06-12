// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
// import { FeedContentType } from '../../types/ContentTypes'

// const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "http://pxxxx-platform.vercel.app/api/"

// export const queryApi = createApi({
//     reducerPath: "queryApi",
//     baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
//     tagTypes: ["feedPosts"],
//     endpoints: (builder) => ({
//         getFeedPosts: builder.query<FeedContentType[], string>({
//             query: (q) => `search?userId=${q}`,
//             providesTags: (res, err, search) => [{ type: "feedPosts", search }]
//         })
//     })
// })


