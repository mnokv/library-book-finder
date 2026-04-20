import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminRequests() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const { data: requests, refetch } = trpc.requests.allRequests.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin", refetchOnWindowFocus: false }
  );

  const { data: allBooks } = trpc.books.list.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin", refetchOnWindowFocus: false }
  );

  const getBookTitle = (bookId: number) => {
    const book = allBooks?.find(b => b.id === bookId);
    return book?.title || `Book #${bookId}`;
  };

  const updateStatus = trpc.requests.updateStatus.useMutation({
    onSuccess: () => {
      alert("Request status updated!");
      refetch();
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">You do not have permission to access this page.</p>
          <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700 text-white">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

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

  const handleUpdateStatus = async (requestId: number, newStatus: string) => {
    await updateStatus.mutateAsync({
      id: requestId,
      status: newStatus as "pending" | "approved" | "returned" | "rejected",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <Button variant="ghost" onClick={() => navigate("/admin")}>
            Back to Admin Panel
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Borrow Requests</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </nav>

      <main className="container py-8">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Review and Manage Requests</h2>

        {requests && requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-slate-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{getBookTitle(req.bookId)}</h3>
                    <p className="text-sm text-slate-600">Request #{req.id} from User #{req.userId}</p>
                  </div>
                  <span className={`status-badge ${getStatusBadge(req.status)}`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
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
                </div>

                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdateStatus(req.id, "approved")}
                      disabled={updateStatus.isPending}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(req.id, "rejected")}
                      disabled={updateStatus.isPending}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {req.status === "approved" && (
                  <Button
                    onClick={() => handleUpdateStatus(req.id, "returned")}
                    disabled={updateStatus.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Mark as Returned
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
            <p className="text-slate-600">No borrow requests yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
