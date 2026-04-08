import mysql from 'mysql2/promise';

async function main() {
  const config = {
    host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '4579PdSAb7iFRRN.root',
    password: 'h6aPQzHNXtGIeVrM',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false
    }
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log('Connected to TiDB Cloud cluster!');

    const [dbs]: any = await connection.query('SHOW DATABASES');
    console.log('Databases found:', dbs.map((d: any) => d.Database));

    for (const dbRow of dbs) {
      const dbName = dbRow.Database;
      if (['information_schema', 'mysql', 'performance_schema', 'test'].includes(dbName)) continue;

      console.log(`\nChecking database: ${dbName}`);
      await connection.query(`USE \`${dbName}\``);
      
      const [tables]: any = await connection.query('SHOW TABLES');
      console.log(`Tables in ${dbName}:`, tables.map((t: any) => Object.values(t)[0]));

      for (const tableRow of tables) {
          const tableName = Object.values(tableRow)[0] as string;
          if (tableName.toLowerCase().includes('employee')) {
              const [count]: any = await connection.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
              console.log(`  Row count in ${tableName}: ${count[0].count}`);
          }
      }
    }

    await connection.end();
  } catch (err) {
    console.error('Error scanning TiDB:', err.message);
  }
}

main();
