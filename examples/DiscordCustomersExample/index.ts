import {AyanzaClient} from "../../src/lib/AyanzaClient";

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3098

app.use(cors({ origin: true }));

app.get('/', async (req, res) => {
    const api = new AyanzaClient({
        token: '5f69357a5432ad5500703ffeb6f4551d67c1d635e33aa56253dcc5a6f361df07',
        apiTarget: 'http://127.0.0.1:5005/knoweveryone-4e500/europe-west3/api'
    })

    const space = await api.space.create({title: 'Customers database'});
    const widget1 = await api.widget.create({parentId: space.id, title: 'Customer 1'});
    const widget2 = await api.widget.create({parentId: space.id, title: 'Customer 2'});
    const widget3 = await api.widget.create({parentId: space.id, title: 'Customer 3'});

    // try delete
    // const deleted = await api.widget.delete(widget2.id); // how to get response code ?

    res.status(200).send({space, widget1, widget2, widget3});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
