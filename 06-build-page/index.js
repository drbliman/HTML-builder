const fs = require('fs');
const path = require('path');

let arrNames = [];
let arrText = [];

fs.readdir(path.join(__dirname, 'project-dist'), (err) => {
    if (err) {
        fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
            if (err) {
                console.log(err);
            } else {
                fs.readdir(path.join(path.join(__dirname, 'project-dist'), 'assets'), (err) => {
                    if (err) {
                        fs.mkdir(path.join(path.join(__dirname, 'project-dist'), 'assets'), (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                copyFolder(path.join(__dirname, 'assets'), path.join(path.join(__dirname, 'project-dist'), 'assets'));
                            }
                        })
                    }
                })
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

fs.writeFile(path.join(path.join(__dirname, 'project-dist'), 'styles.css'), '', { encoding: "utf8" }, (err) => {
    if (err) {}
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
                            fs.appendFile(path.join(path.join(__dirname, 'project-dist'), 'styles.css'), text + '\n', { encoding: "utf8" }, (err) => {
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

function copyFolder(source, target) {
    fs.mkdir(target, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
        } else {
            fs.readdir(source, (err, files) => {
                if (err) {
                    console.log(err);
                } else {
                    const copyFile = (file) => {
                        fs.stat(path.join(source, file), (err, stats) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (stats.isDirectory()) {
                                    copyFolder(path.join(source, file), path.join(target, file), (err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                } else {
                                    fs.copyFile(path.join(source, file), path.join(target, file), (err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            }
                        });
                    };
                    files.forEach(copyFile);
                }
            });
        }
    });
}
// node 06-build-page