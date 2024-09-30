import { useContext, useState } from "react";
import { ExpenseContext } from "../App";
const Dialog = () => {
  const {
    state: { showdialog },
    dispatch,
  } = useContext(ExpenseContext);
  const [selected, setSelected] = useState(0);
  const [newTransaction, setNewTransaction] = useState({
    id: Date.now(),
    name: "",
    price: 0,
    type: "expense",
  });
  const addtransaction = () => {
    dispatch({ type: "add-item", payload: newTransaction });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : parseInt(value),
    }));
  };
  return (
    <div
      className={`${
        showdialog ? "block" : "hidden"
      }  fixed inset-0 bg-stone-600/55 z-10 w-screen h-screen duration-500`}
    >
      <div
        className={`${
          showdialog ? "scale-100" : "scale-0"
        }  duration-500 absolute left-[50%] top-[50%] 
       bg-white border border-stone-200 -translate-x-[50%] lg:-translate-x-[45%] p-2  w-11/12 lg:w-1/3 transition`}
      >
        <div className="flex flex-col gap-3 px-8 mt-4">
          <input
            type="number"
            name="price"
            onChange={(e) => handleChange(e)}
            required
            className="w-full border border-stone-300 rounded h-8 placeholder:pl-1 focus:outline-none pl-1"
            placeholder="Amount"
          />
          <input
            type="text"
            name="name"
            onChange={(e) => handleChange(e)}
            required
            className="w-full border border-stone-300 rounded h-8 placeholder:pl-1 focus:outline-none pl-1"
            placeholder="Transaction name"
          />
        </div>
        <div className="flex justify-center gap-3 items-center my-2">
          {["expense", "income"].map((q, index, self) => {
            return (
              <label key={index} htmlFor={q} className="flex gap-1">
                <input
                  type="radio"
                  id={q}
                  value={self[index]}
                  name="type"
                  checked={index === selected}
                  onChange={(e) => {
                    setSelected(index);
                    handleChange(e);
                  }}
                />
                <span className="text-sm capitalize">{q}</span>
              </label>
            );
          })}
        </div>
        <div className="flex justify-center gap-2 items-center mt-6">
          <button
            className="bg-blue-400 px-4 text-white rounded text-base disabled:cursor-not-allowed disabled:bg-gray-200"
            onClick={addtransaction}
            disabled={
              newTransaction.name === "" || newTransaction.price === ""
                ? true
                : false
            }
          >
            save
          </button>
          <button
            onClick={() => dispatch({ type: "show-dialog" })}
            className="border border-stone-600 px-4 rounded text-base"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
