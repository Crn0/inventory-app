const greaterThanOrEquals = (val, req, num = 1) => {
    return req.body[val].length >= num;
};

export default greaterThanOrEquals;
