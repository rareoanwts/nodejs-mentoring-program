const csv = require('csvtojson');
const events = require('events');
const { createReadStream, createWriteStream, mkdir } = require('fs');
const { createInterface } = require('readline');
const { dirname, resolve } = require('path');

const defaultInputFilePath = resolve() + '\\csv\\nodejs-hw1-ex1.csv';
const defaultOutputFilePath = resolve() + '\\result\\task2\\nodejs-hw1-ex1.txt';

mkdir(dirname(defaultOutputFilePath),  { recursive: true }, (err) => {
  if (err) {
      return console.error(err);
  }
  console.log('Directory created successfully!');
});

const readableStream = createReadStream(defaultInputFilePath);
const writeableStream = createWriteStream(defaultOutputFilePath);

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: csv().fromStream(readableStream)
    });

    rl.on('line', line => {
      writeableStream.write(line + '\n');
    });

    await events.once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
})();