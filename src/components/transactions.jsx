import { useContext } from "react";
import { ExpenseContext } from "../App";
import { IndianPrice } from "../utils/price";
import empty from "../assets/empty.svg";
import "../App.css";
const Transactions = () => {
  const {
    state: { expenselist, filterlist },
    dispatch,
  } = useContext(ExpenseContext);
  return (
    <>
      <div className="my-3">
        {expenselist.length === 0 ? (
          <div>
            <img src={empty} alt="" className="w-1/3 mx-auto" />
            <p className="text-base text-center py-1">No items added!</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center py-2">
              <h6 className="text-base lg:text-xl font-semibold">
                Transactions
              </h6>
              <button
                className="text-sm text-sky-700"
                onClick={() => dispatch({ type: "clear-list" })}
              >
                Clear All
              </button>
            </div>
            <input
              type="text"
              className="w-full bg-neutral-200 p-1  rounded-lg focus:outline-none placeholder:text-sm pl-4 placeholder:pl-4 h-10 my-2"
              placeholder="Search transactions.."
              onChange={(event) => {
                dispatch({ type: "search-item", payload: event.target.value });
              }}
            />
            <div
              className="flex flex-col justify-start items-center gap-2  h-80 lg:h-72  my-3 overflow-auto"
              id="scroll"
            >
              {Array.from(
                filterlist.length > 0 ? filterlist : expenselist,
                ({ id, name, price, type }) => {
                  return (
                    <div
                      key={id}
                      className={`grid grid-cols-12 w-full bg-white rounded-lg last:mb-2 drop-shadow-lg h-10 p-1  border-r-4 ${
                        type === "expense"
                          ? "border-r-red-600"
                          : "border-r-lime-600"
                      } `}
                    >
                      <h3 className="text-sm col-span-6 indent-1 capitalize">
                        {name}
                      </h3>
                      <p className="text-sm col-span-4">{IndianPrice(price)}</p>
                      <button
                        className="border border-stone-800 px-2 py-1 text-xs  rounded-md col-span-2"
                        onClick={() =>
                          dispatch({ type: "delete-item", payload: id })
                        }
                      >
                        Remove
                      </button>
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Transactions;
