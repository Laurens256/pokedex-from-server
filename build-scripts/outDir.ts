import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const fileName = path.basename(__filename);

const outDir = './dist/public/';

const isProduction = process.env.NODE_ENV === 'production';

// const outDir = isProduction ? './dist/public/' : './public/';

export { outDir };