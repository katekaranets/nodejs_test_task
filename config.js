module.exports = {
    mongodb: {
        // test db, cleared before each test
        uri: "mongodb://127.0.0.1:27017/contactsDB",
        options: {
            promiseLibrary: require('bluebird')
        }
    }
};