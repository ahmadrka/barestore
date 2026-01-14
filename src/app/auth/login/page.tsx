"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../styles.module.css";
import button from "@/component/Styles/Button.module.css";
import form from "@/component/Styles/Form.module.css";
import Link from "next/link";
import useValidateEmail from "@/hook/useValidateEmail";
import { handleLogin } from "@/lib/api/auth";
import {
  handleFacebookOAuth,
  handleGoogleOAuth,
  handleMicrosoftOAuth,
} from "@/lib/api/oauth";
import Icon from "@/component/Icon/Icon";
import { toast } from "sonner";
import Loading from "@/app/loading";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [error, setError] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleSubmit = async (
    email: string,
    password: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();

      if (!useValidateEmail(login.email)) {
        setError("Invalid email");
        return;
      }

      const loginData = await handleLogin(email, password);

      if (loginData.errorCode === "USER_NOT_FOUND") {
        setError("User not found");
        return;
      }

      if (loginData.errorCode === "INVALID_PASSWORD") {
        setError("Invalid password");
        return;
      }

      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push("/home");
    } catch (error) {
      toast.error("Failed to login");
    }
  };

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div className={`${styles.auth} ${styles.borderBottom}`}>
          <div className={styles.title}>
            <h1>Login</h1>
            <p>login for continue</p>
          </div>
          <form
            onSubmit={(e) => handleSubmit(login.email, login.password, e)}
            onInvalid={() => setError("Please input email and password")}
            className={form.form}
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
            <button type="submit" className={button.primary}>
              {`Start ->`}
            </button>
            {error && <p className={form.error}>{error}</p>}
          </form>
          <div className={styles.authSpan}>
            <span>or login with</span>
            <div></div>
          </div>
          <div className={styles.oauthButtons}>
            <button
              title="Google"
              onClick={() => handleGoogleOAuth(redirect)}
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
              onClick={() => handleMicrosoftOAuth(redirect)}
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
              onClick={() => handleFacebookOAuth(redirect)}
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
        <Link href="signup" className={styles.button}>
          don't have an account? <u>click here</u>
        </Link>
      </main>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  );
}
