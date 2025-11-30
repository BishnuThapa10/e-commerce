import { mainApi } from "../../app/mainApi.js";



export const contactApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    createContact: builder.mutation({
      query: ({data}) => ({
        url: '/contacts',
        body: data,
        method: 'POST'
      }),
      invalidatesTags: ['Contacts']
    }),

    getAllContact: builder.query({
      query: () => ({
        url: '/contacts',
        method: 'GET'
      }),
      providesTags: ['Contacts']
    }),

    deleteContact: builder.mutation({
      query : (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Contacts', 'ID']
    })
  })
})

export const {useCreateContactMutation, useGetAllContactQuery, useDeleteContactMutation} = contactApi;