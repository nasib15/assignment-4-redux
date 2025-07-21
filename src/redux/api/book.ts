import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mongoose-assignment-3-beta.vercel.app/api",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ page }) => `/books?page=${page}`,
      providesTags: ["books"],
    }),
    getSingleBookDeatils: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["books"],
    }),
    createBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookDeatilsQuery,
  useCreateBookMutation,
} = bookApi;
