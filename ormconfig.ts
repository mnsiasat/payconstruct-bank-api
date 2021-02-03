module.exports = {
    'type': 'postgres',
    'host': process.env.DB_HOST,
    'port': 5432,
    'username': process.env.DB_USER,
    'password': process.env.DB_PWD,
    'database': process.env.DB,
    'synchronize': true,
    'logging':false,
    'entities': [
        'src/entity/*.js'
    ],
    'migrations': [
        'src/migration/*.js'
    ],
    'subscribers': [
        'src/subscriber/*.js'
    ],
    'cli': {
        'entitiesDir': 'src/entity',
        'migrationsDir': 'src/migration',
        'subscribersDir': 'src/subscriber'
    }
}
