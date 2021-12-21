# React Simple - NPM

![CI](https://github.com/MarvelSQ/react-simple/actions/workflows/CI.yml/badge.svg)

```jsx
function App() {
  let age = 1;

  function add() {
    age = age + 1;
  }

  return (
    <div>
      {age}
      <button onClick={add}>+</button>
    </div>
  );
}
```

with this plugin

```diff
function App(){
-  let age = 1;
+  const [age, setAge] = useState(1);

-  function add() {
+  const add = useCallback((){
-    age = age + 1;
+    setAge(age + 1);
-  }
+  },[age]);

  return (
    <div>
      {age}
      <button onClick={add}>+</button>
    </div>
  );
}
```

make react simple
