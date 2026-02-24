import Link from "next/link";
import Image from "next/image";
import ActionsButtons from "../ActionsButtons";

export default function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <Image
        src={event.imageUrl}
        alt={event.name}
        width={600}
        height={400}
        className="w-full"
        quality={90}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      />

      <div className="p-3">
        <Link href={`/details/${event.id}`} className="font-bold text-lg">
          {event.name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{event.location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{event.interested_ids.length} Interested</span>
          <span> | </span>
          <span>{event.going_ids.length} Going</span>
        </div>

        <ActionsButtons />
      </div>
    </div>
  );
}
