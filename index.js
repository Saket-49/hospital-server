import express from 'express'
import path from 'path'
import fs from 'fs/promises'

const app = express();
const patientFilePath = path.join(import.meta.dirname , "users.json")

// get all the user names
app.get('/',async (req, res)=>{
    let patients = await fs.readFile(patientFilePath, 'utf-8') //buffer
    let patientData = JSON.parse(patients);
    let patientsName = [];
    for(let i =0 ; i< patientData.length; i++){
        patientsName.push(patientData[i].name)
    }
    res.json(patientsName)
})

// get all the user kidney details {count and health}

app.get('/kidneyDetails',async(req, res)=>{
    let patients = await fs.readFile(patientFilePath, 'utf-8') //buffer
    let patientData = JSON.parse(patients);
    let patientsName = [];
    for(let i =0 ; i< patientData.length; i++){
        patientsName.push(patientData[i].kidney)
    }
    res.json(patientsName)
})

// replace the kidneys {count of kidneys to replace}
app.put('/:id',async(req, res)=>{
    const {id} = req.params;
    let count = 2;
    if(count <1 || count >2){
        throw new Error("can't replace the no. of kidneys you provided");
    }
    let patients = await fs.readFile(patientFilePath, 'utf-8'); //buffer
    let patientData = JSON.parse(patients);
    let patient ;
    let newArr=[];
    for(let i = 0 ; i< patientData.length; i++){
        if(patientData[i].id == id){
            patient = patientData[i].name;
            patientData[i].kidney.count = count;
        }
        newArr.push(patientData[i])
    }
    //patient we have found
    await fs.writeFile(patientFilePath, JSON.stringify(newArr), 'utf-8');
    res.send({message:"updated successfully"});

})

// new patient registration

app.post('/', ()=>{
    const details = {
        id: 3,
        name : "smith",
        kidney:{
            count: 1,
            health: "severe"
        }
    }
})


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})