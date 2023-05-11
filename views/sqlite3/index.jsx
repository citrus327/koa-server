const { useState, useEffect } = window.React;

const App = () => {
  const [dbResult, setDbResult] = useState(null);

  const createUser = () => {
    fetch("/rest/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Hao Peng",
        birthday: new Date("1993-03-27"),
      }),
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <main>
      <h1>Portal</h1>
      <section>
        <button
          onClick={async () => {
            createUser();
          }}
        >
          create user
        </button>
      </section>

      <section>{JSON.stringify(dbResult, null, 4)}</section>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
