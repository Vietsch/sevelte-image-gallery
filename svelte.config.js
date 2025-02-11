import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    files: {
      lib: 'src/lib'
    }
  },
  
  package: {
    dir: 'dist',
    emitTypes: true,
    exports: (filepath) => {
      // Only include files from src/lib
      return filepath.startsWith('src/lib/');
    }
  }
};

export default config;
