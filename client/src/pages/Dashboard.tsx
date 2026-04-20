import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const { data: requests, isLoading, refetch: refetchRequests } = trpc.requests.userRequests.useQuery(
    undefined,
    { enabled: isAuthenticated, refetchOnWindowFocus: false }
  );

  const { data: allBooks } = trpc.books.list.useQuery(
    undefined,
    { enabled: isAuthenticated, refetchOnWindowFocus: false }
  );

  const cancelRequest = trpc.requests.updateStatus.useMutation({
    onSuccess: () => {
      alert("Request cancelled successfully!");
      refetchRequests();
    },
    onError: (error) => {
      console.error("Error cancelling request:", error);
      alert(`Error: ${error.message}`);
    },
  });

  const getBookTitle = (bookId: number) => {
    const book = allBooks?.find(b => b.id === bookId);
    return book?.title || `Book #${bookId}`;
  };

  const handleCancelRequest = async (requestId: number) => {
    if (window.confirm("Cancel this request?")) {
      await cancelRequest.mutateAsync({
        id: requestId,
        status: "rejected",
      });
    }
  };



  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: "status-pending",
      approved: "status-approved",
      returned: "status-returned",
      rejected: "status-rejected",
    };
    return statusClasses[status] || "status-pending";
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Please sign in to view your dashboard.</p>
          <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700 text-white">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
          <Button variant="outline" onClick={() => navigate("/catalog")}>
            Browse Books
          </Button>
        </div>
      </nav>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Welcome, {user?.name}</h2>
          <p className="text-slate-600">Manage your book requests and track their status.</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading your requests...</p>
          </div>
        ) : requests && requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-slate-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{getBookTitle(req.bookId)}</h3>
                    <p className="text-sm text-slate-600">Request #{req.id}</p>
                  </div>
                  <span className={`status-badge ${getStatusBadge(req.status)}`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-slate-900">Requested:</span>
                    <p className="text-slate-600">{formatDate(req.requestDate)}</p>
                  </div>
                  {req.approvalDate && (
                    <div>
                      <span className="font-semibold text-slate-900">Approved:</span>
                      <p className="text-slate-600">{formatDate(req.approvalDate)}</p>
                    </div>
                  )}
                  {req.returnDate && (
                    <div>
                      <span className="font-semibold text-slate-900">Returned:</span>
                      <p className="text-slate-600">{formatDate(req.returnDate)}</p>
                    </div>
                  )}
                </div>

                {req.status === "pending" && (
                  <div className="mt-4">
                    <Button
                      onClick={() => handleCancelRequest(req.id)}
                      disabled={cancelRequest.isPending}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Cancel Request
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
            <p className="text-slate-600 mb-4">You haven't made any book requests yet.</p>
            <Button
              onClick={() => navigate("/catalog")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Browse Books
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
