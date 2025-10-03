# Remark Say TTS Plugin

## Overview
A remark plugin that adds text-to-speech functionality to ReactMarkdown using the Web Speech API. When users add the `:say` directive in markdown, it renders the text with a sound icon that plays the pronunciation when clicked.

## Project Structure
- `/plugin/src/index.js` - The remark plugin that parses `:say` directives
- `/demo/` - Demo React application showcasing the plugin
  - `/demo/src/App.jsx` - Main demo application with live editor
  - `/demo/src/SayComponent.jsx` - React component that handles TTS playback
  - `/demo/src/SayComponent.css` - Styling for TTS elements
  - `/demo/index.html` - HTML entry point
  - `/demo/src/main.jsx` - React app entry point

## Usage
In markdown, use the directive:
```markdown
:say[Bonjour]{lang="fr-FR" rate="1.05"}
```

Attributes:
- `lang` - Language code (e.g., "fr-FR", "es-ES", "ja-JP")
- `rate` - Speech rate (0.1 to 10, default 1.0)
- `pitch` - Voice pitch (0 to 2, default 1.0)

## Technology Stack
- React 19
- ReactMarkdown
- Vite (build tool)
- remark-directive (for parsing directives)
- unist-util-visit (for AST traversal)
- Web Speech API (browser native TTS)

## Development
Server runs on port 5000 with Vite dev server.
