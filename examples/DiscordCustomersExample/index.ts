import {AyanzaClient} from "../../src/lib/AyanzaClient";

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3098

app.use(cors({ origin: true }));

app.get('/', async (req, res) => {
    const api = new AyanzaClient({
        token: '78594c508b28ac08cda118e5fb80574fac6d3c33f5d21447f5e55244bd15fcb5',
        apiTarget: 'http://127.0.0.1:5005/knoweveryone-4e500/europe-west3/api'
    })

    const space = await api.space.create('Customers database');
    const widget1 = await api.widget.create('Customer 1', space.id);
    const widget2 = await api.widget.create('Customer 2',space.id);
    const widget3 = await api.widget.create('Customer 3',space.id);

    // try delete
    // const deleted = await api.widget.delete(widget2.id); // how to get response code ?

    res.status(200).send({space, widget1, widget2, widget3});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
