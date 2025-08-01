import { useEffect } from "react";
import { useCounterStore } from "../store/counter";

export const Counter = () => {
  const { count, fetchCount, incrementCount } = useCounterStore();

  useEffect(() => {
    handleFetchCount();
  }, []);

  const handleFetchCount = () => {
    fetchCount().catch((e) => alert(e.message));
  };

  const handleIncrement = () => {
    incrementCount().catch((e) => alert(e.message));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
      <p className="p-2 rounded-xl text-center">Count: {count}</p>
      <button
        onClick={handleFetchCount}
        className="bg-sky-500 text-white p-2 rounded-xl"
      >
        Refetch Count
      </button>
      <button
        onClick={handleIncrement}
        className="bg-sky-500 text-white p-2 rounded-xl"
      >
        Increment Count
      </button>
    </div>
  );
};
