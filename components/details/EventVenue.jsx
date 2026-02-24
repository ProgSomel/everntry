"use client";

import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("./EventMap"), { ssr: false });

const EventVenue = ({ event }) => {
  return (
    <div className="overflow-hidden rounded-lg col-span-2 bg-[#242526]">
      <div className="w-full">
        <EventMap location={event.location} />
      </div>
      <div className="p-4">
        <p className="text-[#9C9C9C] text-base mt-1">{event.location}</p>
      </div>
    </div>
  );
};

export default EventVenue;
