function App() {
  let state = 1;
  function handleAdd() {
    state = state + 1;
  }
  return <div onClick={handleAdd}>{state}</div>;
}
