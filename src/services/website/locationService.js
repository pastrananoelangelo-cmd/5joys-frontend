import { get } from "../lms/apiClient";

export function getLocations() {
  return get("/locations");
}