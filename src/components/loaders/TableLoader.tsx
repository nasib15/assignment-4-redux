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
    <div className="rounded-xl border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 bg-muted/30">
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow
              key={index}
              className="border-border/30 hover:bg-accent/30 transition-colors duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-300 to-purple-300 rounded-full animate-shimmer"></div>
                  <div
                    className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-shimmer"
                    style={{
                      width: `${120 + Math.random() * 80}px`,
                      animationDelay: `${index * 100}ms`,
                      animationDuration: `${1.5 + Math.random() * 0.5}s`,
                    }}
                  ></div>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer"
                  style={{
                    width: `${100 + Math.random() * 60}px`,
                    animationDelay: `${index * 100 + 50}ms`,
                    animationDuration: `${1.5 + Math.random() * 0.5}s`,
                  }}
                ></div>
              </TableCell>
              <TableCell>
                <div
                  className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-shimmer"
                  style={{
                    width: `${80 + Math.random() * 40}px`,
                    animationDelay: `${index * 100 + 100}ms`,
                    animationDuration: `${1.5 + Math.random() * 0.5}s`,
                  }}
                ></div>
              </TableCell>
              <TableCell>
                <div
                  className="h-4 bg-gradient-to-r from-muted/80 via-muted/40 to-muted/80 rounded font-mono animate-shimmer"
                  style={{
                    width: `90px`,
                    animationDelay: `${index * 100 + 150}ms`,
                    animationDuration: `${1.5 + Math.random() * 0.5}s`,
                  }}
                ></div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-bounce-subtle"
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  ></div>
                  <div
                    className="h-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded animate-shimmer"
                    style={{
                      width: `30px`,
                      animationDelay: `${index * 100 + 200}ms`,
                      animationDuration: `${1.5 + Math.random() * 0.5}s`,
                    }}
                  ></div>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className="h-6 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full animate-shimmer"
                  style={{
                    width: `${70 + Math.random() * 20}px`,
                    animationDelay: `${index * 100 + 250}ms`,
                    animationDuration: `${1.5 + Math.random() * 0.5}s`,
                  }}
                ></div>
              </TableCell>
              <TableCell className="text-right">
                <div
                  className="h-8 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-shimmer ml-auto"
                  style={{
                    animationDelay: `${index * 100 + 300}ms`,
                    animationDuration: `${1.5 + Math.random() * 0.5}s`,
                  }}
                ></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Floating loading indicator */}
      <div className="absolute top-4 right-4 opacity-60">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow"></div>
          <span className="animate-pulse">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default TableLoader;
