import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function BookDetail() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [bookId, setBookId] = useState<number | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const id = parseInt(pathParts[2]);
    if (id && !isNaN(id)) setBookId(id);
  }, []);

  const { data: book, isLoading } = trpc.books.detail.useQuery(
    { id: bookId || 0 },
    { enabled: !!bookId }
  );

  const createRequest = trpc.requests.create.useMutation({
    onSuccess: () => {
      alert("Request submitted successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error creating request:", error);
      alert(`Unable to request book: ${error.message}`);
    },
  });

  const handleRequestBook = async () => {
    if (!bookId) return;
    setIsRequesting(true);
    try {
      await createRequest.mutateAsync({ bookId });
    } finally {
      setIsRequesting(false);
    }
  };

  if (!bookId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container py-8">
          <Button variant="outline" onClick={() => navigate("/catalog")}>
            Back to Catalog
          </Button>
          <div className="mt-8 text-center">
            <p className="text-slate-600">Book not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container py-4">
          <Button variant="ghost" onClick={() => navigate("/catalog")}>
            Back to Catalog
          </Button>
        </div>
      </nav>

      <main className="container py-8">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{book.title}</h1>

          <div className="space-y-4 mb-8">
            <div>
              <span className="font-semibold text-slate-900">Author:</span>
              <p className="text-slate-600">{book.author}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Category:</span>
              <p className="text-slate-600">{book.category}</p>
            </div>
            {book.isbn && (
              <div>
                <span className="font-semibold text-slate-900">ISBN:</span>
                <p className="text-slate-600">{book.isbn}</p>
              </div>
            )}
            <div>
              <span className="font-semibold text-slate-900">Availability:</span>
              <p className="text-slate-600">
                {book.availableCopies} of {book.totalCopies} copies available
              </p>
            </div>
            {book.description && (
              <div>
                <span className="font-semibold text-slate-900">Description:</span>
                <p className="text-slate-600 mt-2">{book.description}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {book.availableCopies > 0 ? (
              <>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                  Available
                </span>
                {isAuthenticated ? (
                  <Button
                    onClick={handleRequestBook}
                    disabled={isRequesting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    {isRequesting ? "Requesting..." : "Request Book"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    Sign In to Request
                  </Button>
                )}
              </>
            ) : (
              <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full font-medium">
                Not Available
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
