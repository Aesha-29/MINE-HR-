const { spawnSync } = require('child_process');

const args = [
  'variables', 'set', '-s', 'MINE-HR',
  'DATABASE_URL=mysql://4579PdSAb7iFRRN.root:h6aPQzHNXtGIeVrM@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/minehr_db?sslaccept=strict',
  'DIRECT_DATABASE_URL=mysql://4579PdSAb7iFRRN.root:h6aPQzHNXtGIeVrM@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/minehr_db?sslaccept=strict',
  'JWT_SECRET=minehr_secret_key_2024'
];

console.log("Setting vars via railway CLI...");
const result = spawnSync('railway.cmd', args, { stdio: 'inherit' });
if (result.error) {
  console.error("Error:", result.error);
} else {
  console.log("Finished with exit code:", result.status);
}
