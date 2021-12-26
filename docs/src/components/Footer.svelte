<div class="footer">
  <p class="prowerd-by">powered by</p>
  <div class="base-info">
    <a
      href="https://esbuild.github.io/"
      style="text-decoration: none"
      target="_blank"
    >
      <img src="esbuild-logo.svg" alt="esbuild" style="vertical-align:middle" />
      <span
        style="font-weight:bold;font-size:24px;color:black;vertical-align:middle;padding-left:4px;"
      >
        esbuild
      </span>
    </a>
    <a href="https://svelte.dev/" target="_blank">
      <img src="svelte-logo.svg" alt="svelte" />
    </a>
    <a href="https://codemirror.net/" target="_blank">
      <img src="codemirror-logo.svg" alt="codemirror" />
    </a>
  </div>
</div>

<style>
  .footer {
    text-align: center;
    border-top: 1px solid #ccc;
    padding-top: 10px;
    background-color: #fff;
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

  @media screen and (min-width: 600px) {
    a:nth-child(1) img {
      height: 40px;
    }
    a:nth-child(2) img {
      height: 50px;
    }
    a:nth-child(3) img {
      height: 80px;
    }
  }

  @media screen and (max-width: 600px) {
    .base-info {
      flex-direction: column;
    }
    a:nth-child(1) img {
      width: 40px;
    }
    a:nth-child(1),
    a:nth-child(2) img {
      margin-top: 20px;
    }
    a img {
      width: 150px;
    }
  }
</style>
