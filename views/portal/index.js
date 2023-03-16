const App = () => {
  return (
    <main>
      <h1>Portal</h1>
      <section>
        <h2>Navigate To</h2>
        <ul>
          <li>
            <a href="/page/site">Static Site</a>
          </li>
          <li>
            <a href="/page/classic-ssr">Classic SSR</a>
          </li>
          <li>
            <a href="/page/stream">Server Streaming HTML</a>
          </li>
          <li>
            <a href="/page/react-stream">React 18 Streaming SSR</a>
          </li>
          <li>
            <a href="/page/server-push">Server Push</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Rest API</h2>
      </section>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
