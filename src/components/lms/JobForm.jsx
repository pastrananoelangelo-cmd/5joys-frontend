import { useState } from "react";

const EMPTY_JOB = {
  title: "",
  department: "",
  location: "",
  type: "",
  summary: "",
  responsibilities: [""],
  qualifications: [""],
};

function JobForm({
  initialData = EMPTY_JOB,
  onSubmit,
  onCancel,
  submitting = false,
  editing = false,
}) {
  const [form, setForm] = useState(() => ({
    title: initialData.title ?? "",
    department: initialData.department ?? "",
    location: initialData.location ?? "",
    type: initialData.type ?? "",
    summary: initialData.summary ?? "",
    responsibilities:
      initialData.responsibilities?.length > 0
        ? [...initialData.responsibilities]
        : [""],
    qualifications:
      initialData.qualifications?.length > 0
        ? [...initialData.qualifications]
        : [""],
  }));

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleListChange(field, index, value) {
    setForm((current) => {
      const updated = [...current[field]];
      updated[index] = value;

      return {
        ...current,
        [field]: updated,
      };
    });
  }

  function addListItem(field) {
    setForm((current) => ({
      ...current,
      [field]: [...current[field], ""],
    }));
  }

  function removeListItem(field, index) {
    setForm((current) => {
      const updated = current[field].filter(
        (_, itemIndex) => itemIndex !== index
      );

      return {
        ...current,
        [field]: updated.length > 0 ? updated : [""],
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedJob = {
      ...form,
      title: form.title.trim(),
      department: form.department.trim(),
      location: form.location.trim(),
      type: form.type.trim(),
      summary: form.summary.trim(),
      responsibilities: form.responsibilities
        .map((item) => item.trim())
        .filter(Boolean),
      qualifications: form.qualifications
        .map((item) => item.trim())
        .filter(Boolean),
    };

    onSubmit(cleanedJob);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-6"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Job Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Department
          </label>

          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Employment Type
          </label>

          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            placeholder="e.g. Full-time"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-1 block text-sm font-medium">
          Summary
        </label>

        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">
            Responsibilities
          </h3>

          <button
            type="button"
            onClick={() => addListItem("responsibilities")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {form.responsibilities.map((responsibility, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={responsibility}
                onChange={(event) =>
                  handleListChange(
                    "responsibilities",
                    index,
                    event.target.value
                  )
                }
                required
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                placeholder={`Responsibility ${index + 1}`}
              />

              <button
                type="button"
                onClick={() =>
                  removeListItem("responsibilities", index)
                }
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">
            Qualifications
          </h3>

          <button
            type="button"
            onClick={() => addListItem("qualifications")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {form.qualifications.map((qualification, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={qualification}
                onChange={(event) =>
                  handleListChange(
                    "qualifications",
                    index,
                    event.target.value
                  )
                }
                required
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                placeholder={`Qualification ${index + 1}`}
              />

              <button
                type="button"
                onClick={() =>
                  removeListItem("qualifications", index)
                }
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {submitting
            ? "Saving..." : editing
              ? "Save Changes" : "Publish Position"
          }
        </button>
      </div>
    </form>
  );
}

export default JobForm;