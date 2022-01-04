import dotEnv from 'dotenv'

dotEnv.config();

export const PORT = parseInt(process.env.PORT) || 5050;
export const NODE_ENV = process.env.NODE_ENV;
