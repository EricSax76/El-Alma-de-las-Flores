const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
  const { username, email, password, locale = 'es' } = req.body;
  const userExists = await getUserByEmail(email);
  if (userExists) return res.status(400).json({ error: 'Email ya registrado' });
  const hash = await bcrypt.hash(password, 10);
  const user = await createUser({ username, email, password: hash, locale });
  res.status(201).json({ message: 'Usuario registrado', user });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Credenciales incorrectas' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Credenciales incorrectas' });
  const token = jwt.sign(
    { userId: user.id, role: user.role, locale: user.locale },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ message: 'Login exitoso', token, user: { id: user.id, username: user.username, email: user.email, locale: user.locale } });
}

module.exports = { register, login };
