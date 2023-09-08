/* eslint-disable no-undef */
import liveReload from 'vite-plugin-live-reload'

const drupalConfig = ({ mode }) => ({
  appType: 'custom',
  plugins: [
    liveReload(__dirname + '/**/*.(php|inc|theme|twig)')
  ],
  base: mode === 'production' ? "/themes/{your_theme}/dist/" : "",
})

export default drupalConfig