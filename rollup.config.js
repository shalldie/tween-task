import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const ifPro = process.env.NODE_ENV === 'production';

export default {
    input: './src/index.js',
    output: {
        file: './dist/tween-task.js',
        format: 'umd',
        name: 'TweenTask'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        ...(ifPro ? [uglify()] : [])
    ],
    watch: {
        include: 'src/**',
        clearScreen: true
    }
};
