import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ContentsApi = createApi({
  reducerPath: "ContentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.clinicaltrialskorea.com",
  }),
  endpoints: (builder) => ({
    getContents: builder.query({
      query: (name) => `/api/v1/search-conditions/?name=${name}`,
      keepUnusedDataFor: 30,
    }),
  }),
});
export const { useGetContentsQuery } = ContentsApi;
