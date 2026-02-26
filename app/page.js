import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";

export const metadata = {
  title: "Home",
  description: "Discover and join the best events near you on Eventry.",
  openGraph: {
    title: "Eventry — Discover Events Near You",
    description: "Discover and join the best events near you on Eventry.",
  },
};

export default function Home() {
  return (
    <section className="container">
      <Header />
      <EventList />
    </section>
  );
}
