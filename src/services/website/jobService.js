import { get } from "../lms/apiClient";

export function getJobs() {
  return get("/jobs");
}