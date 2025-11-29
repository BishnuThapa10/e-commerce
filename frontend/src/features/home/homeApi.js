import { mainApi } from "../../app/mainApi.js";



export const homeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    getHero: builder.query({
      query: () => ({
        url: '/home/hero',
        method: 'GET'
      }),
      providesTags: ['Furnitures']
    }),

    getCategory: builder.query({
      query: () => ({
        url: '/home/category',
        method: 'GET'
      }),
      providesTags: ['Furnitures']
    }),

    getNew: builder.query({
      query: () => ({
        url: '/home/new',
        method: 'GET'
      }),
      providesTags: ['Furnitures']
    }),

  })
})

export const { useGetHeroQuery, useGetCategoryQuery, useGetNewQuery } = homeApi;