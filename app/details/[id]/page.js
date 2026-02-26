import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import ConfirmToast from "@/components/details/ConfirmToast";
import EventSchemaScript from "@/components/metaData/EventSchemaScript";
import { getEventById } from "@/db/queries";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.name,
    description: event.details,
    openGraph: {
      title: event.name,
      description: event.details,
      images: [{ url: event.imageUrl }],
      type: "website",
    },
  };
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  return (
    <>
      <ConfirmToast />
      <HeroSection event={event} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails event={event} />
          <EventVenue event={event} />
        </div>
      </section>
    </>
  );
}
