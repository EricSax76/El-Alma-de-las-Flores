const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'users.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

function loadUsers() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveUsers(users) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    if (users.find(u => u.username === username)) {
        return res.status(400).send('Usuario existente');
    }
    const hash = await bcrypt.hash(password, 10);
    users.push({ username, password: hash });
    saveUsers(users);
    req.session.user = { username };
    res.redirect('/');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).send('Credenciales incorrectas');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Credenciales incorrectas');
    req.session.user = { username };
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

app.get('/session', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user.username });
    } else {
        res.json({ authenticated: false });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
