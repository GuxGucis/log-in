
/*
*---------------- SERVER SIDE  ----------------*
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const secretKey = 'your-256-bit-secret';

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Teoricmaente en una comunicacion real con servidor, se checkean aqui las credenciales con DB

  if (username && password) {
    // Las simplificamos con que se pasen, dado que ya hemos comprobado que existen localmente antes de pasar por aqui
    const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    // Esto seria el error que daria el http si no se pudiese acreditar
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ message: 'Welcome to the protected route!', decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
