import { createSlice } from "@reduxjs/toolkit";

export interface IBookState {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const initialState: IBookState = {
  title: "The Alchem",
  author: "Lala Coelho",
  genre: "SCIENCE",
  isbn: "9780061122415",
  description: "A fable about following your dream.",
  copies: 10,
  available: true,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});
