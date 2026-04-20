import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminPanel() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    isbn: "",
    totalCopies: 1,
  });

  const { data: books, refetch } = trpc.books.list.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  const addBook = trpc.books.add.useMutation({
    onSuccess: () => {
      alert("Book added successfully!");
      setFormData({ title: "", author: "", category: "", description: "", isbn: "", totalCopies: 1 });
      setShowAddForm(false);
      refetch();
    },
    onError: (error) => {
      console.error("Error adding book:", error);
      alert(`Error: ${error.message}`);
    },
  });

  const editBook = trpc.books.edit.useMutation({
    onSuccess: () => {
      alert("Book updated successfully!");
      setFormData({ title: "", author: "", category: "", description: "", isbn: "", totalCopies: 1 });
      setEditingId(null);
      refetch();
    },
    onError: (error) => {
      console.error("Error editing book:", error);
      alert(`Error: ${error.message}`);
    },
  });

  const deleteBook = trpc.books.delete.useMutation({
    onSuccess: () => {
      alert("Book deleted successfully!");
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting book:", error);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? parseInt(value) || 1 : value,
    }));
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook.mutateAsync(formData);
  };

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    await editBook.mutateAsync({
      id: editingId,
      title: formData.title,
      author: formData.author,
      category: formData.category,
      description: formData.description,
    });
  };

  const handleDeleteBook = async (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook.mutateAsync({ id: bookId });
    }
  };

  const startEdit = (book: any) => {
    setEditingId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description || "",
      isbn: book.isbn || "",
      totalCopies: book.totalCopies,
    });
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", author: "", category: "", description: "", isbn: "", totalCopies: 1 });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <Button variant="outline" onClick={() => navigate("/admin/requests")}>
            View Requests
          </Button>
        </div>
      </nav>

      <main className="container py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Manage Books</h2>
          <Button
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (editingId) cancelEdit();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {showAddForm ? "Cancel" : "Add New Book"}
          </Button>
        </div>

        {(showAddForm || editingId) && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingId ? "Edit Book" : "Add New Book"}
            </h3>
            <form onSubmit={editingId ? handleEditBook : handleAddBook} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Title
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Author
                  </label>
                  <Input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Category
                  </label>
                  <Input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
              {!editingId && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      ISBN
                    </label>
                    <Input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Total Copies
                    </label>
                    <Input
                      type="number"
                      name="totalCopies"
                      value={formData.totalCopies}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={addBook.isPending || editBook.isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {editingId ? (editBook.isPending ? "Updating..." : "Update Book") : (addBook.isPending ? "Adding..." : "Add Book")}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-6">
          {books && books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="bg-white border border-slate-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{book.title}</h3>
                    <p className="text-sm text-slate-600">by {book.author}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => startEdit(book)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteBook(book.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-semibold text-slate-900">Category:</span>
                    <p className="text-slate-600">{book.category}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Available:</span>
                    <p className="text-slate-600">{book.availableCopies} of {book.totalCopies}</p>
                  </div>
                  {book.isbn && (
                    <div>
                      <span className="font-semibold text-slate-900">ISBN:</span>
                      <p className="text-slate-600">{book.isbn}</p>
                    </div>
                  )}
                </div>
                {book.description && (
                  <p className="text-sm text-slate-600">{book.description}</p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
              <p className="text-slate-600">No books in the catalog yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
