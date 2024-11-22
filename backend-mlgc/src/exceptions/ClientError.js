class ClientError extends Error {
    constructor(props, statusCode = 400) {
        super(props);
        this.statusCode = statusCode;
        this.name = 'ClientError'
    }

}

module.exports = ClientError;