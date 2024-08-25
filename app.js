const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
