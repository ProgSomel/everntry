"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { toggleInterestedAction } from "@/actions/event";
import { useRouter, usePathname } from "next/navigation";

const ActionButtons = ({ fromDetails, event }) => {
  const { auth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [interestedPending, startInterestedTransition] = useTransition();

  const isInterested = auth
    ? event?.interested_ids?.map(String).includes(String(auth.id))
    : false;

  const isGoing = auth
    ? event?.going_ids?.map(String).includes(String(auth.id))
    : false;

  const handleInterested = () => {
    if (!auth) {
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }
    startInterestedTransition(async () => {
      await toggleInterestedAction(event.id, auth.id);
    });
  };

  const handleGoing = () => {
    if (!auth) {
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }
    router.push(`/payment/${event.id}`);
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={handleInterested}
        disabled={interestedPending || isGoing}
        className={`w-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
          isInterested || isGoing
            ? "bg-indigo-800 hover:bg-indigo-700"
            : "bg-[#464849] hover:bg-[#3C3D3D]"
        }`}
      >
        {interestedPending ? (isInterested ? "Removing..." : "Saving...") : isInterested || isGoing ? "Interested ✓" : "Interested"}
      </button>
      <button
        onClick={handleGoing}
        disabled={isGoing}
        className={`w-full transition-colors disabled:cursor-not-allowed ${
          isGoing
            ? "bg-green-700 opacity-70"
            : "bg-[#464849] hover:bg-[#3C3D3D]"
        }`}
      >
        {isGoing ? "Going ✓" : "Going"}
      </button>
    </div>
  );
};

export default ActionButtons;
