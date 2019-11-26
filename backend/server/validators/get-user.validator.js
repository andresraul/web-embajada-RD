const getUserValidator = {};

getUserValidator.limitValue = (limit, count) => {
    if (limit == 0 || limit == 'NaN' || limit > count || limit < 0) return count;

    return limit;
}

getUserValidator.status = (status) => {
    switch (status) {
        case 'false':
            return { status: false };
            break;
        case 'true':
            return { status: true };
        default:
            return null;
    }
}



module.exports = getUserValidator;