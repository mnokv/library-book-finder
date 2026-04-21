import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-slate-900">Library Book Finder</h1>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
                {user?.role === "admin" && (
                  <Button variant="outline" onClick={() => navigate("/admin")}>
                    Admin Panel
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Find and Borrow Books
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Browse our library catalog, search for your favorite books, and request them for borrowing.
          </p>
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/catalog")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
            >
              Browse Books
            </Button>
          ) : (
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
            >
              Get Started
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">Search</div>
            <p className="text-slate-600">
              Find books by title, author, or category from our collection.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">Request</div>
            <p className="text-slate-600">
              Request books and track the status of your borrowing requests.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">Manage</div>
            <p className="text-slate-600">
              Admins can manage the catalog and approve borrow requests.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
