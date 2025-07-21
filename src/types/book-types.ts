export interface IBook {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface IBorrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: Date;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowForm {
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  borrowDate: string;
  dueDate: string;
  notes?: string;
}

export interface IBookForm {
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
}
