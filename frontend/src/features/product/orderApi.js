import { mainApi } from "../../app/mainApi.js";



export const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: ({data}) => ({
        url: '/orders',
        body: data,
        method: 'POST'
      }),
      invalidatesTags: ['Orders']
    }),

    getAllOrder: builder.query({
      query : () => ({
        url: '/orders',
        method: 'GET'
      }),
      providesTags: ['Orders']
    }),

  })
})

export const {useCreateOrderMutation, useGetAllOrderQuery} = orderApi;