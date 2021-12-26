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

  let output = transform(code).code;

  function handleChange(code) {
    output = transform(code).code;
  }
</script>

<Title />
<div class="container">
  <div class="editor-cell">
    <p class="editor-title">Source Code</p>
    <Editor value={code} onChange={handleChange} />
  </div>
  <div class="editor-cell">
    <p class="editor-title">Result</p>
    <Editor value={output} readonly />
  </div>
</div>
<Footer />

<style>
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
    margin: 0;
  }

  @media screen and (max-width: 600px) {
    .container {
      flex-direction: column;
    }
  }
</style>
