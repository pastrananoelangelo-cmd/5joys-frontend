function LocationCard({ location }) {
  return (
    <div className="fj-card p-6 flex flex-col h-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 mb-3">
        <img
          src={`${import.meta.env.BASE_URL}${location.imageUrl.replace(/^\//, "")}`}
          alt={location.name}
          className="h-56 w-full object-cover"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <h3 className="fj-display text-lg font-semibold leading-snug">{location.name}</h3>
        <span className="fj-badge shrink-0">{location.type}</span>
      </div>

      <div className="mt-4 space-y-1 text-sm" style={{ color: "var(--ink-soft)" }}>
        <p>{location.addressLine1}</p>
        <p>{location.city}, {location.region}</p>
      </div>

      <div className="mt-5 pt-5 border-t fj-hairline space-y-1.5 text-sm">
        <p><span className="font-extrabold text-xs mr-2" style={{ color: "var(--red-deep)" }}>TEL</span>{location.phone}</p>
        <p><span className="font-extrabold text-xs mr-2" style={{ color: "var(--red-deep)" }}>MAIL</span>{location.email}</p>
        {location.hours && (
          <p><span className="font-extrabold text-xs mr-2" style={{ color: "var(--red-deep)" }}>HRS</span>{location.hours}</p>
        )}
      </div>
    </div>
  );
}

export default LocationCard;