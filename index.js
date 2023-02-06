const sass = require('node-sass');
const fs = require('fs')
const inlineCss = require('inline-css');

const htmlContent = fs.readFileSync('./src/template.html').toString()

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
