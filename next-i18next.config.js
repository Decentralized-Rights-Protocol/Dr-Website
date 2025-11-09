module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['ak', 'ar', 'en', 'es', 'fr', 'h§i', 's', 'zh'],
    localeDetection: true,
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./locales') : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
