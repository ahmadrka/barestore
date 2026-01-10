const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const handleGoogleOAuth = (redirect?: string) => {
  window.location.href = `${API_URL}/auth/google?redirect=${redirect}`;
};

export const handleMicrosoftOAuth = (redirect?: string) => {
  window.location.href = `${API_URL}/auth/microsoft?redirect=${redirect}`;
};

export const handleFacebookOAuth = (redirect?: string) => {
  window.location.href = `${API_URL}/auth/facebook?redirect=${redirect}`;
};
