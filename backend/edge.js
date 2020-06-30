
exports.authCheck = async (event) => {
    const { request } = event.Records[0].cf
    // TODO: check auth
    return request
}
