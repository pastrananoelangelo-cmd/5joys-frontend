import { useEffect, useState } from "react";
import JobForm from "../../components/lms/JobForm";
import {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
} from "../../services/lms/jobManagementService";

function CareerManagementPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [editingJob, setEditingJob] = useState(null);

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs() {
        try {
            setLoading(true);
            setError("");

            const data = await getJobs();

            setJobs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateJob(job) {
        try {
            setSubmitting(true);
            setFormError("");

            await createJob(job);

            await loadJobs();

            setShowForm(false);
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleUpdateJob(job) {
        try {
            setSubmitting(true);
            setFormError("");

            await updateJob(editingJob.id, job);

            await loadJobs();

            setEditingJob(null);
            setShowForm(false);
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDeleteJob(job) {
        const confirmed = window.confirm(
            `Remove "${job.title}" from the careers page?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteJob(job.id);

            await loadJobs();
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) {
        return <p>Loading careers...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        Website Careers
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage job positions displayed on the public careers page.
                    </p>
                </div>

                {!showForm && (
                    <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="fj-btn-primary"
                    >
                        + Add Position
                    </button>
                )}
            </div>
            {showForm && (
                <div className="mb-6">
                    {formError && (
                        <p className="mb-3 text-sm text-red-600">
                            {formError}
                        </p>
                    )}

                    <JobForm
                        key={editingJob?.id ?? "new"}
                        initialData={editingJob ?? undefined}
                        editing={Boolean(editingJob)}
                        onSubmit={
                            editingJob
                                ? handleUpdateJob
                                : handleCreateJob
                        }
                        onCancel={() => {
                            setShowForm(false);
                            setEditingJob(null);
                            setFormError("");
                        }}
                        submitting={submitting}
                    />
                </div>
            )}

            {jobs.length === 0 ? (
                <div className="rounded-xl border border-gray-200 p-6">
                    <p className="text-gray-500">
                        No open positions are currently published.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="rounded-xl border border-gray-200 bg-white p-5"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {job.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {job.department} • {job.type}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {job.location}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingJob(job);
                                            setShowForm(true);
                                            setFormError("");
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            });
                                        }}
                                        className="rounded-lg border px-3 py-2 text-sm"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteJob(job)}
                                        className="rounded-lg border px-3 py-2 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-gray-600">
                                {job.summary}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CareerManagementPage;