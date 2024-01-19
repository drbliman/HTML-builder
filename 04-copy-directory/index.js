const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Directory created successfully!');
    }
})

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
    } else {
        files.forEach((file) => {
            fs.copyFile(path.join(path.join(__dirname, 'files'), file), path.join(path.join(__dirname, 'files-copy'), file), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`File '${file}' copied successfully`);
                }
            })
        })
    }
})