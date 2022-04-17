const path = require('path')

module.exports = {
  // ...
  webpack: {
    alias: {
      '@/static': path.resolve(__dirname, './public/static'),
      '@': path.resolve(__dirname, './src')
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "@/styles/_variables.scss";
        `
      }
    }
  }
}
export {}
