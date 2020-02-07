const ignoreFiles = process.env.TARGET == 'firefox' ? ['background'] : [];

module.exports = {
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [
    ...ignoreFiles,
    'web-ext-config.js',
    'scripts',
    'manifests',
    'README.md',
    'package.json',
    'yarn.lock',
    'web-ext-artifacts',
  ],
};
