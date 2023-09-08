/* eslint-disable no-undef */

import vituum from 'vituum'

import globals from './src/data/globals'
import pages from 'vituum/plugins/pages.js'
import twig from '@vituum/vite-plugin-twig'

// eslint-disable-next-line no-unused-vars
const twigConfig = ({ mode }) => ({
  base: './',
  plugins: [
    vituum(
      {
        root: './src',
        dir: './views/pages',
      }
    ),
    pages({
      root: './src/views/',
      dir: './src/views/pages',
      normalizeBasePath: true
    }),
    twig({
      globals,
      namespaces: {
        'base': './src/views/base',
        'templates': './src/views/templates',
        'pages': './src/views/pages',
        'macros': './src/views/macros',
        'common': './src/views/common',
        'components': './src/views/components',
        'blocks': './src/views/blocks',
        'elements': './src/views/elements',
      }
    })
  ]
})

export default twigConfig;