const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { getProfile } = require('../controllers/userController');

const router = express.Router();

// Ruta protegida: solo usuarios autenticados pueden acceder a su perfil
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
