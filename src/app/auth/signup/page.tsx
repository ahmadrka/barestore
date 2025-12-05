"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles.module.css";
import Link from "next/link";
import useValidateEmail from "@/hook/useValidateEmail";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [signup, setSignup] = useState({
    name: "",
    email: "",
  });

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signup.name.length < 3) {
      setError("Name too short");
      return;
    } else if (useValidateEmail(signup.email) === false) {
      setError("Invalid email");
      return;
    }

    setError("");
    router.push("/auth/signup/verify");
  };

  useEffect(() => {
    router.prefetch("verify");
  }, []);

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <Link href="login">
          already have an account? <u>click here</u>
        </Link>
        <div className={`${styles.auth} ${styles.borderTop}`}>
          <h1>Sign Up</h1>
          <form
            onSubmit={(e) => handleSignup(e)}
            onInvalid={() => setError("Please input name and email")}
            className={styles.form}
          >
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                value={signup.name}
                onChange={(e) =>
                  setSignup((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder=" "
                required
              />
              <span>Full Name</span>
            </label>
            <label htmlFor="email">
              <input
                type="text"
                id="email"
                value={signup.email}
                onChange={(e) =>
                  setSignup((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder=" "
                required
              />
              <span>Email</span>
            </label>
            <button type="submit">{`Next ->`}</button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
          <p>or sign up with</p>
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
      </main>
    </div>
  );
}
