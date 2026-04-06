'use strict';

/**
 * Strip keys starting with '$' to prevent NoSQL injection in update payloads.
 * @param {Object} data - Raw update object from request body
 * @returns {Object} Sanitized object safe to pass as { $set: sanitizedData }
 */
function sanitizeUpdateData(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {};
    }
    const sanitized = {};
    for (const key of Object.keys(data)) {
        if (!key.startsWith('$')) {
            sanitized[key] = data[key];
        }
    }
    return sanitized;
}

module.exports = { sanitizeUpdateData };
