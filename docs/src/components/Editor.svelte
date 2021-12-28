<script>
  import { onMount, beforeUpdate } from 'svelte';
  import CodeMirror from 'codemirror';
  import 'codemirror/addon/hint/show-hint';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/theme/idea.css';

  export let value;
  export let defaultValue;
  export let onChange;
  export let readonly;
  let container;
  let editor;

  onMount(() => {
    const baseOption = {
      mode: 'javascript',
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      theme: 'idea',
    };
    editor = new CodeMirror(container, {
      value: value || defaultValue,
      ...baseOption,
      readOnly: readonly,
    });
    editor.on('change', (editor) => {
      if (onChange) {
        onChange?.(editor.getValue());
      }
    });
  });

  beforeUpdate(() => {
    if (editor && value) {
      editor.setValue(value);
    }
  });
</script>

<div class="m-editor" bind:this={container} />
