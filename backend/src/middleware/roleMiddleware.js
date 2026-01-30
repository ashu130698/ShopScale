///restrict route users to admin users
const adminOnly = (req, res, next) => {
    //short explanation
    if (req.user && req.user.role === "ADMIN") {
        return next();
    }
    ///user exist but its not admin
    res.status(403).json({ message: "Admin access only" });

};

export default adminOnly;