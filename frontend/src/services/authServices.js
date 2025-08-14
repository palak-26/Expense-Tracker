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
  const { token } = data; // destructure from response
  localStorage.setItem("token", token);
  return data;
};
