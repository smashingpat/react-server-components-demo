import { format } from "date-fns";

export default function formatDate(date: Date): string {
  return format(date, "dd MMMM yyyy");
}
