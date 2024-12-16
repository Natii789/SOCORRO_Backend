import express from 'express';
import cors from 'cors';
import rotaConta from './rotas/rotaConta.js';
import rotaTipoConta from './rotas/rotaTipoConta.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

app.use(express.static('./publico'));

app.use('/conta', rotaConta);
app.use('/tipoConta', rotaTipoConta);

export default app;