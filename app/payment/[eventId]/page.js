import PaymentForm from "@/components/payments/paymentForm";
import { getEventById } from "@/db/queries";

export async function generateMetadata({ params }) {
  const { eventId } = await params;
  const event = await getEventById(eventId);

  if (!event) return { title: "Payment" };

  return {
    title: `Payment — ${event.name}`,
    description: `Complete your payment to confirm attendance for ${event.name}.`,
  };
}

export default async function PaymentPage({ params }) {
  const { eventId } = await params;
  const event = await getEventById(eventId);

  return (
    <section className="container">
      <div className="bg-[#242526] p-6 rounded-lg max-w-xl mx-auto my-12">
        <h2 className="font-bold text-xl mb-1">Payment Details</h2>
        <p className="text-[#9C9C9C] text-sm mb-8">
          Event: <span className="text-white font-medium">{event.name}</span>
        </p>
        <PaymentForm eventId={eventId} />
      </div>
    </section>
  );
}
