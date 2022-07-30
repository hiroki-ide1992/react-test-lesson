import React, { useState } from "react";

const RenderInput = ({ outputConsole }) => {
  const [input, setInput] = useState("");

  const updateValue = (e) => {
    setInput(e.target.value);
  };

  const outputValue = () => {
    if (input) {
      outputConsole(input);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={updateValue}
      ></input>
      <button onClick={outputValue}>Console</button>
    </div>
  );
};

export default RenderInput;
