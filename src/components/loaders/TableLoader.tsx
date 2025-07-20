import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableLoader = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
              </TableCell>
              <TableCell className="text-right">
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableLoader;
