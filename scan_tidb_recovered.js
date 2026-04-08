const mysql = require('mysql2/promise');
const fs = require('fs');

async function main() {
  const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('scan_tidb_recovered.log', msg + '\n');
  };

  fs.writeFileSync('scan_tidb_recovered.log', 'RECOVERED CLUSTER SCAN START\n');

  const config = {
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: 'cZwU7hN7czYVizH.root',
    password: 'kXhYz4HHEycXAO5c',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false
    }
  };

  try {
    const connection = await mysql.createConnection(config);
    log('Connected to RECOVERED TiDB Cloud cluster!');

    const [dbs] = await connection.query('SHOW DATABASES');
    log('Databases found: ' + JSON.stringify(dbs.map(d => d.Database)));

    for (const dbRow of dbs) {
      const dbName = dbRow.Database;
      if (['information_schema', 'mysql', 'performance_schema'].includes(dbName)) continue;

      log(`\nChecking database: ${dbName}`);
      await connection.query(`USE \`${dbName}\``);
      
      const [tables] = await connection.query('SHOW TABLES');
      log(`Tables in ${dbName}: ` + JSON.stringify(tables.map(t => Object.values(t)[0])));

      for (const tableRow of tables) {
          const tableName = Object.values(tableRow)[0];
          if (tableName.toLowerCase().includes('employee')) {
              const [count] = await connection.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
              log(`  Row count in ${tableName}: ${count[0].count}`);
          }
      }
    }

    await connection.end();
  } catch (err) {
    log('Error scanning recovered TiDB: ' + err.message);
  }
}

main();
