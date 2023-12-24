module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['plugin:react/jsx-runtime', 'custom'],
  ignorePatterns: ['node_modules', 'dist'],
};
