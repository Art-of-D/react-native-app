export function formatDate(dateString: string): string {
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) {
    return "Invalid Date";
  }

  const date = new Date(parsedDate);
  const day = date.toLocaleDateString("uk-UA", { day: "2-digit" });
  const month = date.toLocaleDateString("uk-UA", { month: "long" });
  const year = date.getFullYear();
  const hours = date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} ${month}, ${year} | ${hours}`;
}
