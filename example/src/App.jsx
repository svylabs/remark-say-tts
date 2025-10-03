import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkSayTts, { SayComponent } from '../../src/index.js';
import './App.css';

const defaultMarkdown = `# Text-to-Speech Markdown Demo

This is a demonstration of the **remark-say-tts** plugin for ReactMarkdown.

## Try Different Languages

- French: :say[Bonjour]{lang="fr-FR" rate="1.05"}
- Spanish: :say[Hola]{lang="es-ES"}
- German: :say[Guten Tag]{lang="de-DE"}
- Italian: :say[Ciao]{lang="it-IT"}
- Japanese: :say[こんにちは]{lang="ja-JP"}

## Adjust Speech Rate

- Slow: :say[Hello World]{rate="0.7"}
- Normal: :say[Hello World]{rate="1.0"}
- Fast: :say[Hello World]{rate="1.5"}

## Advanced: Nested Formatting

These work with bold, italic, inline code, and other markdown formatting:

- With **bold**: :say[**Hello** World]{lang="en-US"}
- With *italic*: :say[*Ciao* bella]{lang="it-IT"}
- Mixed: :say[**Bon** *jour*]{lang="fr-FR"}
- With code: :say[\`Hola\`]{lang="es-ES"}

## In Sentences

You can use it inline like this: "Hello, my name is :say[Marie]{lang="fr-FR"}" or at the end of a sentence :say[Nice to meet you]{lang="en-GB"}.

## Edit the Markdown

Try editing the markdown below to create your own examples!
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  return (
    <div className="app">
      <div className="container">
        <h1>🔊 Remark Say TTS Plugin</h1>
        <p className="subtitle">
          A remark plugin that adds text-to-speech functionality to ReactMarkdown using the Web Speech API
        </p>
        
        <div className="editor-container">
          <div className="editor-panel">
            <h2>Markdown Input</h2>
            <textarea
              className="markdown-input"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter markdown with :say directives..."
            />
          </div>
          
          <div className="preview-panel">
            <h2>Preview</h2>
            <div className="markdown-output">
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
            </div>
          </div>
        </div>

        <div className="info-box">
          <h3>Usage</h3>
          <code>:say[Text to speak]&#123;lang="fr-FR" rate="1.05"&#125;</code>
          <p>
            Click the 🔊 icon to hear the pronunciation. 
            Supports multiple languages and customizable speech rate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
