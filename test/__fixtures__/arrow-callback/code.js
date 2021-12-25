function App() {
  let state = 1;
  const handleAdd = () => {
    state = state + 1;
  };
  return <div onClick={handleAdd}>{state}</div>;
}
