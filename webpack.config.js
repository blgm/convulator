import CopyWebpackPlugin from 'copy-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

export default {
  mode: 'production',
  entry: './src/view/app.js',
  output: {
    filename: 'convulator.js',
    path: new URL('dist', import.meta.url).pathname
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/static', to: '.' }
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
}
