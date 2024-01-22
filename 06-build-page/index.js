const fs = require('fs');
const path = require('path');

let arrNames = [];
let arrText = [];

fs.readdir(path.join(__dirname, 'project-dist'), (err) => {
    if (err) {
        fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
});

(function readComponents() {
    fs.readdir(path.join(__dirname, 'components'), (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
        } else {
            files.forEach((file) => {
                fs.stat(path.join(path.join(__dirname, 'components'), file), (err, stats) => {
                    if (err) {
                        console.error(`Error getting file stats: ${err}`);
                        return;
                    }
                    if (stats.isFile() && path.extname(file).slice(1) === 'html') {
                        arrNames.push(`{{${file.split('.')[0]}}}`);

                        const myStream = fs.createReadStream(path.join(path.join(__dirname, 'components'), file), { encoding: "utf8" });
                        myStream.on("data", (text) => {
                            arrText.push(text);

                            const myStream4 = fs.createReadStream(path.join(__dirname, "template.html"), { encoding: "utf8" });
                            myStream4.on("data", (text) => {
                                fs.writeFile(path.join(path.join(__dirname, 'project-dist'), 'index.html'), replaseStr(text), { encoding: "utf8" }, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            });
                        });
                    }
                });
            })
        }
    });
}());

function replaseStr(str) {
    if(arrNames.length === 3) {
        const replace1 = str.replace(/{{articles}}/g, arrText[0]);
        const replace2 = replace1.replace(/{{header}}/g, arrText[2]);
        const replace3 = replace2.replace(/{{footer}}/g, arrText[1]);
        return replace3;
    }
    if(arrNames.length === 4) {
        const replace1 = str.replace(/{{about}}/g, arrText[0]);
        const replace2 = replace1.replace(/{{articles}}/g, arrText[1]);
        const replace3 = replace2.replace(/{{header}}/g, arrText[3]);
        const replace4 = replace3.replace(/{{footer}}/g, arrText[2]);
        return replace4;
    }
};
// node 06-build-page