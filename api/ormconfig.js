module.exports = {
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  url: process.env.DATABASE_URL,
  entities: ['./dist/modules/**/entities/*.js'],
  migrations: ['./dist/shared/database/migrations/*.js'],
  cli: {
    migrationsDir: './src/shared/database/migrations',
  },
};
