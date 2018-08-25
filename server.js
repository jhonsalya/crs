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
const db = require('./connection')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', async(req,res)=> {
    try{
        let queryGetUserDatas = await db.connection.execute('select * from users')
        console.log('queryGetUserDatas: ', queryGetUserDatas[0])
        let listAllUsers = queryGetUserDatas[0]
        let status = []
        await listAllUsers.map(data =>{
            status.push({
                id: data.id,
                username: data.username,
                password: data.password,
                email: data.email
            })
        })


        
        // let object1 = {
        //     name: 'anu',
        //     age: 20
        // }
        // console.log('object1: ', object1)
        // console.log('ambil nama: ', object1.name)

        // let arr2d = [[1,2,3], [4,5,6]]
        // let arr1d = [1,2,3,4]
        // console.log('1Dimensi: ', arr1d[0])
        // console.log('2dimensi: ', arr2d[1][0])

        res.send({
            status: status,
            error: null
        })

    }catch(err){
        //console.log(err)
        res.send({
            status: null,
            error: err.message
        })
    }
    //let runQuery = await
})

app.post('/post', async(req, res)=>{
    try{
        console.log('req: ', req.body)
        let username = req.body.username
        let password = req.body.password
        let name = req.body.name
        console.log('username: ', req.body.username)
        console.log('password: ', req.body.password)
        console.log('name: ', req.body.name)

        let queryInsertUser = `
            insert into users
            (username, password, name, created_at)
            values
            ('${username}','${password}','${name}', now())
        `

        let runQueryInsertUser = await db.connection.execute(queryInsertUser)
        console.log('runQueryInsertUser: ', runQueryInsertUser)
        if(runQueryInsertUser[0].affectedRows === 1){
            let id = runQueryInsertUser[0].insertId
            let result = {}
            let getLastInserted = await db.connection.execute(`select * from users where id = ${id}`)
            console.log('getLastInserted: ', getLastInserted[0])
            let insertedData = getLastInserted[0]
            await insertedData.map(data=>{
                result = {
                    id: data.id,
                    username: data.username,
                    password: data.password,
                    name: data.name
                }
            })
            res.send({
                status:result,
                error: null
            })

        }else{
            res.send({
                status:'bad request 404',
                error: null
            })
        }

    }catch(err){
        console.log(err)
        res.send({
            status: null,
            error: err.message
        })
    }
})

app.listen(3000, () =>{
    console.log('server run on port 3000') //jalan pada port berapa
})