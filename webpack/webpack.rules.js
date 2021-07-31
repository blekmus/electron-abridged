module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  },
  {
    test: /\.(png|jpg|gif|woff|woff2)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 8192,
        mimetype: 'application/font-woff',
      },
    }],
  },
  {
    test: /\.(mp4|ogg)$/,
    loader: 'file-loader',
  },
  {
    test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff',
      },
    }],
  },
];
