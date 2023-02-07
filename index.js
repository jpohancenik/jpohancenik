const sass = require('node-sass');
const fs = require('fs')
const inlineCss = require('inline-css');
const domain = 'https://email-templates-sa.netlify.app/'

const htmlContent = fs.readFileSync('./src/template.html').toString().replaceAll('[domain]', domain)

sass.render({
  file: './src/styles.scss',
}, (error, result) => {
  error && console.error('SASS ERROR', error)
  !error && inlineCss(htmlContent.replace('[styles]', result.css), {
    url: '/.dist/style.css',
    preserveMediaQueries: false,
    removeHtmlSelectors: true,
  })
    .then((result) => {
      fs.writeFileSync('./dist/index.html', result.toString());
    })
    .catch((e) => console.log(e));
});
