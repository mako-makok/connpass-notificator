const path = require('path');

module.export = {
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
        extensions: [
            '.ts', '.js',
        ]
    }
}