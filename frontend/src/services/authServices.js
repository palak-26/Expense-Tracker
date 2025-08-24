import API from "./api";

/**
 * Register user
 * @param {{name?: string, email: string, password: string}} payload
 */
export const registerUser = async (payload) => {
  const { data } = await API.post("/auth/register", payload);
  return data;
};

/**
 * Login user
 * @param {{email: string, password: string}} payload
 */
export const loginUser = async (payload) => {
  const { data } = await API.post("/auth/login", payload);
  const { token } = data;
  localStorage.setItem("token", token);
  return data;
};

/**
 * Reset password (simple way: email + new password)
 * @param {{email: string, newPassword: string}} payload
 */
export const resetPassword = async (payload) => {
  const { data } = await API.post("/auth/reset-password", payload);
  return data; // { message: "Password reset successful" }
};
