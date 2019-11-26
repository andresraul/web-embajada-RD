const adminRoleVerificator = async(req, res, next) => {
    if (req.user.role != 'ADMIN_ROLE') {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Necesita permisos de administrador para esta tarea.'
            }
        });
    }
    next();
}

module.exports = {
    adminRoleVerificator
}