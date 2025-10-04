# Remark Say TTS Plugin

## Overview
An npm library that provides a remark plugin for adding text-to-speech functionality to ReactMarkdown using the Web Speech API. When users add the `:say` directive in markdown, it renders the text with a sound icon that plays the pronunciation when clicked.

## Project Structure
This is an npm library with an example demo application:

### Library (root)
- `/src/index.js` - The core remark plugin (framework-agnostic, no React dependency)
- `/src/react.js` - React component entry point (exports SayComponent)
- `/src/SayComponent.jsx` - React component that handles TTS playback
- `/src/SayComponent.css` - Styling for TTS elements
- `package.json` - npm library configuration with dual-entry exports

### Example App (example/)
- `/example/src/App.jsx` - Demo application with live markdown editor
- `/example/index.html` - HTML entry point
- `/example/src/main.jsx` - React app entry point
- `/example/vite.config.js` - Vite configuration with GitHub Pages base path
- `/example/package.json` - Example app dependencies

## Architecture
The package uses a **dual-entry point architecture**:
- Main entry (`remark-say-tts`): Framework-agnostic core plugin, no React required
- React entry (`remark-say-tts/react`): React component for React users
- React is marked as an optional peer dependency, preventing warnings for non-React users

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
- Example app runs on port 5000 with Vite dev server
- The example can be built and deployed to GitHub Pages with `npm run build`
- Base path is set to `/remark-say-tts/` for GitHub Pages deployment
