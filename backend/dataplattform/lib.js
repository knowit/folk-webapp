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

    async report({
        reportName,
        filter = {},
        accessToken = null,
        apiUrl = null
    }) {

        const filters = Object.entries(filter).map(([key, value]) => {
            const val = typeof(value) === 'string' ? `'${value}'` : value
            return `filter=${encodeURIComponent(key)}:${encodeURIComponent(val)}`
        })
        const filterString = filters.length > 0 
            ? `?${filters.join('&')}`
            : ''

        const reportUrl = `${apiUrl || this.apiUrl}/data/query/report/${reportName}${filterString}`

        return await fetch(reportUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken || this.accessToken}`,
            }
        });
    }
}
