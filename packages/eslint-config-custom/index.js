module.exports = {
  // Specify the environments where your code is intended to run
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // Specify the parser and parser options for TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023, // Use the latest ECMAScript features
    sourceType: 'module', // Use ECMAScript modules
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing for React
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': 'error',
  },
};
