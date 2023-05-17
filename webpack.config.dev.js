const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'inline-source-map',
    devServer: {
        https: true,
        host: 'localhost',
        compress: true,
        hot: true,
        port: 3000,
        open: true,
        client: {
            progress: true,
        },
    },
    stats: {
        cachedModules: false,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
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
                test: /\.(png|svg|jpe?g|gif)$/,
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
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
    ],
};

// devtool: 소스 맵이 생성되는지 여부와 생성 방법을 제어
// inline-source-map: 원본 소스와 난독화된 소스를 매핑
// devServer: webpack-dev-server의 동작을 변경할 수 있는 옵션
// https: https를 사용할지 http를 사용할지 설정
// host: host 이름 설정
// compress: 제공되는 모든 항목에 대해 gzip 압축 활성화
// hot: 웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 하는 설정
// port: port 번호 설정
// open: 서버가 시작된 후 브라우저(예, 크롬)을 열도록 하는 옵션
// progress: 브라우저에서 컴파일 진행률을 백분율로 보여줌
// stats: 표시되는 번들 정보를 제어할 수 있는 옵션
// cachedModules: 빌드되지 않고 캐시된 모듈에 대한 정보를 추가하지 않음
