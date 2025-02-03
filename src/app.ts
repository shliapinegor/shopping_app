import express, {Application, Request, Response, NextFunction} from 'express'
import 'reflect-metadata'
import {PORT} from "./configApp";
import cartRouter from "./routers/cartRoutes";
import purchaseRoutes from "./routers/purchaseRoutes";
import {initDB} from "./dao/db";

const app:Application = express();

app.use(express.json());

app.use('/cart', cartRouter)

app.use('/purchase', purchaseRoutes)

async function startDB() {await initDB()}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(404).json({
        message: err.message,
        timestamp: new Date().toUTCString(),
        status: 404,
        error: "Not Found",
        path: req.path
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

startDB().catch(console.error)
