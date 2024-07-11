// index.js

const fs = require('fs');
const path = require('path');

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv.slice(4).join(' ');

// Function to perform file operations based on command-line arguments
function fileEditor(operation, file, content) {
    switch (operation) {
        case 'read':
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file '${file}': ${err.message}`);
                    return;
                }
                console.log(`Contents of '${file}':`);
                console.log(data);
            });
            break;

        case 'delete':
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(`Error deleting file '${file}': ${err.message}`);
                    return;
                }
                console.log(`File '${file}' deleted`);
            });
            break;

        case 'create':
            fs.writeFile(file, '', (err) => {
                if (err) {
                    console.error(`Error creating file '${file}': ${err.message}`);
                    return;
                }
                console.log(`File '${file}' created`);
            });
            break;

        case 'append':
            fs.appendFile(file, content + '\n', (err) => {
                if (err) {
                    console.error(`Error appending to file '${file}': ${err.message}`);
                    return;
                }
                console.log(`Content appended to file '${file}'`);
            });
            break;

        case 'rename':
            const newFileName = process.argv[4];
            fs.rename(file, newFileName, (err) => {
                if (err) {
                    console.error(`Error renaming file '${file}' to '${newFileName}': ${err.message}`);
                    return;
                }
                console.log(`File '${file}' renamed to '${newFileName}'`);
            });
            break;

        case 'list':
            const directory = file || './';
            fs.readdir(directory, (err, files) => {
                if (err) {
                    console.error(`Error listing directory '${directory}': ${err.message}`);
                    return;
                }
                console.log(`Files and directories in '${directory}':`);
                files.forEach(file => {
                    console.log(file);
                });
            });
            break;

        default:
            console.log(`Invalid operation '${operation}'`);
            break;
    }
}

// Call the fileEditor function with the provided arguments
fileEditor(operation, file, content);



// To run the file editor, open your terminal, navigate to the directory where '2index.js; is located, and run commands like:
// bash

// node 2index.js read test.txt
// node 2index.js delete test.txt
// node 2index.js create test.txt
// node 2index.js append test.txt "New content"
// node 2index.js rename test.txt new.txt
// node 2index.js list .