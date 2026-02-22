const express = require('express');
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello Nestar API!' });
});

const PORT = process.env.PORT || 300;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));