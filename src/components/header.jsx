import { useContext } from "react";
import { ExpenseContext } from "../App";
import { IndianPrice } from "../utils/price";
const Header = () => {
  const {
    state: { expense, budget },
    dispatch,
  } = useContext(ExpenseContext);
  return (
    <>
      <h1 className="font-semibold text-center lg:text-2xl text-xl text-sky-600/75 pb-3">
        TrackTally
      </h1>
      <h2 className="lg:text-xl text-lg text-center font-normal">
        Expense Tracker
      </h2>
      <div className="flex justify-between items-center py-8">
        <h3 className="text-lg">
          Balance:
          <span className="text-base lg:text-lg font-semibold pl-1 font-sans">
            {IndianPrice(budget - expense)}
          </span>
        </h3>
        <button
          className="px-4  bg-lime-500 text-white rounded-sm text-base hover:bg-lime-600 active:bg-lime-700 transition-colors"
          onClick={() => dispatch({ type: "show-dialog" })}
        >
          Add
        </button>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="border border-stone-700 p-1 w-full">
          <h2 className="flex flex-col gap-2 text-xl">
            Expense :
            <span className="text-xl font-semibold text-red-600 font-sans">
              {IndianPrice(expense)}
            </span>
          </h2>
        </div>
        <div className="border border-stone-700 p-1 w-full gap-2">
          <h2 className="flex flex-col gap-2 text-xl">
            Budget :
            <span className="text-xl font-semibold text-lime-600 font-sans">
              {IndianPrice(budget)}
            </span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Header;
