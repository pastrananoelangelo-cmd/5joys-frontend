import { useEffect, useState } from "react";
import { getLocations } from "../../services/website/locationService";

import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";

import LocationCard from "../../components/website/LocationCard";
import LocationsMap from "../../components/website/LocationsMap";

function LocationsPage() {

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLocations()
      .then((data) => {
        setLocations(data);
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
        tag="Our Locations"
        title="Find your nearest 5JOYS"
        intro="Every 5JOYS store follows the same standard for stock, cleanliness, and service, wherever you find us."
      />

      {loading && (
        <p>Loading locations...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {!loading && !error && (
        <>
          <LocationsMap locations={locations} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {locations.map((loc) => (
              <LocationCard
                key={loc.id}
                location={loc}
              />
            ))}
          </div>
        </>
      )}

    </Section>
  );
}

export default LocationsPage;