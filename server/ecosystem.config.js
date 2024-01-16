module.exports = {
    apps: [{
        script  : 'app.js',
        watch   : '.',
        env_dev : {
            NODE_ENV                             : 'development',
            PORT                                 : 2222,
            JWT_SECRET                           : "key",
            JWT_ACCESS_EXPIRATION_MINUTES        : 44,
            JWT_REFRESH_EXPIRATION_DAYS          : 1,
            JWT_RESET_PASSWORD_EXPIRATION_MINUTES: 44,
            JWT_VERIFY_EMAIL_EXPIRATION_MINUTES  : 44,
        },
        env_test: {
            PORT        : 2222,
            NODE_ENV    : "test",
            TOKEN_SECRET: "key"
        },
        env_prod: {
            PORT        : 2222,
            NODE_ENV    : "production",
            TOKEN_SECRET: "key"
        },
    }],
};