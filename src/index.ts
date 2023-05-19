import app from "./app";
import { sequelize } from './ormConfig';


const port = process.env.SERVER_PORT || 5000;

(async () => {
    // await sequelize.sync({force: true});
    await sequelize.sync();
})();

app.listen(port, () => {
    console.log(`server running on port : ${port}`);
}).on('error', (e: Error) => console.log(e));