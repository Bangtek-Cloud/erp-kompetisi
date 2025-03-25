export const loginUser = async (email: string, password: string) => {
  const response = await fetch("https://erp-kompetisi-api.vercel.app/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const res = await response.json()
    throw new Error(res.message);
  }

  return response.json();
};

export const fetchUser = async (accessToken: string) => {
  const response = await fetch("https://erp-kompetisi-api.vercel.app/api/v1/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data user!");
  }

  return response.json();
};

export const refreshToken = async (token: string) => {
  const response = await fetch("https://erp-kompetisi-api.vercel.app/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: token }),
  });

  if (!response.ok) {
    throw new Error("Token refresh gagal!");
  }

  return response.json();
};

export const RegisterUser = async (name: string, email: string, password: string) => {
  const response = await fetch("https://erp-kompetisi-api.vercel.app/api/v1/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if(!response.ok) {
    const res = await response.json()
    throw new Error(res.message);
  }

  const responseLogin = await fetch("https://erp-kompetisi-api.vercel.app/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!responseLogin.ok) {
    const res = await responseLogin.json()
    throw new Error(res.message);
  }

  return response.json();
}