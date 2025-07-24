const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler'); // Si tienes uno
// ...otros requires

const app = express();

// Middlewares previos
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Tus rutas:
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Aquí va el error handler, SIEMPRE al final
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
