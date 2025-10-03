import { visit } from 'unist-util-visit';

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
        
        const text = node.children && node.children.length > 0 
          ? node.children.map(child => child.value || '').join('')
          : '';

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
