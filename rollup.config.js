import typescript from 'rollup-plugin-typescript2';

const config = [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/bundle.js',
        format: 'iife'
      },
      {
        file: './dist/bundle.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        rollupCommonJSResolveHack: false,
        clean: true
      })
    ]
  }
]

export default config