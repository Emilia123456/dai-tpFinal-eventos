import express from "express";
import cors from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js"
import CategoryRouter from "./src/controllers/category-controller.js"
import UserRouter from "./src/controllers/user-controller.js"
import EventRouter from "./src/controllers/event-controller.js"
import EnrollmentRouter from "./src/controllers/enrollment-controller.js"
import EventLocationRouter from "./src/controllers/event-location-controller.js"
//import LoginRouter from "./src/controllers/login-controller.js"

const app = express(); 
const port=3001; 

app.use(cors());
app.use(express.json());
//endpoints 
//app.use('/front', express.static('public));
app.use('/api/event', EventRouter);
app.use('/api/province', ProvinceRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/user', UserRouter);
app.use('/api/event', EnrollmentRouter);
app.use('/api/event-location', EventLocationRouter);


//app.use(unknownEndpoint);

app.listen(port,()=>{ 
    console.log(`Example app listening on port${port}`) 
})