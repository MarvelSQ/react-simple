<script>
  import Editor from './components/Editor.svelte';
  import Title from './components/Title.svelte';
  import Footer from './components/Footer.svelte';
  import { transform } from './transform';

  let code = `function App() {
  let a = 1;

  function add() {
    a = a + 1;
  }

  return (
    <div>
      <h1>Hello World</h1>
      <p>This is a paragraph</p>
    </div>
  );
}
`;

  let enableUseCallback = true;

  let output = transform(code).code;

  function update() {
    output = transform(code, {
      useCallback: enableUseCallback,
    }).code;
  }

  function handleChange(nextCode) {
    code = nextCode;
    update();
  }

  function toggleUseCallback() {
    enableUseCallback = !enableUseCallback;
    update();
  }
</script>

<div class="banner">
  <span class="focus">Signal</span>
  maybe a better choice than compile code while building.
  <a target="_blank" href="https://www.youtube.com/watch?v=O6xtMrDEhcE">
    click watch video on youtube
  </a>
</div>
<Title />
<div style="text-align: center;color: #888;">
  <input
    type="checkbox"
    id="useCallback-enable"
    checked={enableUseCallback}
    on:change={toggleUseCallback}
  />
  <label for="useCallback-enable">convert function to useCallback</label>
</div>
<div class="container">
  <div class="editor-cell">
    <p class="editor-title">Source Code</p>
    <Editor defaultValue={code} onChange={handleChange} />
  </div>
  <div class="editor-cell">
    <p class="editor-title">Result</p>
    <Editor value={output} readonly />
  </div>
</div>
<Footer />

<style>
  .banner {
    background-color: #e7b324;
    color: white;
    padding: 10px;
    text-align: center;
  }

  .focus {
    font-weight: bold;
    font-size: 1.5em;
  }
  .container {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .editor-cell {
    flex-basis: 50%;
  }

  .editor-cell + .editor-cell {
    border-left: 1px solid #ccc;
  }

  .editor-title {
    font-size: 18px;
    padding: 10px;
    padding-left: 30px;
    margin: 0;
    background-color: #f7f7f7;
    border-bottom: 1px solid #aaa;
  }

  @media screen and (max-width: 600px) {
    .container {
      flex-direction: column;
    }
  }
</style>
