const fetch = require('node-fetch');

exports.DataplattformClient = class DataplattformClient {
    constructor({ 
        accessToken = null,
        apiUrl = process.env.API_URL || 'https://dev-api.dataplattform.knowit.no'
    }) {
        this.apiUrl = apiUrl;
        this.accessToken = accessToken;
    }

    async query({ 
        querySql,
        accessToken = null,
        apiUrl = null,
        format='json'
    }) {
        const queryUrl = `${apiUrl || this.apiUrl}/data/query`
        return await fetch(queryUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken || this.accessToken}`,
            },
            body: JSON.stringify({
                sql: querySql,
                format
            })
        });
    }
}
