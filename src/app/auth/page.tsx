"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("redirect") || "login";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (status !== "login" && status !== "signup") {
      router.push("?redirect=login");
    }
  }, [status, router]);

  if (status !== "login" && status !== "signup") {
    return null;
  }

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div
          className={
            status == "login"
              ? `${styles.authActive} ${styles.borderBottom}`
              : `${styles.auth}`
          }
        >
          <div
            style={status !== "login" ? { display: "none" } : {}}
            className={styles.authActive}
          >
            <h1>Log In</h1>
            <form onSubmit={(e) => handleLogin(e)} className={styles.form}>
              <label htmlFor="email">
                <input type="text" id="email" placeholder=" " required />
                <span>Email</span>
              </label>
              <label htmlFor="password">
                <input type="password" id="password" placeholder=" " required />
                <span>Password</span>
              </label>
              <button type="submit">Log In</button>
            </form>
            <p>or log in with</p>
            <div className={styles.oauthButtons}>
              <button title="Google">
                <img
                  src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
                  alt="Google"
                />
              </button>
              <button title="Microsoft">
                <img
                  src="https://msftstories.thesourcemediaassets.com/2022/05/Microsoft-logo_rgb_c-wht-181x94.png"
                  alt="Microsoft"
                />
              </button>
              <button title="Apple">
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCALUAtgDASIAAhEBAxEB/8QAHAAAAwEAAwEBAAAAAAAAAAAAAAQFAwECBgcI/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB+qZr9SWzp2KaXOZNo56FGUziT7SWw/CoriPopTIxBqYGdmZucSqWRpRnaiyVDoOsIdydk9wVc1+pLZ07FNLnMm0c9CjKZxJ9pLYfhUVxH0UpkYg1MDOzM3OJVLI0oztRZKh0HWEO5Oye4Kua/Uls6dimlzmTaOehRlM4k+0lsPwqK4j6KUyMQamBnZmbnEqlkaUZ2oslQ6DrCHcnZPcFUTCVo4FFdfgnuaBRnc8E+pmFGMzwT7qQUfPUeBO7O5GI1AM6s7k4n0A0dnciy9AHdJ3JO0cCiuvwT3NAozueCfUzCjGZ4J91IKPnqPAndncjEagGdWdycT6AaOzuRZegDuk7knaOBRXX4J7mgUZ3PBPqZhRjM8E+6kFHz1HgTuzuRiNQDOrO5OJ9ANHZ3IsvQB3SdyTigFHOdyIsu9B9NbuT6OuRRlGpNtZ4FOExuS/RJrFGC8wJWUMRmTQ2MqM7MEqWhoxM6i+VTsOZzuRFl3oPprdyfR1yKMo1JtrPApwmNyX6JNYowXmBKyhiMyaGxlRnZglS0NGJnUXyqdhzOdyIsu9B9NbuT6OuRRlGpNtZ4FOExuS/RJrFGC8wJWUMRmTQ2MqM7MEqWhoxM6i+VTsOEoEtavUaXnaCTruA/OXYJ1bRQpxhwlXs0Cv51miSrqqBRiuuiVVBUYnUWTNyZiC1XU00kdRbWr1Gl52gk67gPzl2CdW0UKcYcJV7NAr+dZokq6qgUY"
                  alt="Apple"
                />
              </button>
            </div>
          </div>
          <Link
            href="auth?redirect=login"
            style={status == "login" ? { display: "none" } : {}}
          >
            want to login? <u>click here</u>
          </Link>
        </div>
        <div
          className={
            status == "signup"
              ? `${styles.authActive} ${styles.borderTop}`
              : `${styles.auth}`
          }
        >
          <div style={status !== "signup" ? { display: "none" } : {}}>
            <h1>Sign Up</h1>
          </div>
          <Link
            href="auth?redirect=signup"
            style={status == "signup" ? { display: "none" } : {}}
          >
            don't have an account? <u>click here</u>
          </Link>
        </div>
      </main>
    </div>
  );
}
