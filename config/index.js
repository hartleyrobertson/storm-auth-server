var convict = require('convict');

var conf = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['local', 'production', 'development', 'test'],
        default: 'local',
        env: 'NODE_ENV'
    },
    isMock: {
        doc: '',
        format: Boolean,
        default: false,
        env: 'MOCK'
    },
    isDev: {
        doc: '',
        format: Boolean,
        default: true,
        env: ''
    },
    version: {
        doc: '',
        format: String,
        default: '1.0',
        env: ''
    },
    http: {
        listen: {
            doc: '',
            format: 'url',
            default: 'localhost',
            env: 'LISTEN_IP'
        },
        port: {
            doc: '',
            format: 'port',
            default: 8000,
            env: 'LISTEN_PORT'
        }
    },
    stormPath: {
        key: {
            doc: '',
            format: String,
            default: '1RB6YAZWLMT8YAS8ODF5L0U7E',   // dev
            env: 'STORM_KEY'
        }
    },
    auth: {
        secret: {
            doc: '',
            format: String,
            default: 'sugarbears',
            env: 'AUTH_SECRET'
        },
        ttl: {
            doc: '',
            format: Number,
            default: 24,
            env: 'AUTH_TTL'
        }
    }
});

module.exports = conf;