import express, {Application, Request, Response, NextFunction} from 'express'
import {PORT} from "./configApp";
import cartRouter from "./routers/cartRoutes";
import paymentRoutes from "./routers/paymentRoutes";

const app:Application = express();

app.use(express.json());

app.use('/cart', cartRouter)

app.use('/payments', paymentRoutes)

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

