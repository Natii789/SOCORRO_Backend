import express from 'express';
import cors from 'cors';
import rotaConta from './rotas/rotaConta.js';
import rotaTipoConta from './rotas/rotaTipoConta.js';
import dotenv from 'dotenv';

dotenv.config();

const host = '0.0.0.0';
const port = 3000;

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

app.use('/conta', rotaConta);
app.use('/tipoConta', rotaTipoConta);

app.listen(port, host, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
