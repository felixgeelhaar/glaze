// Ambient declaration so `tsc` accepts side-effect CSS imports
// (e.g. `import './index.css';` and `import '.../styles/tokens.css';`).
declare module '*.css';
