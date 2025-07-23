import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { bookApi } from "./book";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mongoose-assignment-3-beta.vercel.app/api",
  }),
  tagTypes: ["borrows"],
  endpoints: (builder) => ({
    getAllBorrows: builder.query({
      query: () => "/borrow",
      providesTags: ["borrows"],
    }),
    createBorrow: builder.mutation({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["borrows"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(bookApi.util.invalidateTags(["books"]));
        } catch {
          toast.error("Failed to borrow book");
        }
      },
    }),
  }),
});

export const { useGetAllBorrowsQuery, useCreateBorrowMutation } = borrowApi;
