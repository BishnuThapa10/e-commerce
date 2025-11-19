import { mainApi } from "../../app/mainApi.js";



export const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getAllProduct: builder.query({
      query: ({ search = '', page = 1, limit = 8, sort = '' } = {}) => ({
        url: '/furnitures',
        params: { search, page, sort, limit },
        method: 'GET'
      }),

      providesTags: ['Furnitures']

    }),

  })
})


export const {useGetAllProductQuery} = productApi;