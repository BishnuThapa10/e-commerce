import { get } from "react-hook-form";
import { mainApi } from "../../app/mainApi.js";



export const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getAllProduct: builder.query({
      query: ({ search = '', page = 1, limit = '', sort = '', fields = '' } = {}) => ({
        url: '/furnitures',
        params: { search, page, sort, limit, fields },
        method: 'GET'
      }),

      providesTags: ['Furnitures']

    }),

    addItem: builder.mutation({
      query: ({ formData }) => ({
        url: '/furnitures',
        body: formData,
        method: 'POST'
      }),
      invalidatesTags: ['Furnitures', 'ID']
    }),

    getSingleItme: builder.query({
      query: (id) => ({
        url:`/furnitures/${id}`,
        method: 'GET'
      }),
      providesTags: ['Furnitures']
    }),

    updateItem: builder.mutation({
      query: ({id, formData}) => ({
        url: `/furnitures/${id}`,
        body: formData,
        method: `PATCH`
      }),
      invalidatesTags: ['Furnitures', 'ID']
    }),

    removeItem: builder.mutation({
      query: (id) => ({
        url:`/furnitures/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['Furnitures', 'ID']
    }),

  })
})


export const { useGetAllProductQuery, useAddItemMutation, useGetSingleItmeQuery, useUpdateItemMutation, useRemoveItemMutation } = productApi;