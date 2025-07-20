import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mongoose-assignment-3-beta.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getAllBorrows: builder.query({
      query: () => "/borrow",
    }),
  }),
});

export const { useGetAllBorrowsQuery } = borrowApi;
