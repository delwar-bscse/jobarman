export function getRemainingDays(inputDate) {
  const now = new Date();
  const target = new Date(inputDate);

  // Calculate difference in milliseconds
  const diffMs = target.getTime() - now.getTime();

  // Convert to full days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0; // never return negative
}
