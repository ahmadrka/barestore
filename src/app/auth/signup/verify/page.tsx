"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../styles.module.css";
import Loading from "@/app/loading";

export default function Verify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verificationInterval, setVerificationInterval] = useState(30);

  const sendVerificationEmail = () => {
    setVerificationInterval(30);
  };

  const verifyToken = (token: string) => {
    // Simulate an API call to verify the token
    if (token === "valid-token") {
      router.replace("/auth/signup/password");
    } else {
      setError("Invalid or expired verification link.");
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
    setLoading(false);
  }, [token]);

  if (loading) return Loading();

  if (error) {
    return (
      <div className={styles.parent}>
        <main className={styles.main}>
          <div className={`${styles.auth} ${styles.border}`}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/auth");
              }}
            >
              <p className={styles.error}>{error}</p>
              <button>{`<-`} Back</button>
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
          <h1>Verification</h1>
          <form className={styles.form}>
            <p>A verification link has been sent to your email.</p>
            <p>
              Please check your inbox and click the link to verify your account.
            </p>
            {verificationInterval > 0 ? (
              <button type="button" className="disabled" disabled>
                Resend In {verificationInterval}s
              </button>
            ) : (
              <button type="button" onClick={() => sendVerificationEmail()}>
                Resend Verification Email
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
