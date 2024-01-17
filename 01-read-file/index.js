const fs = require("fs");
const path = require("path");

const myStream = fs.createReadStream(path.join(__dirname, "text.txt"), { encoding: "utf8" });

myStream.on("data", (text) => {
  console.log(text);
});

myStream.on("end", () => {
  console.log("The end.");
});

myStream.on("error", (err) => {
  console.log(`Error reading file: ${err}`);
});