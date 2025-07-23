export interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
}
