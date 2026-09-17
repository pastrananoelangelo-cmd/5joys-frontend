import {
  get,
  post,
  put,
  remove,
} from "./apiClient";

export function getJobs() {
  return get("/jobs");
}

export function createJob(job) {
  return post("/jobs", job);
}

export function updateJob(id, job) {
  return put(`/jobs/${id}`, job);
}

export function deleteJob(id) {
  return remove(`/jobs/${id}`);
}