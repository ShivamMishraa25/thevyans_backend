import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import aboutRoutes from './routes/about.route.js';
import postRoute from './routes/post.route.js';
import adminRoutes from './routes/admin.route.js';

const app = new express();
const PORT = 5100;
app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
});

app.use(cors());
app.use(express.json());

aboutRoutes(app);
postRoute(app);
adminRoutes(app);

app.get('/', (req, res) => {
  res.send('The Vyans API is running...');
});

const db = mongoose.connect(process.env.MONGO_URI);
db.then(()=>console.log('database connected successfully!'))
  .catch(err=>console.log('database could not be connected: ', err));