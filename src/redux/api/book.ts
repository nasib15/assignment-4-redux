import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mongoose-assignment-3-beta.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
    }),
    getSingleBookDeatils: builder.query({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetSingleBookDeatilsQuery } = bookApi;
