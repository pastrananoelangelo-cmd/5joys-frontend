import { useEffect, useState } from "react";
import { getJobs } from "../../services/website/jobService";

import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";
import JobCard from "../../components/website/JobCard";

function CareersPage() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Section tone="surface">
      <SectionHeading
        tag="Careers"
        title="Open positions"
        intro="Explore current opportunities across our stores and operations."
      />

      {loading && (
        <p>Loading open positions...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

export default CareersPage;