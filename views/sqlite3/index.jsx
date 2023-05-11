const { useState, useEffect } = window.React;

const App = () => {
  const [dbResult, setDbResult] = useState(null);
  return (
    <main>
      <h1>Portal</h1>
      <section>
        <button
          onClick={async () => {
            const res = await (await fetch("/rest/db")).json();
            setDbResult(res);
          }}
        >
          Get Data
        </button>
      </section>

      <section>{JSON.stringify(dbResult, null, 4)}</section>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
