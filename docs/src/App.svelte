<script>
  import { onMount } from 'svelte';
  import CodeMirror from 'codemirror';
  import 'codemirror/addon/hint/show-hint';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/theme/idea.css';
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

  let codeContainer;
  let outputContainer;

  onMount(() => {
    const baseOption = {
      mode: 'javascript',
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      theme: 'idea',
    };
    const editor = new CodeMirror(codeContainer, {
      value: code,
      ...baseOption,
    });
    const present = new CodeMirror(outputContainer, {
      ...baseOption,
      value: output,
      readOnly: true,
    });
    editor.on('change', () => {
      present.setValue(transform(editor.getValue()).code);
    });
  });
</script>

<div class="title">
  <h1>React Simple</h1>
  <p>a babel plugin make react easier</p>
</div>
<div class="container">
  <div class="editor-cell">
    <p class="editor-title">Source Code</p>
    <div bind:this={codeContainer} />
  </div>
  <div class="editor-cell">
    <p class="editor-title">Result</p>
    <div bind:this={outputContainer} />
  </div>
</div>
<div class="footer">
  <p class="prowerd-by">powered by</p>
  <div class="base-info">
    <a
      href="https://esbuild.github.io/"
      style="text-decoration: none"
      target="_blank"
    >
      <img
        src="esbuild-logo.svg"
        alt="esbuild"
        height="40"
        style="vertical-align:middle"
      />
      <span
        style="font-weight:bold;font-size:24px;color:black;vertical-align:middle;padding-left:4px;"
      >
        esbuild
      </span>
    </a>
    <a href="https://svelte.dev/" target="_blank">
      <img src="svelte-logo.svg" alt="svelte" height="50" />
    </a>
    <a href="https://codemirror.net/" target="_blank">
      <img src="codemirror-logo.svg" alt="codemirror" height="80" />
    </a>
  </div>
</div>

<style>
  .title {
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    .container {
      flex-direction: column;
    }
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
    margin: 0;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }

  .prowerd-by {
    font-size: 18px;
    color: #666;
    margin: 0;
  }
  .base-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
