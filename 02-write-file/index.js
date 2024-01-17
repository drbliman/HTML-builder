const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Hello! Write your secret or "exit" if you do not want to\n');

(function write() {
    rl.question('', (text) => {
        if (text === 'exit') {
            console.log('Bye!');
            rl.close();
        } else {
            fs.appendFile(path.join(__dirname, 'output.txt'), text + '\n', { encoding: "utf8" }, (err) => {
                if (err) {
                    console.log(`Oops... some error: ${err}`);
                } else {
                    console.log('Everything worked! Do you want to write something else?');
                    write();
                }
            })
        }
    })
}());

rl.on('SIGINT', () => {
    console.log('Bye!');
    rl.close();
});