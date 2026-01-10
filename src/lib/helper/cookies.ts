export const setCookie = async (
  name: string,
  value: string,
  time: number,
  {
    httpOnly = true,
    secure = true,
  }: { httpOnly?: boolean; secure?: boolean } = {}
) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    if (!value || !name) {
      cookieStore.delete(name);
      return;
    }

    cookieStore.set(name, value, {
      expires: new Date(Date.now() + 1000 * 60 * time),
      path: "/",
      sameSite: "lax",
      httpOnly,
      secure,
    });
  } else {
    if (httpOnly) return;

    if (!value || !name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return;
    }
    const expires = new Date(Date.now() + 1000 * 60 * time).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax${
      secure ? "; Secure" : ""
    }`;
  }
};

export const getCookie = async (name: string) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  } else {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
};

export const removeCookie = async (name: string) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } else {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};
