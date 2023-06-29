const path = require("path");
const { aliasWebpack } = require("react-app-alias-ex");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (config, env) {
    const isEnvProduction = env === "production";
    const aliasFn = aliasWebpack({});
    config = {
        ...aliasFn(config),
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                "react": path.resolve(__dirname, "../../node_modules/pxt-core/node_modules/react"),
                "react-dom": path.resolve(__dirname, "../../node_modules/pxt-core/node_modules/react-dom"),
                "react-common": path.resolve(__dirname, "../../node_modules/pxt-core/built/react-common"),
            }
        },
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.less$/i,
                    use: [
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true,
                                },
                            },
                        },
                    ],
                },
            ]
        },
        plugins: [
            ...config.plugins.filter((p) => !(p instanceof HtmlWebpackPlugin)),
            new NodePolyfillPlugin(),
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: "./public/index.html",
                    },
                    isEnvProduction
                        ? {
                              minify: {
                                  removeComments: false,
                                  collapseWhitespace: false,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          }
                        : undefined
                )
            ),
        ],
    };
    return config;
};
