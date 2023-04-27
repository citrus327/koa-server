const { useState, useEffect } = window.React;

const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let flag = true;
    setInterval(() => {
      console.log(flag ? "ping" : "pong");
      flag = !flag;
    }, 1000);
  }, []);

  useEffect(() => {
    // Create a new Web Worker
    var worker = new Worker(`${window.PUBLIC_PATH}/worker.js`);

    // Handle messages received from the worker
    worker.onmessage = function (event) {
      // Update the UI with the generated list of prime numbers
      document.getElementById("result").textContent = event.data;
    };

    // Start the worker and send it a message
    worker.postMessage(30000);
  }, []);
  return (
    <main>
      worker
      <button
        onClick={() => {
          setCount((v) => v + 1);
        }}
      >
        {count}
      </button>
      <div id="result"></div>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
