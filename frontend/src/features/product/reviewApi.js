import { mainApi } from "../../app/mainApi.js";



export const reviewApi  = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    submitReview: builder.mutation({
      query: ({id, data})  => ({
        url: `/reviews/${id}`,
        body: data,
        method: 'POST'
      }),
      invalidatesTags: ['Reviews', 'ID']
    }),

    getAllReview: builder.query({
      query: () => ({
        url: '/reviews',
        method: 'GET'
      }),
      providesTags: ['Reviews', 'ID']
    }),

  })
});

export const {useSubmitReviewMutation, useGetAllReviewQuery} = reviewApi;