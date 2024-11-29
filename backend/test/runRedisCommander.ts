import dotenv from "dotenv";
import { spawn } from "child_process";

dotenv.config({ path: "./config/.env.backend" });

const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;
const redisCmdPort = process.env.REDIS_COMMANDERPORT;

if (!redisUsername || !redisPassword || !redisCmdPort) {
    console.error("Error: Missing required environment vars: REDIS_USERNAME, REDIS_PASSWORD, or REDIS_COMMANDERPORT");
    process.exit(1);
}

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = [
    'redis-commander',
    '--redis-username', redisUsername,
    '--redis-password', redisPassword,
    '--port', redisCmdPort,
    '--redis-tls', 'true'
];

const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });

child.on('error', (err) => {
    console.error(`Failed to start redis-commander: ${err.message}`);
    process.exit(1);
});

child.on('exit', (code) => {
    console.log(`redis-commander exited with code ${code}`);
    process.exit(code || 0);
});
