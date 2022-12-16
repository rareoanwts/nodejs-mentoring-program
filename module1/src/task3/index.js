import csv from 'csvtojson';
import events from 'events';
import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';
import { resolve } from 'path';
import { makeDir } from './utils';

const defaultInputFilePath = resolve() + '\\csv\\nodejs-hw1-ex1.csv';
const defaultOutputFilePath = resolve() + '\\result\\task3\\nodejs-hw1-ex1.txt';

const inputFilePath = process.argv[2] || defaultInputFilePath;
const outputFilePath = process.argv[3] || defaultOutputFilePath;

makeDir(outputFilePath);

const readableStream = createReadStream(inputFilePath);
const writeableStream = createWriteStream(outputFilePath);

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