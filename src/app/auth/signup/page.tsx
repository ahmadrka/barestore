"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import styles from "../styles.module.css";
import button from "@/component/Styles/Button.module.css";
import form from "@/component/Styles/Form.module.css";
import Link from "next/link";
import useValidateEmail from "@/hook/useValidateEmail";
import { handleSignup } from "@/lib/api/auth";
import {
  handleGoogleOAuth,
  handleMicrosoftOAuth,
  handleFacebookOAuth,
} from "@/lib/api/oauth";
import { setCookie } from "@/lib/helper/cookies";
import Icon from "@/component/Icon/Icon";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [signup, setSignup] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async (
    name: string,
    email: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (signup.name.length < 3) {
      setError("Name too short");
      return;
    } else if (useValidateEmail(signup.email) === false) {
      setError("Invalid email");
      return;
    }

    const signupData = await handleSignup(name, email);

    if (signupData.errorCode === "USER_ALREADY_EXISTS") {
      setError("User already exists");
      return;
    }

    if (signupData.errorCode === "TOO_MANY_REQUESTS") {
      setError("Too many requests, please try again later");
      return;
    }

    if (signupData.success) {
      await setCookie("verifyToken", "unset", 1 * 60, {
        httpOnly: false,
        secure: true,
      });
      router.push("/auth/signup/verify");
    }
  };

  useEffect(() => {
    router.prefetch("verify");
  }, []);

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <Link href="login" className={styles.button}>
          already have an account? <u>click here</u>
        </Link>
        <div className={`${styles.auth} ${styles.borderTop}`}>
          <div className={styles.title}>
            <h1>Signup</h1>
            <p>signup for continue</p>
          </div>
          <form
            onSubmit={(e) => handleSubmit(signup.name, signup.email, e)}
            onInvalid={() => setError("Please input name and email")}
            className={form.form}
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
            <button
              type="submit"
              className={button.primary}
            >{`Next ->`}</button>
            {error && <p className={form.error}>{error}</p>}
          </form>
          <div className={styles.authSpan}>
            <span>or signup with</span>
            <div></div>
          </div>
          <div className={styles.oauthButtons}>
            <button
              title="Google"
              onClick={() => handleGoogleOAuth()}
              className={button.secondary}
              style={
                process.env.NEXT_PUBLIC_GOOGLE_OAUTH === "true"
                  ? {}
                  : { display: "none" }
              }
            >
              <Icon name="google" width={24} height={24} />
              <span>Google</span>
            </button>
            <button
              title="Microsoft"
              onClick={() => handleMicrosoftOAuth()}
              className={button.secondary}
              style={
                process.env.NEXT_PUBLIC_MICROSOFT_OAUTH === "true"
                  ? {}
                  : { display: "none" }
              }
            >
              <Icon name="microsoft" width={24} height={24} />
              <span>Microsoft</span>
            </button>
            <button
              title="Facebook"
              onClick={() => handleFacebookOAuth()}
              className={button.secondary}
              style={
                process.env.NEXT_PUBLIC_FACEBOOK_OAUTH === "true"
                  ? {}
                  : { display: "none" }
              }
            >
              <Icon name="facebook" width={24} height={24} />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
