import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'debug_startup.log');
const log = (msg) => {
    const timestamp = new Date().toISOString();
    const formattedMsg = `[${timestamp}] ${msg}\n`;
    fs.appendFileSync(logFile, formattedMsg);
    console.log(msg);
};

fs.writeFileSync(logFile, '--- Startup Debug Log ---\n');

const startProcess = (name, command, args, cwd) => {
    log(`Starting ${name}: ${command} ${args.join(' ')} in ${cwd}`);
    const proc = spawn(command, args, { 
        cwd, 
        shell: true,
        env: { ...process.env, FORCE_COLOR: '1' }
    });

    proc.stdout.on('data', (data) => {
        log(`[${name} STDOUT] ${data.toString().trim()}`);
    });

    proc.stderr.on('data', (data) => {
        log(`[${name} STDERR] ${data.toString().trim()}`);
    });

    proc.on('close', (code) => {
        log(`${name} exited with code ${code}`);
    });

    return proc;
};

// Start Backend
const backend = startProcess('BACKEND', 'npm', ['run', 'dev'], path.join(process.cwd(), 'backend'));

// Wait 10s then start Frontend
setTimeout(() => {
    const frontend = startProcess('FRONTEND', 'npm', ['run', 'dev'], path.join(process.cwd(), 'frontend'));
}, 10000);

log('Startup script initiated. Monitoring logs...');
