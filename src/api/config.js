export default {
    enableDocs: process.env.ENABLE_DOCS === 'true',
    debug: process.env.DEBUG === 'true',
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
};
