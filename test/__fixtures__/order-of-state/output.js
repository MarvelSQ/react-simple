function App() {
  const handleAdd = useCallback(() => {
    setState(state + 1);
  }, [state]);
  const [state, setState] = useState(1);
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      onClick: handleAdd,
    },
    state
  );
}
