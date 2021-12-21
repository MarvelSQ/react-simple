function App() {
  function handleAdd() {
    state = state + 1;
  }
  let state = 1;
  return <div onClick={handleAdd}>{state}</div>;
}
