import React, { useState } from "react";

const Button = () => {
  const [count, setCount] = useState(4);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </button>
  );
};

export { Button };
