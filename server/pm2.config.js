module.exports = {
    app : [{
        name: 'service',
        script: './lib/bin/server.js',
        kill_timeout: 30000,
        instance_var: 'INSTANCE_ID',
        instances: process.env.WORKER_COUNT
    }]
}