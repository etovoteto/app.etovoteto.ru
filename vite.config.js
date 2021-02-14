import ViteComponents from 'vite-plugin-components'
import Voie from 'vite-plugin-voie'
import PurgeIcons from 'vite-plugin-purge-icons'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import alias from '@rollup/plugin-alias'

const moduleExclude = (match) => {
  const m = (id) => id.indexOf(match) > -1
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id
    },
    load(id) {
      if (m(id)) return `export default {}`
    },
  }
}

export default {
  build: {
    rollupOptions: {
      external: ['text-encoding', '@peculiar/webcrypto'],
    },
  },
  server: {
    port: 3030,
  },
  optimizeDeps: {
    include: [
      'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js',
      'gun/lib/then',
      'gun/lib/webrtc',
      'gun/lib/radix',
      'gun/lib/radisk',
      'gun/lib/store',
      'gun/lib/rindexed',
    ],
  },
  plugins: [
    moduleExclude('text-encoding'),
    VitePWA({
      manifest: {
        name: 'ЭТОВОТЭТО',
        theme_color: '#999',
        icons: [
          {
            src: '/icons/logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/icons/logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
    alias({
      entries: [
        { find: /^store\@(.*)/, replacement: '/src/store/$1.js' },
        { find: /^use\@(.*)/, replacement: '/src/use/$1.js' },
      ],
    }),
    vue(),
    Voie({
      extensions: ['vue', 'md'],
      importMode: 'async',
    }),
    ViteComponents({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],
    }),

    PurgeIcons({
      /* PurgeIcons Options */
    }),
  ],
}
