const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(path.join(__dirname, 'project-dist'), 'bundle.css'), '', { encoding: "utf8" }, (err) => {
    if (err) {
        console.log(`Error: ${err}`);
    }
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach((file) => {
            fs.stat(path.join(path.join(__dirname, 'styles'), file), (err, stats) => {
                if (err) {
                    console.error(`Error getting file stats: ${err}`);
                } else {
                    if (stats.isFile() && path.extname(file).slice(1) === 'css') {
                        const myStream = fs.createReadStream(path.join(path.join(__dirname, 'styles'), file), { encoding: "utf8" });
                        myStream.on("data", (text) => {
                            fs.appendFile(path.join(path.join(__dirname, 'project-dist'), 'bundle.css'), text + '\n', { encoding: "utf8" }, (err) => {
                                if (err) {
                                    console.log(`Error: ${err}`);
                                }
                            })
                        });
                    }
                }
            });
        });
    }
});