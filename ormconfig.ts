
module.exports = {
    'type': 'postgres',
    'host': process.env.DB_HOST,
    'port': 5432,
    'username': process.env.DB_USER,
    'password': process.env.DB_PWD,
    'database': process.env.DB,
    'synchronize': false,
    'logging': true,
    'entities': [
        'src/entity/*.ts',
    ],

}
