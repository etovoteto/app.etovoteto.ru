#  ЭТОВОТЭТО
## Словарь придуманных слов



## STACK
- [Vue 3](https://v3.vuejs.org/) 
  - [Vue router](https://github.com/vuejs/vue-router-next) for page routing [docs](https://next.router.vuejs.org/)
  - [VueUse](https://vueuse.js.org) helpers 
    - `useTitle()` for page title manipulations
  - [Vetur](https://vuejs.github.io/vetur/) as a VSCode extenion for highlighting and formatting code in vue SFCs
    - [Pug](https://pugjs.org) - a template language for shorter html templates
    - [Stylus](https://stylus-lang.com/) - a preprocessor for more compact CSS code with [Stylus Supremacy](https://thisismanta.github.io/stylus-supremacy/) VSCode extension
      - add these lines to VScode settings.json for shorter css `"stylusSupremacy.insertColons": false,
    "stylusSupremacy.insertSemicolons": false,
    "stylusSupremacy.insertBraces": false,`
- [Vite 2](https://vitejs.dev/) as the fast development environment with modular bundling, with magic plugins by [Antfu](https://github.com/antfu)
  - [voie](https://github.com/vamplate/vite-plugin-voie)  enables file system based routing (all routes are parsed from file structure under the *./src/pages* folder) 
  - [vite-plugin-components](https://github.com/antfu/vite-plugin-components) automatically import components from *./src/components* **done**
  - [purgeIcons](https://github.com/antfu/purge-icons) with [Icônes](https://icones.js.org/) VS code extension for fast icons workflow
  - [vite-plugin-md](https://github.com/antfu/vite-plugin-md) for static pages in docs *removed from core, docs will be put aside*
  - [vite-plugin-vue-i18n](https://github.com/intlify/vite-plugin-vue-i18n) to improve i18n features in sfcs
  - [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) for PWA offline experience 
- [GUN](https://gun.eco/) for the reactive p2p graph database
  - with a free peer at [Glitch.com](https://glitch.com/edit/#!/gun-feeds)
- [color-hash](https://www.npmjs.com/package/color-hash) to get colors for item UUIDs
- [image-compressor](https://www.npmjs.com/package/image-compressor) to compress images to store them as base64 strings in the db
- [markdown-it](https://www.npmjs.com/package/markdown-it) for MarkDown parsing


## Возможности
- [ ] Генератор слов