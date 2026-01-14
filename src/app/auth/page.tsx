"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

function AuthContent() {
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
  }, [router, redirect]);

  return <Loading />;
}

export default function Auth() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthContent />
    </Suspense>
  );
}
