import API from "./api";

/**
 * Get all expenses for the logged-in user
 */
export const getExpenses = async () => {
  const { data } = await API.get("/expenses");
  return data;
};

/**
 * Add a new expense
 * @param {{amount:number, category:string, date:string}} expense
 */
export const addExpense = async (expense) => {
  const { data } = await API.post("/expenses", expense);
  return data;
};


export const deleteExpense = async (_id)=>{
  const {data} = await API.delete(`/expenses/${_id}`);
  return data;
}

export const updateExpense = async (_id , fields)=>{
  const {data} = await API.put(`/expenses/${_id}`, fields);
  return data;
}