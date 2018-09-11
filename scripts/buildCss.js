const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

const appPath = path.resolve(__dirname, '..');
const stylePath = path.resolve(appPath, 'styles');
const mainSassFile = path.resolve(appPath, 'styles/main.scss');

/**
 * Simple method to save generated style into some file
 *
 * @param  {string} style generated from sass
 * @param  {string} name?  name of this file without .css, default is main
 * @return {void}
 */
function saveStyleFile(style, name) {
  if (!fs.existsSync(stylePath)) {
    console.log(`Folder for styles doesn't exists. Try to create...`);
    fs.mkdirSync(stylePath);
  }

  // Default name for style
  if (!name || name.length < 1) {
    name = 'main';
  }

  const styleFile = path.resolve(stylePath, `${name}.css`);
  console.log(`Writing style into ${name}.css file...`);
  fs.writeFileSync(styleFile, style);
}

/**
 * Main function of this script, just call what is necessary
 *
 * @return {void}
 */
function main() {
  sass.render({ file: mainSassFile }, (error, result) => {
    if (error) {
      console.log(`There was an error while generating the style file!`, error);
      return;
    }

    // Save result into file
    saveStyleFile(result.css);
  });
}

// Just run main function
main();
