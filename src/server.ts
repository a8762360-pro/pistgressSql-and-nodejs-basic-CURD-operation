import app from "./app"
import config from "./config"
import { intDB } from "./db";

const main = async () => {
    intDB();
    app.listen(config.port, () => {
        console.log(`the server is runnimg on port ${config.port}`)
    })
}
main();