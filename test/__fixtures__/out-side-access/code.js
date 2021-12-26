const global = 'test';

function App() {
  let local = global;
  function handleChange() {
    local = global + 'test';
  }
  return <div onClick={handleChange}>{local}</div>;
}
