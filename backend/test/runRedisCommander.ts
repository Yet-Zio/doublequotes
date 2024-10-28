// This requires the redis-commander package to be installed globally
// to install redis-commander: npm i -g redis-commander.

// The purpose of this file is to test redis connectivity, manage the redis instance and view the changes if possible.
import dotenv from "dotenv";
import { spawn } from "child_process";

dotenv.config({ path: "./config/.env.backend" });

const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;
const redisCmdPort = process.env.REDIS_COMMANDERPORT

if (!redisUsername || !redisPassword || !redisCmdPort) {
    console.error('Error: Missing required environment vars: REDIS_USERNAME or REDIS_PASSWORD or REDIS_COMMANDERPORT');
    process.exit(1);
}

const command = 'npx.cmd';
const args = ['redis-commander', '--redis-username', redisUsername, '--redis-password', redisPassword, '--port', redisCmdPort, '--redis-tls', 'true'];

const child = spawn(command, args, { stdio: 'inherit' });

child.on('error', err => {
    console.error(`Failed to start redis-commander: ${err.message}`);
    process.exit(1);
});

child.on('exit', code => {
    console.log(`redis-commander exited with code ${code}`);
    process.exit(code || 0);
});
