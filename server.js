const express  = require("express");
//const { captureRejectionSymbol } = require("node-cron/src/task");
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

        const list = await List.find({dateTime: req.params.dateTime}).lean().exec()

        let text = list[0].text

            
         let num = text.slice(4).toLowerCase().split("").reverse().join("")
        //  console.log(num + "txet")

        //console.log(list)

        res.send(list)


         setTimeout(async function() {

            console.log(num + "txet")

         }, 7*1000)

    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})





app.listen(2360, async () => {
    await connect();
    console.log("server running on port 2360")
})