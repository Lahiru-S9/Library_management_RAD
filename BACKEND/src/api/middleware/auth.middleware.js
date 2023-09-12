const authenticate = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.send("user is not authorized");
    }
};

export { authenticate };