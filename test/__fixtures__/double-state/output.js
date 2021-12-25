function App() {
  let state = 1;
  const handleAdd = useCallback(() => {
    let state = 0;
    state = state + 1;
  }, []);
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      onClick: handleAdd,
    },
    state
  );
}
