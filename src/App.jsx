import { useReducer, createContext, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Transactions from "./components/transactions";
import { items } from "./utils/data";
import Dialog from "./components/dialog";
export const ExpenseContext = createContext();
function App() {
  const Appstate = {
    expenselist: items,
    budget: 0,
    expense: 0,
    showdialog: false,
    filterlist: [],
  };
  const ExpenseReducer = (state, action) => {
    switch (action.type) {
      case "delete-item": {
        const removeitem = state?.expenselist.filter(
          (item) => item.id !== action.payload
        );
        return {
          ...state,
          expenselist: removeitem,
        };
      }
      case "total-expense": {
        const expenseitems = state?.expenselist.filter(
          (item) => item.type === "expense"
        );
        const expensetotal = expenseitems.reduce((acc, curr) => {
          return acc + curr["price"];
        }, 0);
        return {
          ...state,
          expense: expensetotal,
        };
      }
      case "total-budget": {
        const budgetitems = state?.expenselist.filter(
          (item) => item.type === "income"
        );
        const budgetotal = budgetitems.reduce((acc, curr) => {
          return acc + curr["price"];
        }, 0);
        return {
          ...state,
          budget: budgetotal,
        };
      }
      case "clear-list":
        return {
          ...state,
          expenselist: [],
        };
      case "search-item": {
        const getTransaction = state.expenselist.filter((q) =>
          q.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          filterlist: getTransaction,
        };
      }
      case "show-dialog":
        return {
          ...state,
          showdialog: !state.showdialog,
        };
      case "add-item":
        return {
          ...state,
          showdialog: !state.showdialog,
          expenselist: [...state.expenselist, action.payload],
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(ExpenseReducer, Appstate, (args) => {
    const istored = window.localStorage.getItem("expense-app");
    return JSON.parse(istored) ?? args;
  });

  useEffect(() => {
    dispatch({ type: "total-expense" });
    dispatch({ type: "total-budget" });
  }, [state.expenselist]);

  useEffect(() => {
    window.localStorage.setItem("expense-app", JSON.stringify(state));
  }, [state]);
  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      <main className="container mx-auto  my-1 lg:my-8 border lg:border-stone-600  w-full lg:w-1/3 p-2">
        <Header />
        <Transactions />
        <Dialog />
      </main>
    </ExpenseContext.Provider>
  );
}

export default App;
