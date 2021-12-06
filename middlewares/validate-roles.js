const {request, response} = require('express');

const isAdmin = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(401).json({
            ok: false,
            msg: 'No authorized'
        });
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            msg: `${name} no authorized`
        });
    }

    next();
};

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                ok: false,
                msg: 'No authorized'
            });
        }

        const {role, name} = req.user;

        if (!roles.includes(role)) {
            return res.status(401).json({
                ok: false,
                msg: `${name} no authorized`
            });
        }

        next();
    };
}

module.exports = {
    isAdmin,
    hasRole
};