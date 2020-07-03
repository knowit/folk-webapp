
exports.adaptiveContent = async (event) => {
    const { request } = event.Records[0].cf

    // if (headers['cloudfront-is-mobile-viewer'] && headers['cloudfront-is-mobile-viewer'][0].value === 'true') {
    //     request.uri = '/small' + request.uri;
    // }

    return request
}
