import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEventById } from "@/db/queries";

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  return (
    <>
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
