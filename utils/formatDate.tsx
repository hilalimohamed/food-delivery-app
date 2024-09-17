export function formatDate(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);

  const isToday = now.toDateString() === date.toDateString();
  const isYesterday =
    now.getDate() - 1 === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  // Format the time in 24-hour format (HH:MM)
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0"); // Ensures 2-digit hours
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures 2-digit minutes
    return `${hours}:${minutes}`;
  };

  if (isToday) {
    return `"${formatTime(date)}"`; // For today, return time in HH:MM
  }

  if (isYesterday) {
    return `Yesterday at "${formatTime(date)}"`; // For yesterday, return "Yesterday at HH:MM"
  }

  // For other dates, return date formatted as "YYYY-MM-DD at HH:MM"
  return `${date.toISOString().split("T")[0]} at "${formatTime(date)}"`;
}
