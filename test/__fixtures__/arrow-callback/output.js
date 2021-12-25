function App() {
  const [state, setState] = useState(1);
  const handleAdd = useCallback(() => {
    setState(state + 1);
  }, [state]);
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      onClick: handleAdd,
    },
    state
  );
}
