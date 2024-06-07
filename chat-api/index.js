
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

import chatRoutes from './routes/chat.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/chat', chatRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
