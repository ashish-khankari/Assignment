const crypto = require('crypto'); //require crypto
const User = require('./dataSend') // get schema file
const myData = require('./data.json')  // get json file
const db = require('./monoose') //require mongoose file


const algorithm = "aes-256-cbc"
const initVector = crypto.randomBytes(16)
const message  = "Hi There"
const Securitykey = crypto.randomBytes(32);
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

let encryptedData = cipher.update(message, "utf-8", "hex")
encryptedData+= cipher.final('hex')

const names = myData.names;
const cities = myData.cities;

function generateMessage(){
    const name = Math.floor(Math.random() * names.length)
    const city = Math.floor(Math.random() * cities.length)
    console.log(name)
    console.log(city)
}
console.log("Encrpted Data: " + encryptedData)

