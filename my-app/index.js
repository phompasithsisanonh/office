const express =require('express')
const compressions = require('compression')
const path =require('path')
const app =express()
app.use(compressions())
app.use(express.static(path.join(__dirname,"build")))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})
const port = process.env.PORT || 8080
app.listen(port,()=>console.log('start'))