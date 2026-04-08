const { spawn } = require('child_process');
const fs = require('fs');
const backendOut = fs.openSync('backend_out.log', 'a');
const backendErr = fs.openSync('backend_err.log', 'a');
const frontendOut = fs.openSync('frontend_out.log', 'a');
const frontendErr = fs.openSync('frontend_err.log', 'a');

const backend = spawn('npm.cmd', ['run', 'dev'], {
    cwd: './backend',
    stdio: ['ignore', backendOut, backendErr],
    shell: true
});

const frontend = spawn('npm.cmd', ['run', 'dev'], {
    cwd: './frontend',
    stdio: ['ignore', frontendOut, frontendErr],
    shell: true
});

console.log('Servers started via Node child_process!');
