const { getUserById } = require('../models/userModel');

async function getProfile(req, res, next) {
    try {
    const userId = req.user.userId; // JWT payload
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        locale: user.locale,
        created_at: user.created_at
    });
    } catch (err) {
    next(err);
    }
}

module.exports = { getProfile };
