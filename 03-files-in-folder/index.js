const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }
  files.forEach((file) => {
    fs.stat(path.join(path.join(__dirname, 'secret-folder'), file), (err, stats) => {
      if (err) {
        console.error(`Error getting file stats: ${err}`);
        return;
      }
      if (stats.isFile()) {
        console.log(`${file.split('.')[0]} - ${path.extname(file).slice(1)} - ${stats.size} bit`);
      }
    });
  });
});