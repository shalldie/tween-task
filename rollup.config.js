import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

const ifPro = process.env.NODE_ENV === 'production';

export default {
    input: './src/index.ts',
    output: {
        file: './dist/tween-task.js',
        format: 'umd',
        name: 'TweenTask'
    },
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        })
        // ...(ifPro ? [uglify()] : [])
    ],
    watch: {
        include: 'src/**',
        clearScreen: true
    }
};
