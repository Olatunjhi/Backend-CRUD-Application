const pagination = (query) => {
    const pageDafault = 1;
    const limitDefault = 10;
    const maxLimit = 100;

    let page = parseInt(query.page);
    let limit = parseInt(query.limit);

    if (isNaN(page) || page < 1)
    {
        page = pageDafault;
    }

    if (isNaN(limit) || limit < 10 || limit > maxLimit)
    {
        limit = limitDefault;
    }

    const skip = (page - 1) * limit;

    return { page, limit, skip };
}

module.exports = pagination;