var path = require('path');

module.exports = {
    mode: "development",


    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: "/dist/",
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],

            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]

            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },

            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "recharts": "Recharts",
        "uxp/components": "UXPComponents",
        "widget-designer/components": "WidgetDesignerComponents",
    },


    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
        },
        compress: true,
        liveReload: true,
        port:1022
    }

};
