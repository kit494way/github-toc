const ignoreFiles = process.env.TARGET == 'firefox' ? ['background'] : [];

export default {
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [
    ...ignoreFiles,
    'web-ext-config.mjs',
    'scripts',
    'manifests',
    'mise.toml',
    'README.md',
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'web-ext-artifacts',
  ],
};
