export function getFirstName(employeeName) {
  if (!employeeName) {
    return "";
  }

  const parts = employeeName.split(",");

  // Expected format: "Last Name, First Name Middle Name"
  if (parts.length >= 2) {
    return parts[1]
      .trim()
      .split(/\s+/)[0];
  }

  // Fallback for names that don't follow the expected format
  return employeeName
    .trim()
    .split(/\s+/)[0];
}