function App() {
  let state = 1;
  function handleAdd() {
    let state = 0;
    state = state + 1;
  }
  return <div onClick={handleAdd}>{state}</div>;
}
