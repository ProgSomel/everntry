const EventSchemaScript = ({ event }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.details,
    image: event.imageUrl,
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Eventry",
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default EventSchemaScript;
