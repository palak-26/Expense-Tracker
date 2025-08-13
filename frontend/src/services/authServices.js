import API from "./api";

/**
 * @param {{name?: string, email: string, password: string}} payload
 */
export const registerUser = async (payload) => {
  const { data } = await API.post("/auth/register", payload);
  return data;
};

/**
 * @param {{email: string, password: string}} payload
 */
export const loginUser = async (payload) => {
  const { data } = await API.post("/auth/login", payload);
  // { token, user: { id, name, email } }
  const { token, user } = await loginUser({ email, password });
  localStorage.setItem("token", token);
  return data;
};
