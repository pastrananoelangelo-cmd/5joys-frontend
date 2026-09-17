import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLms } from "../../context/LmsContext";

const EMPLOYEE_LINKS = [
  { key: "dashboard", label: "Dashboard", route: "/lms/dashboard" },
  { key: "my-leaves", label: "My Leaves", route: "/lms/my-leaves" },
  { key: "profile", label: "Profile", route: "/lms/profile" },
];

const HR_LINKS = [
  { key: "hr-employees", label: "Employees", route: "/lms/employees" },
  { key: "hr-leave-requests", label: "Leave Requests", route: "/lms/leave-requests" },
  { key: "hr-leave-records", label: "Leave Records", route: "/lms/leave-records" },
  { key: "hr-career-management", label: "Career Management", route: "/lms/careers" },
  { key: "hr-reports", label: "Reports", route: "/lms/reports" },
];

function Sidebar({ open, onClose }) {
  const { currentUser, logout } = useLms();

  const navigate = useNavigate();
  const location = useLocation();

  const hasHRAccess =
    currentUser?.role === "HR" ||
    currentUser?.role === "ADMIN";

  const go = (route) => {
    navigate(route);
    onClose?.();
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <div
        className="lms-sidebar-backdrop"
        data-open={open}
        onClick={onClose}
      />

      <aside className="lms-sidebar" data-open={open}>
        <div className="lms-sidebar-brand">
          <span
            aria-hidden="true"
            style={{
              background: "var(--red)",
              color: "var(--gold)",
              borderRadius: 8,
              padding: "0.3rem 0.5rem",
            }}
          >
            5<span style={{ color: "var(--cyan)" }}>JOYS</span>
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {EMPLOYEE_LINKS.map((link) => (
            <button
              key={link.key}
              className="lms-nav-link"
              data-active={location.pathname === link.route}
              onClick={() => go(link.route)}
            >
              {link.label}
            </button>
          ))}

          {hasHRAccess && (
            <>
              <div className="lms-nav-section-label">
                HR Section
              </div>

              {HR_LINKS.map((link) => (
                <button
                  key={link.key}
                  className="lms-nav-link"
                  data-active={location.pathname === link.route}
                  onClick={() => go(link.route)}
                >
                  {link.label}
                </button>
              ))}
            </>
          )}
        </nav>

        <div className="lms-sidebar-footer">
          <button
            className="lms-nav-link"
            onClick={() => {
              logout();
              navigate("/lms/login");
              onClose?.();
            }}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;