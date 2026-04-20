import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();


  const { data: books, isLoading } = trpc.books.search.useQuery(
    { query: searchQuery },
    { refetchOnWindowFocus: false }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Book Catalog</h1>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            My Requests
          </Button>
        </div>
      </nav>

      <main className="container py-8">
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading books...</p>
          </div>
        ) : books && books.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  {book.title}
                </h2>
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-semibold">Category:</span> {book.category}
                </p>
                <p className="text-sm text-slate-600 mb-4">
                  <span className="font-semibold">Available:</span> {book.availableCopies} of {book.totalCopies}
                </p>
                {book.availableCopies > 0 ? (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                    Available
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
                    Not Available
                  </span>
                )}
                <Button
                  onClick={() => handleViewDetails(book.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">No books found. Try a different search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
