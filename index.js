const sass = require('node-sass');
const fs = require('fs')
const inlineCss = require('inline-css');
// const domain = 'https://saemail.netlify.app/'
const domain = 'https://jpohancenik.github.io/jpohancenik/'
// const domain = './'

const htmlContent = fs.readFileSync('./src/template.html').toString().replaceAll('[domain]', domain)
console.log(`Using domain ${domain}`);

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
      console.log(`Writing to docs`);
      fs.writeFileSync('./docs/index.html', result.toString());
    })
    .catch((e) => console.log(e));
});
