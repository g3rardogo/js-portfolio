/* Configuraciones del proyecto */
const path = require('path');
//Agreagando plugin de HTML Webpack
const HTMLWebpackPlugin = require('html-webpack-plugin');
//Agregando plugin de CSS webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Agreagando plugin de copy webpack
const CopyPlugin = require('copy-webpack-plugin');
//Agreagando plugin de css minimizer
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//Agreagando plugin de Terser para optimizar js
const TerserPlugin = require('terser-webpack-plugin');
//Agregando el paquete de dotenv
const Dotenv = require('dotenv-webpack');
//Agregando plugin Clean Webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//Modulo que se exportara con la configuracion deseada
module.exports = {
    //Punto de entrada de la aplicacion
    entry: './src/index.js',
    //Output, donde se enviara lo que va a preparar webpack
    output: {
        //Path donde se guardara nuestro proyecto
        path: path.resolve(__dirname, 'dist'),
        //Identificando cada build del proyecto con un hash para evitar problemas con la cache
        filename: '[name].[contenthash].js',
        //Configuracion que indica donde se guardaran las imagenes
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    //Extensiones de archivos con las que vamos a trabajar en el proyecto
    resolve: {
        extensions: ['.js'],
        //Alias de las rutas de nuestros archivos
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        },
    },
    //Añadiendo modulo de babel
    module: {
        //La configuracion va dentro de una regla
        rules: [
            //Objeto para poder trababjar con babel loader y coectarlo con webpack
            {
                //Test que nos permite saber que extensiones vamos a usar en el Loader
                test: /\.m?js$/,
                //Excluyendo los elementos o modulos js
                exclude: /node_modules/,
                //Pasando el loader
                use: {
                    loader: 'babel-loader'
                }
            },
            //Regla para reconocer CSS
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
            },
            //Loader que nos permite importar de forma dinamica imagenes
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            //Regla para trabajar con las fonts
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //Habilita o deshabilita la transformacion de archivos base64
                        limit: 10000,
                        //Especifica el tipo de MIME con el que se alineara el archivo y esta es la forma estandar
                        mimetype: "application/font-woff",
                        //Indica el nombre inicial de su archivo mas su extension
                        name: "[name].[contenthash].[ext]",
                        //Directorio de salida
                        outputPath: "./assets/fonts/",
                        //Directorio publico
                        publicPath: "../assets/fonts/",
                        //Especifica si es o no un modulo
                        esModule: false,
                    },
                }
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            //Configuraciones del plugin
            inject: true,
            //Definimos donde esta ubicado nuestro template HTML
            template: './public/index.html',
            //Resultado de la preparacion HTML
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            //Usamos content hash para evitar problemas con la cache
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    //Agreagando plugins de optimizacion a nuestra configuracion
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}

