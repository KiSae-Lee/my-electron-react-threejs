const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, //폰트 파일이 로더될 수 있도록 함
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name]-[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: false,
            name: 'images/[name]-[hash].[ext]',
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
    resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: path.resolve(__dirname, './public/index.html'),
    })
  ],
}

// output: 파일이 번들되면 어디로 보낼지 설정하는 옵션
// path: 번들 파일이 저장될 디렉토리 이름
// filename: 웹팩 실행 후 생성된 새로운 번들 파일에 대해 설정할 이름
// chunkFile: ChunkFile의 이름을 설정
// pulicPath: 어플리케이션의 기본 경로 설정
// module: 파일 번들링 규칙을 지정하는 옵션
// rules: 모듈이 생성되는 방식을 수정
// test: 특정 로더의 대상이 되어야 하는 파일 확장자
// exclude: 번들러가 무시해야 하는 파일 지정
// loader: 사용할 로더 종류. 배열로 작성하면 배열의 순서대로 실행됨
// resolve: 모듈 해석에 대한 설정
// extensions: 확장자를 순서대로 해석함
// plugins: plugin을 추가할 수 있음
// HtmlWebpackPlugin: 웹팩이 html 파일 템플릿을 알 수 있도록 하는 플러그인