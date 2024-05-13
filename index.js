import express from "express";
import cors from "cors";
import ProvinceRouter from "express";

const app = express(); 
const port=3001; 

app.use(cors());
app.use(express.json());
//endpoints 
//app.use('/front', express.static('public));
//app.use('/api/event', EventRouter);
app.use('/api/provinces', ProvinceRouter)
//app.use('/api/user', UserRouter);
//app.use(unknownEndpoint);

app.listen(port,()=>{ 
    console.log(`Exampleapplisteningonport${port}`) 
})