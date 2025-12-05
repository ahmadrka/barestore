"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles.module.css";

export default function Password() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [signup, setSignup] = useState({
    password: "",
    repeatPassword: "",
  });

  const strengthWord = ["Very Weak", "Weak", "Enough", "Strong", "Very Strong"];
  const strengthColor = [
    "var(--color-error)",
    "var(--color-orange)",
    "var(--color-yellow)",
    "var(--color-green)",
    "var(--color-green)",
  ];

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strengthWord[strength - 1] || "Very Weak";
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signup.password !== signup.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    // GET ACCESS & REFRESH TOKEN AND SAVE TO COOKIES

    router.push("/home");
  };

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div className={`${styles.auth} ${styles.border}`}>
          <h1>Set Password</h1>
          <form
            onSubmit={(e) => handleSignup(e)}
            onInvalid={() => setError("Please input and repeat password")}
            className={styles.form}
          >
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                value={signup.password}
                onChange={(e) =>
                  setSignup((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder=" "
                required
              />
              <span>Password</span>
            </label>
            <label htmlFor="repeat">
              <input
                type="password"
                id="repeat"
                value={signup.repeatPassword}
                onChange={(e) =>
                  setSignup((prev) => ({
                    ...prev,
                    repeatPassword: e.target.value,
                  }))
                }
                placeholder=" "
                required
              />
              <span>Repeat Password</span>
            </label>
            {signup.password && (
              <p
                style={{
                  color:
                    strengthColor[
                      strengthWord.indexOf(
                        calculatePasswordStrength(signup.password)
                      )
                    ],
                  borderColor:
                    strengthColor[
                      strengthWord.indexOf(
                        calculatePasswordStrength(signup.password)
                      )
                    ],
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "4px",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                Password Strength: {calculatePasswordStrength(signup.password)}
              </p>
            )}
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit">{`Next ->`}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
