const global = 'test';

function App() {
  const [local, setLocal] = useState(global);
  const handleChange = useCallback(() => {
    setLocal(global + 'test');
  }, [local]);
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      onClick: handleChange,
    },
    local
  );
}
