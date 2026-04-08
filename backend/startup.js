import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const logStream = fs.createWriteStream(path.join(process.cwd(), 'startup_log.txt'), { flags: 'a' });

const child = spawn('npx', ['tsx', 'index.ts'], {
  stdio: ['ignore', logStream, logStream],
  detached: true
});

child.unref();

console.log('Backend spawned with PID:', child.pid);
process.exit(0);
