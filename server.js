const express  = require("express");
const app = express();
const connect = require("./config/db");
const List = require("./model/list");

app.use(express.json())


app.post("/",  async(req, res)=>{

    try{

        
        let text = req.body.text

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+ " " +time;
        var obj = {
            text, 
            dateTime
        }

        //console.log(obj)

        setTimeout( async function() {
            
            
        const list = await List.create(obj);

        let num = text.slice(4).toLowerCase().split("").reverse().join("")
        console.log(num + "txet")
        res.status(201).send(list)

        }, 1*1000);

    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

app.get("/", async(req, res)=> {
    try{
        const list = await List.find({},{_id:0}).lean().exec();
        res.status(201).send(list)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})


app.get("/list/:dateTime", async (req, res) =>{

    try{

        setTimeout(async function() {

            const list = await List.findOne({dateTime: req.params.dateTime}).lean().exec()

            res.send(list)


        }, 7*1000)

    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})


// app.get('/filter/dateTime', async(req, res) =>{
//     try{
//         const list = List.find().filter(List => List.dateTime === req.params.dateTime)
//         res.status(201).send(list)
//     }
//     catch(e){
//         res.status(500).json({message: e.message})
//     }
// })


// const connect = require("./config/db");
// const list = require("./model/list");

app.listen(2360, async () => {
    await connect();
    console.log("server running on port 2360")
})