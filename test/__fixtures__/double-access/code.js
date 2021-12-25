function App() {
  let state = 1;
  function handleAdd() {
    state = state + 1;
  }
  function handleRemove() {
    state = state - 1;
  }
  return (
    <>
      {state}
      <div onClick={handleAdd}></div>
      <div onClick={handleRemove}></div>
    </>
  );
}
