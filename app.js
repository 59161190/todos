const express =require("express")
const app =express()
const port=3000
app.use(express.json())

// let pokemon=[]
let todo=[]

class Todo{
    constructor(name){
        this.name =name
        this.status = 1  // 1 = uncomp 0 = comp
        this.id = null
    }
}
function countUncom(){
    let n=0
    for(let i = 0 ; i< todo.length ; i++){
        if(todo[i].status === "1"){
            n++
        }
    }
    return n
}
function NewId(n){
    let newid =n+1
    return newid
}
function create(name){
    let list = new Todo(name)
    list.id = NewId(todo.length)
    todo.push(list)
    return true
}
function getList(id){
    return todo[id-1]
}
function updatelist(item){
   todo[item.id-1] = item
    return true
}

app.get('/hello',(req,res)=>{
    res.send({massage : 'Hello'})
})


app.get('/todos',(req,res)=>{
    res.send(todo)
})

app.get('/todos/uncom',(req,res)=>{
    let tmp =[]
    for(let i=0;i < todo.length ; i++){
        if(todo[i].status === 1){
            tmp.push(todo[i])
        }
    }
    res.send(tmp)
})
app.get('/todos/com',(req,res)=>{
    let tmp =[]
    for(let i=0;i < todo.length ; i++){
        if(todo[i].status === 0){
            tmp.push(todo[i])
        }
    }
    res.send(tmp)
})
app.get('/todos/:id',(req,res)=>{
    let id = req.params.id
    let result = todo.filter(todo => todo.id.toString()===id)
    res.send(result[0])
})
app.get('/todos/listitem',(req,res)=>{
    let num = countUncom()
    res.send( num + " item")
})


app.post('/todos',(req,res)=>{
    let name = req.body.name
    let success = create(name)
    if(!success){
        res.send("Cannot Insert list")
    }
    res.status(201).send(todo)
})

app.put('/todosTitle/:id',(req,res)=>{
    let id = req.params.id
    let list = getList(id)
    list.name = req.body.name
    let success = updatelist(list)
    if(!success){
        console.log("Cannot update Title")
    }
    res.status(200).send(todo)
})
app.put('/todosStatus/:id',(req,res)=>{
    let id = req.params.id
    let list = getList(id)
    list.status = req.body.status
    let success = updatelist(list)
    if(!success){
        console.log("Cannot update Status")
    }
    res.status(200).send(todo)
})

app.delete('/todos/:id',(req,res)=>{
    let id = req.params.id
    let result = todo.filter(todo => todo.id.toString() !== id)
    todo = result
    res.status(204).send(result)
})
app.delete('/todos/clear',(req,res)=>{
    let result=[]
    for(let i=0;i < todo.length ; i++){
        if(todo[i].status = 0){
            result.push(todo[i])
        }
    }
    todo = result
    res.status(204).send(todo)
})

app.listen(port,()=>{
    console.log(`Pokemon API Server started at  Port ${port}`)
})