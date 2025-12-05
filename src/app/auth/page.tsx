"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

export default function Auth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  useEffect(() => {
    router.prefetch("/auth/*");
    if (redirect) {
      router.replace(`/auth/login?redirect=${redirect}`);
    } else {
      router.replace(`/auth/login`);
    }
  }, [router]);

  return Loading();
}
