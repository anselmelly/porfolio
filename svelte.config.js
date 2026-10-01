import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // inline the ~26 KB stylesheet into each page so it doesn't block first paint
    inlineStyleThreshold: 30000,
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
    }),
  },
};

export default config;
