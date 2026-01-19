"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Images() {
  const router = useRouter();
  useEffect(() => {
    router.push("/products");
  }, []);

  return (
    <div>
      <h1>Images</h1>
    </div>
  );
}
