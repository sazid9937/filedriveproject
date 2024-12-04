import connectDb from "./db/index.js";
import app from "./app.js";

connectDb().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('App is runnimg ')
    })
}
)
.catch((error) => {
        console.log('MONGO DB Err', error)
});
