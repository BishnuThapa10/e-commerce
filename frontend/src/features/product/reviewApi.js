import { mainApi } from "../../app/mainApi.js";



export const reviewApi  = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    submitReview: builder.mutation({
      query: ({id, data})  => ({
        url: `/reviews/${id}`,
        body: data,
        method: 'POST'
      }),
      invalidatesTags: ['Reviews', 'ID', 'Furnitures']
    }),

    getAllReview: builder.query({
      query: ({furniture}) => ({
        url: '/reviews',
        params: {furniture},
        method: 'GET'
      }),
      providesTags: ['Reviews', 'ID']
    }),

  })
});

export const {useSubmitReviewMutation, useGetAllReviewQuery} = reviewApi;