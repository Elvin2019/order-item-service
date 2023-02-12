import { createApp } from './app';
import sequelize from './sequelize';

const app = createApp();
sequelize.sync();
const port = 4001;
app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port + '/');
});
