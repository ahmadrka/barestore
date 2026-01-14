"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles.module.css";
import button from "@/component/Styles/Button.module.css";
import form from "@/component/Styles/Form.module.css";
import { handleSignupPassword } from "@/lib/api/auth";
import { getCookie } from "@/lib/helper/cookies";
import Loading from "@/app/loading";

export default function Password() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [signup, setSignup] = useState({
    password: "",
    repeatPassword: "",
  });

  const strengthWord = ["Very Weak", "Weak", "Enough", "Strong", "Very Strong"];
  const strengthColor = [
    "var(--color-error)",
    "var(--color-warning)",
    "var(--color-attention)",
    "var(--color-success)",
    "var(--color-info)",
  ];
  const strengthBackground = [
    "var(--background-error)",
    "var(--background-warning)",
    "var(--background-attention)",
    "var(--background-success)",
    "var(--background-info)",
  ];
  const strengthBorder = [
    "var(--border-error)",
    "var(--border-warning)",
    "var(--border-attention)",
    "var(--border-success)",
    "var(--border-info)",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signup.password !== signup.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordData = await handleSignupPassword(signup.password);

    if (passwordData.errorCode === "INVALID_TOKEN") {
      setError("Token invalid or expired");
      return;
    }

    if (passwordData.success) {
      router.push("/home");
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await getCookie("verifyToken");
      if (!token) {
        router.push("/auth/login");
      }
    };
    checkToken();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div className={`${styles.auth} ${styles.border}`}>
          <div className={styles.title}>
            <h1>Set Password</h1>
            <p>set your password to continue</p>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            onInvalid={() => setError("Please input and repeat password")}
            className={form.form}
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
                  backgroundColor:
                    strengthBackground[
                      strengthWord.indexOf(
                        calculatePasswordStrength(signup.password)
                      )
                    ],
                  color:
                    strengthColor[
                      strengthWord.indexOf(
                        calculatePasswordStrength(signup.password)
                      )
                    ],
                  borderColor:
                    strengthBorder[
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
            {error && <p className={form.error}>{error}</p>}
            <button
              type="submit"
              className={button.primary}
            >{`Next ->`}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
