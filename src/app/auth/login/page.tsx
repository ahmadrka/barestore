"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../styles.module.css";
import Link from "next/link";
import useValidateEmail from "@/hook/useValidateEmail";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [error, setError] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });

  const dummyUser = {
    email: "test@mail.com",
    password: "admin123",
    twoFA: false,
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!useValidateEmail(login.email) || login.email !== dummyUser.email) {
      // Dummy email check
      setError("Email not found");
      return;
    } else if (login.password !== dummyUser.password) {
      // Dummy password check
      setError("Incorrect password");
      return;
    }

    setError("");

    if (dummyUser.twoFA) {
      // Redirect to 2FA verification page
      router.push("/auth/verify");
      return;
    }

    // GET ACCESS & REFRESH TOKEN AND SAVE TO COOKIES

    if (redirect) {
      router.push(redirect);
      return;
    }
    router.push("/home");
  };

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div className={`${styles.auth} ${styles.borderBottom}`}>
          <h1>Log In</h1>
          <form
            onSubmit={(e) => handleLogin(e)}
            onInvalid={() => setError("Please input email and password")}
            className={styles.form}
          >
            <label htmlFor="email">
              <input
                type="text"
                id="email"
                value={login.email}
                onChange={(e) =>
                  setLogin((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder=" "
                required
              />
              <span>Email</span>
            </label>
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                value={login.password}
                onChange={(e) =>
                  setLogin((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder=" "
                required
              />
              <span>Password</span>
            </label>
            <button type="submit">{`Start ->`}</button>
            {error && <p className={styles.error}>{error}</p>}
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
        <Link href="signup">
          don't have an account? <u>click here</u>
        </Link>
      </main>
    </div>
  );
}
