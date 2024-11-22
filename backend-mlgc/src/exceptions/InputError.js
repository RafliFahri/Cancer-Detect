const ClientError = require('./ClientError');

class InputError extends ClientError {
    constructor(props) {
        super(props);
        this.name = 'InputError';
    }
}

module.exports = InputError;