module.exports = {
  plugins: ['inline-react-svg'],
  presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
};
