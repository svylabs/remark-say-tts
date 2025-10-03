import { visit } from 'unist-util-visit';

function extractText(node) {
  if (!node) return '';
  
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractText).join('');
  }
  
  if (node.value && typeof node.value === 'string') {
    return node.value;
  }
  
  return '';
}

export default function remarkSayTts() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective'
      ) {
        if (node.name !== 'say') return;

        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};
        
        const text = extractText(node);

        data.hName = 'span';
        data.hProperties = {
          className: 'say-tts',
          'data-text': text,
          'data-lang': attributes.lang || 'en-US',
          'data-rate': attributes.rate || '1.0',
          'data-pitch': attributes.pitch || '1.0'
        };
      }
    });
  };
}

export { SayComponent } from './SayComponent.jsx';
