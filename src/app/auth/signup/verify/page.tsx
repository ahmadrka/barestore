"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../styles.module.css";
import button from "@/component/Styles/Button.module.css";
import form from "@/component/Styles/Form.module.css";
import Loading from "@/app/loading";
import { handleSignupVerify } from "@/lib/api/auth";
import { getCookie } from "@/lib/helper/cookies";

import { Suspense } from "react";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verificationInterval, setVerificationInterval] = useState(60);

  const sendVerificationEmail = () => {
    setVerificationInterval(60);
  };

  const verifyToken = async (token: string) => {
    const verifyData = await handleSignupVerify(token);

    if (verifyData.errorCode === "INVALID_TOKEN") {
      setError("Token invalid or expired");
      return;
    }

    if (verifyData.errorCode === "TOO_MANY_REQUESTS") {
      setError("Too many requests");
      return;
    }
    if (verifyData.success) {
      router.replace("/auth/signup/password");
    } else {
      setError("Failed to verify token");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVerificationInterval((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [verificationInterval]);

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  useEffect(() => {
    const checkToken = async () => {
      const tokenCookie = await getCookie("verifyToken");
      const hasTokenParam = searchParams.has("token");
      if (!hasTokenParam && !tokenCookie) {
        router.push("/auth/login");
      }
    };
    checkToken();
    setLoading(false);
  }, [router, searchParams]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className={styles.parent}>
        <main className={styles.main}>
          <div className={`${styles.auth} ${styles.border}`}>
            <div className={styles.title}>
              <h1>Verification</h1>
              <p>please re-verify your email to continue</p>
            </div>
            <form
              className={form.form}
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/auth/signup");
              }}
            >
              <p className={form.error}>{error}</p>
              <button className={button.primary}>{`<-`} Back</button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div className={`${styles.auth} ${styles.border}`}>
          <div className={styles.title}>
            <h1>Verification</h1>
            <p>please verify your email to continue</p>
          </div>
          <form className={form.form}>
            <p>A verification link has been sent to your email.</p>
            <p>
              Please check your inbox and click the link to verify your account.
            </p>
            {verificationInterval > 0 ? (
              <button
                type="button"
                className={`${button.disabled} ${button.primary}`}
                disabled
              >
                Resend In {verificationInterval}s
              </button>
            ) : (
              <button
                type="button"
                className={button.primary}
                onClick={() => sendVerificationEmail()}
              >
                Resend Verification Email
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyContent />
    </Suspense>
  );
}
