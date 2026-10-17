
import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";

function Dashboard({ employees, loading, error }) {
  const [search, setSearch] = useState("");

  const filtered = employees.filter((employee) =>
    `${employee.name} ${employee.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">PEOPLE MANAGEMENT</p>
          <h1>Good day! 🌿</h1>
          <p className="subtitle">
            Here's an overview of your employee directory.
          </p>
        </div>

        <Link to="/employee-form" className="primary-button">
          + Add employee
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">♙</div>
          <p>Total employees</p>
          <h2>{loading ? "..." : employees.length}</h2>
          <span>Employee records</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✉</div>
          <p>Contact records</p>
          <h2>{loading ? "..." : employees.filter((e) => e.email).length}</h2>
          <span>Email addresses available</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <p>Directory status</p>
          <h2 className="status-heading">
            {loading ? "Loading" : error ? "Offline" : "Active"}
          </h2>
          <span>Employee data connection</span>
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Employee directory</h2>
            <p>Browse and search employee information.</p>
          </div>
          <span className="record-count">{filtered.length} records</span>
        </div>

        <div className="search-wrap">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {loading ? (
          <p className="message">Loading employee records...</p>
        ) : error && employees.length === 0 ? (
          <p className="error-message">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="message">No matching employees found.</p>
        ) : (
          <div className="table-responsive">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMPLOYEE</th>
                  <th>EMAIL ADDRESS</th>
                  <th>DESIGNATION</th>
                  <th>LOCATION</th>
                  <th>SALARY (₹)</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((employee) => (
                  <tr key={employee.id}>
                    <td className="id-cell">
                      {String(employee.id).padStart(3, "0")}
                    </td>

                    <td>
                      <div className="employee-info">
                        <div className="avatar">
                          {employee.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <span>{employee.name}</span>
                      </div>
                    </td>

                    <td className="email-cell">
                      {employee.email || "Not provided"}
                    </td>

                    <td>{employee.designation || "—"}</td>
                    <td>{employee.location || "—"}</td>
                    <td>
                      {employee.salary
                        ? Number(employee.salary).toLocaleString("en-IN")
                        : "—"}
                    </td>

                    <td>
                      <span className="status-pill">
                        <span className="status-dot"></span>
                        Available
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="page-note">
        PeopleHub · Employee information at a glance
      </p>
    </div>
  );
}

function EmployeeForm({ onAddEmployee }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    designation: "",
    location: "",
    salary: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newEmployee = {
      id: Date.now(),
      name: form.name.trim(),
      email: "",
      designation: form.designation.trim(),
      location: form.location.trim(),
      salary: form.salary,
    };

    onAddEmployee(newEmployee);

    setMessage(`Employee ${newEmployee.name} added successfully!`);

    setForm({
      name: "",
      designation: "",
      location: "",
      salary: "",
    });

    // Return to Home so the new employee can be seen in the table.
    navigate("/");
  }

  function clearForm() {
    setForm({
      name: "",
      designation: "",
      location: "",
      salary: "",
    });
    setMessage("");
  }

  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">PEOPLE MANAGEMENT</p>
          <h1>Employee form</h1>
          <p className="subtitle">
            Enter the employee details below.
          </p>
        </div>

        <Link to="/" className="secondary-button">
          ← Back to dashboard
        </Link>
      </div>

      <section className="form-panel">
        <div className="form-title">
          <div className="form-title-icon">♙</div>
          <div>
            <h2>Employee information</h2>
            <p>Fields marked with * are required.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full name *
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </label>

            <label>
              Designation *
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. Software Developer"
                required
              />
            </label>

            <label>
              Location *
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Bengaluru"
                required
              />
            </label>

            <label>
              Monthly salary (₹) *
              <input
                type="number"
                name="salary"
                min="0"
                step="0.01"
                value={form.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={clearForm}
            >
              Clear form
            </button>

            <button type="submit" className="primary-button">
              Complete form
            </button>
          </div>

          {message && (
            <p className="success-message">{message}</p>
          )}
        </form>

        <p className="privacy-note">
          Demo only: employee details are stored temporarily in the app
          and are not sent to a server.
        </p>
      </section>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isFormPage = location.pathname === "/employee-form";

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load employees");
        }
        return response.json();
      })
      .then((data) => {
  const designations = [
    "HR Manager",
    "Software Developer",
    "UI/UX Designer",
    "Data Analyst",
    "Project Manager",
    "Web Developer",
    "Accountant",
    "Marketing Executive",
    "System Administrator",
    "Business Analyst",
  ];

  const salaries = [
    45000, 35000, 30000, 40000, 55000,
    32000, 28000, 30000, 38000, 42000,
  ];

  const employeesWithDetails = data.map((employee, index) => ({
    ...employee,
    designation: designations[index % designations.length],
    salary: salaries[index % salaries.length],
    location: employee.address?.city || "Not specified",
  }));

  setEmployees(employeesWithDetails);
})
      .catch(() => {
        setError(
          "Could not load sample employees. Check your internet connection."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function addEmployee(newEmployee) {
    setEmployees((previousEmployees) => [
      ...previousEmployees,
      newEmployee,
    ]);
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">P</span>
          <span>
            <strong>PeopleHub</strong>
            <small>HR WORKSPACE</small>
          </span>
        </Link>

        <p className="nav-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <Link
            to="/"
            className={!isFormPage ? "nav-link active" : "nav-link"}
          >
            <span className="nav-icon">▦</span> Home
          </Link>

          <Link
            to="/employee-form"
            className={isFormPage ? "nav-link active" : "nav-link"}
          >
            <span className="nav-icon">＋</span> Employee form
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">HR</div>
          <div>
            <strong>HR Workspace</strong>
            <small>Employee management</small>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <span className="breadcrumb">
            Workspace /{" "}
            <strong>{isFormPage ? "Employee form" : "Home"}</strong>
          </span>

          <div className="topbar-right">
            <span className="online-indicator"></span>
            <span>Workspace active</span>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                employees={employees}
                loading={loading}
                error={error}
              />
            }
          />

          <Route
            path="/employee-form"
            element={
              <EmployeeForm onAddEmployee={addEmployee} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
