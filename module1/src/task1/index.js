const { stdin, stdout } = require('process');
const { Transform } = require('stream');

const reverseString = new Transform({
    transform(chunk, _, callback) {
      callback(null, [...chunk.toString()].reduce((acc, letter) => letter + acc, ''));
    },
});

stdin.pipe(reverseString).pipe(stdout);
