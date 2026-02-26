"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function GlobalToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "invalid-token") {
      toast.error("Confirmation link is invalid or has expired.", {
        duration: 5000,
      });
      router.replace(pathname);
    }
  }, [searchParams, router, pathname]);

  return null;
}
