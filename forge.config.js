module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'abridged',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin',
      ],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack', {
        mainConfig: './webpack/webpack.main.config.js',
        devContentSecurityPolicy: "default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:",
        renderer: {
          config: './webpack/webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/App.jsx',
              name: 'main_window',
              preload: {
                js: './src/electron/preload.js',
              },
            },
            {
              html: './src/index.html',
              js: './src/Setup.jsx',
              name: 'setup_window',
            },
          ],
          nodeIntegration: false, // disabling this simply fails with 'require is not defined'
        },
      },
    ],
  ],
}
