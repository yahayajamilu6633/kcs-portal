import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="p-4 w-100">{children}</main>
    </div>
  );
}
