import Image from "next/image";
import ActionButtons from "../ActionsButtons";
import { BLUR_DATA_URL } from "@/utils/data-util";

const HeroSection = ({ event }) => {
  return (
    <section className="container">
      <div className="bg-linear-to-b from-slate-200/20 to-slate-800/30">
        <Image
          src={event.imageUrl}
          alt={event.name}
          className="h-112.5 mx-auto"
          width={900}
          height={900}
          quality={90}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>

      <div className="flex items-end">
        <div className="flex-auto py-4">
          <h1 className="font-bold text-2xl">{event.name}</h1>
          <p className="text-[#9C9C9C] text-base mt-1">{event.location}</p>
          <div className="text-[#737373] text-sm mt-1">
            <span>{event.interested_ids.length} Interested</span>
            <span> | </span>
            <span>{event.going_ids.length} Going</span>
          </div>
        </div>

        <ActionButtons fromDetails={true} />
      </div>
    </section>
  );
};

export default HeroSection;
