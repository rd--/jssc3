'use strict';

// Log error and return default value
function log_error_and_return(from, reason, defaultValue) {
    console.debug(from, ': ', reason);
    return defaultValue;
}
