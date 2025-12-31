export default function Sidebar() {
  return (
    <aside
      className="bg-dark text-white p-3 vh-100"
      style={{ width: "250px" }}
    >
      <h4 className="text-center">Admin Panel</h4>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/admin/dashboard" className="nav-link text-white">
            Dashboard
          </a>
        </li>
      </ul>
    </aside>
  );
}
