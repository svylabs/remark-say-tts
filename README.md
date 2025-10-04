# remark-say-tts

A remark plugin that adds text-to-speech functionality to ReactMarkdown using the Web Speech API.

## Demo

Try it live: [https://svylabs.github.io/remark-say-tts/](https://svylabs.github.io/remark-say-tts/)

## Installation

```bash
npm install remark-say-tts remark-directive
```

## Usage

### With React

The library includes a ready-to-use `SayComponent` for React users:

```jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkSayTts from 'remark-say-tts';
import { SayComponent } from 'remark-say-tts/react';

function App() {
  const markdown = `
Check out this French word: :say[Bonjour]{lang="fr-FR" rate="1.05"}
  `;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkDirective, remarkSayTts]}
      components={{
        span: ({ node, className, ...props }) => {
          if (className === 'say-tts') {
            return <SayComponent {...props} />;
          }
          return <span className={className} {...props} />;
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
```

The bundled component includes styling and all functionality.

### Without React (Framework-Agnostic)

The plugin itself is framework-agnostic. You can use it with any framework or vanilla JavaScript:

```js
import remarkDirective from 'remark-directive';
import remarkSayTts from 'remark-say-tts';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const file = await unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkSayTts)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(':say[Hello]{lang="en-US"}');

console.log(String(file));
// Output: <span class="say-tts" data-text="Hello" data-lang="en-US" data-rate="1.0" data-pitch="1.0">Hello</span>
```

Then implement your own click handler in your preferred framework (Vue, Svelte, vanilla JS, etc.).

### Using a Custom Component

If you want to customize the appearance or behavior, you can create your own component:

```jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkSayTts from 'remark-say-tts';

function CustomSayComponent({ node, children, ...props }) {
  const text = props['data-text'] || '';
  const lang = props['data-lang'] || 'en-US';
  const rate = parseFloat(props['data-rate'] || '1.0');
  const pitch = parseFloat(props['data-pitch'] || '1.0');

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <span style={{ backgroundColor: 'yellow' }}>
      {children}
      <button onClick={handleSpeak}>▶️</button>
    </span>
  );
}

function App() {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkDirective, remarkSayTts]}
      components={{
        span: ({ node, className, ...props }) => {
          if (className === 'say-tts') {
            return <CustomSayComponent {...props} />;
          }
          return <span className={className} {...props} />;
        }
      }}
    >
      {`Your markdown with :say[text]{lang="en-US"}`}
    </ReactMarkdown>
  );
}
```

## Syntax

Use the `:say` directive in your markdown:

```markdown
:say[text to speak]{lang="language-code" rate="speech-rate" pitch="voice-pitch"}
```

### Attributes

- **`lang`** (optional): Language code (default: `"en-US"`)
  - Examples: `"fr-FR"`, `"es-ES"`, `"de-DE"`, `"ja-JP"`, `"zh-CN"`
- **`rate`** (optional): Speech rate from 0.1 to 10 (default: `1.0`)
  - `0.5` = slow, `1.0` = normal, `2.0` = fast
- **`pitch`** (optional): Voice pitch from 0 to 2 (default: `1.0`)

## Examples

### Different Languages

```markdown
- French: :say[Bonjour]{lang="fr-FR"}
- Spanish: :say[Hola]{lang="es-ES"}
- German: :say[Guten Tag]{lang="de-DE"}
- Japanese: :say[こんにちは]{lang="ja-JP"}
```

### Speech Rate Control

```markdown
- Slow: :say[Hello World]{rate="0.7"}
- Normal: :say[Hello World]{rate="1.0"}
- Fast: :say[Hello World]{rate="1.5"}
```

### Nested Formatting

The plugin supports nested markdown formatting:

```markdown
- Bold text: :say[**Hello** World]{lang="en-US"}
- Italic text: :say[*Ciao* bella]{lang="it-IT"}
- Code: :say[`Hola`]{lang="es-ES"}
```

## Browser Compatibility

This plugin uses the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), which is supported in:

- Chrome/Edge 33+
- Safari 16+
- Firefox 49+

Note: Voice availability and quality varies by browser and operating system.

## How It Works

1. The remark plugin parses `:say` directives in the markdown AST
2. It transforms them into `<span>` elements with special data attributes
3. Your React component reads these attributes and uses the Web Speech API
4. When clicked, the browser speaks the text using the specified language and settings

## Development

To run the example locally:

```bash
npm run dev
```

To build the example:

```bash
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
