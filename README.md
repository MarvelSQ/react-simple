# React Simple - NPM

![CI](https://github.com/MarvelSQ/react-simple/actions/workflows/CI.yml/badge.svg)

## [playground](https://react-simple-marvelsq.vercel.app)

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

# Guide

react-simple is a babel plugin for making react develop easier.

by automaticly convert you unwraped `state`, `callback` to `useState`, `useCallback`

## useState

to make `useState` transform work, make sure you reassigned the state.

like this

```jsx
let state = 0; // this line will convert to useState
let name = 'test'; // this won't change
function handleChanage(val) {
  state = val; // this line will convert to setState
}
```
