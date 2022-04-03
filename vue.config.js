/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    parallel: false,
    css: {
        loaderOptions: {
    //         scss: {
    //             additionalData: '@import "~@/assets/scss/utility/vars";',
    //         },
            postcss: {
                sourceMap: false,
                options: {},
            },
        },
        requireModuleExtension: false,
    },
    // configureWebpack: {
    //     plugins: [
    //         require('unplugin-vue2-script-setup/webpack')({
    //             /* options */
    //         }),
    //     ],
    // },
    chainWebpack: (config) => {
        // config.module
        //     .rule('main')
        //     .test(/main.scss/)
        //     .after('scss')
        //     .oneOf('vue')
        //
        //     .use('debug')
        //     .loader('debug-loader')
        //     .end()
        //
        //     .use('css-loader')
        //     .loader(path.join(__dirname, 'node_modules', 'css-loader', 'dist', 'cjs.js'))
        //     .end()
        //
        //     .use('postcss-loader')
        //     .loader(path.join(__dirname, 'node_modules', 'postcss-loader', 'dist', 'cjs.js'))
        //     .end()
        //
        //     .use('sass-loader')
        //     .loader(path.join(__dirname, 'node_modules', 'sass-loader', 'dist', 'cjs.js'))
        //     .end()

        // ========== PUG BEM ==========

        config.module
            .rule('pug')
            .oneOf('vue-loader')

            .use('pug-bem')
            .loader('pug-bem-plain-loader')
            .options({
                b: true,
            })
            .end()

        config.module
            .rule('pug')
            .oneOf('raw-pug-files')

            .use('pug-bem')
            .loader('pug-bem-plain-loader')
            .options({
                b: true,
            })
            .end()
    },
}
