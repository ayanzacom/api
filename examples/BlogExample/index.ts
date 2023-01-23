import { AyanzaClient } from '../../build/main/lib/AyanzaClient';

const express = require('express')
const app = express()
const port = 3098

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/posts', async (req, res) => {
    const api = new AyanzaClient({
        token: 'b46625d7cc15a16dd9ed3cde859e45474110769e0fb522e5a268c61458cf339b',
        apiTarget: 'http://127.0.0.1:5005/knoweveryone-4e500/europe-west3/api'
    })
    const document = await api.space.get('gCzR2hMqJpRT0z5SB0Jr');

    res.send(document);
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
