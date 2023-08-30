const crypto = require('crypto'); //require crypto
const User = require('./dataSend') // get schema file
const myData = require('./data.json')  // get json file
const db = require('./monoose') //require mongoose file
const net = require('net')
const port = 5000

const names = myData.names;
const cities = myData.cities;

function generateRandomMessage() {
    const name = names[Math.floor(Math.random() * names.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const destination = cities[Math.floor(Math.random() * cities.length)];

    const originalMessage = {
        name: name,
        city: city,
        destination: destination
    }
    const secret_key = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex')

    const sumCheckMessage = {
        ...originalMessage,
        secret_key: secret_key
    }

    return sumCheckMessage
}
const client = new net.Socket()
const server = net.createServer((socket) => {

    client.connect(port, 'localhost', () => {
        setInterval(() => {
            const algorithm = "aes-256-cbc"
            const initVector = crypto.randomBytes(16)
            const Securitykey = crypto.randomBytes(32);

            const messages = [];
            const numberOfMessages = Math.floor(Math.random() * (499 - 49) + 49);

            for (let i = 0; i < numberOfMessages; i++) {
                const message = generateRandomMessage();
                messages.push(message);
            }

            const encryptedMessages = messages.map((msg) => {
                const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
                let encryptedData = cipher.update(JSON.stringify(msg), "utf-8", "hex");
                encryptedData += cipher.final('hex');
                return encryptedData;
            });

            const messageStream = encryptedMessages.join('|');
            client.write(messageStream);
        }, 10000);
    });
})


server.listen(port, '127.0.0.1', () => {
    console.log(`Server listening on port ${port}`);
});

