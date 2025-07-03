const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const PORT=process.env.PORT
const {connection}=require("./db")
const { userRouter } = require("./routes/userRouter")
const { noteRouter } = require("./routes/noteRouter")
const swaggerJSdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");
const cors=require("cors")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Learning Swagger",
            version: "1.0.0",
        },
        servers: [
            {
                url: "https://blog-app-lokh.onrender.com",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js"],
};


const swaggerSpec=swaggerJSdoc(options)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use(cors({
    origin: "https://fullstack-blogging.netlify.app/",
    credentials: false
}));
app.use(express.json())
app.use("/user",userRouter)
app.use("/note",noteRouter)

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"home page"})
})


app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server is running on ${PORT} and db is also connected`);
    } catch (error) {
        console.log(error);
    }
})