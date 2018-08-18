/*var a = 'test'
console.log('a: ', a)

var b = 'data' //hanya bisa dipakai sendiri
let b = 'data1' // b bisa lagi di tempat lain
const b = 'data2'

var array = ['test']

array.push('data1') //nambah data di belakang
array.unshift('data2') //nambah data di depan

console.log('====>', array)

let jsonData = []
let dataFromMysql = ['anu', 'ane', 'ana']

/*dataFromMysql.map(function(data, i){ //bentuk looping
    console.log(data)
})

dataFromMysql.map(function(data, i){ //bentuk looping
    return jsonData.push({
        name: data,
        index: i
    })
})
console.log('jsonData', jsonData)

var parseStringToInteger = '1'
var resultParsing = parseInt(parseStringToInteger)
console.log('resultParsing: ', resultParsing)
console.log(typeof(resultParsing))

var parseIntToString = 1
var resultParseToString = string(parseIntToString)
console.log('resultParsingtoString: ', resultParseToString)
console.log(typeof(resultParseToString))*/


//COBA SERVER

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./connection/index')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', async(req,res)=> {
    let query = 'select * from users'
    db.execute(query, (err, result, fields)=>{
        if(err){
            console.log("err: ", err)
        }else{
            console.log("result: ", result)
        }
    })
    //let runQuery = await
})

app.post('/post', (req, res)=>{
    console.log('req', req.body)
    let username = req.body.username
    let password = req.body.password
    res.send({
        username: username,
        password: password,
        status : 200,
        error: null
    })
})

app.listen(3000, () =>{
    console.log('server run on port 3000') //jalan pada port berapa
})