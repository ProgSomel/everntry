"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function ConfirmToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("confirmed") === "true") {
      toast.success("Attendance confirmed! You are going to this event.", {
        duration: 5000,
      });
      router.replace(pathname);
    }
  }, [searchParams, router, pathname]);

  return null;
}
