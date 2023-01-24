import {AyanzaClient} from "../../src/lib/AyanzaClient";
import {WidgetProperties} from "../../src/lib/Widget/WidgetApi";

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3098

app.use(cors({ origin: true }));


app.get('/', async (req, res) => {
    const api = new AyanzaClient({
        token: 'cd52df6e1f06186d78480de0279bc3ef5fd344fa5d3528f7f56349036784b97f',
        apiTarget: 'http://127.0.0.1:5005/knoweveryone-4e500/europe-west3/api'
    })

    const team = await api.space.create('Customers', null, true);
    const space = await api.space.create('Customers database', team.id);

    // add property to database
    const newProperty = await api.schema.addProperty(space.schemaId, "number", "My number name");

    // create widget properties
    const widgetProperties: WidgetProperties = {}
    widgetProperties[space.schemaId] = {}
    widgetProperties[space.schemaId][newProperty.id] = {value: 12345}

    const widget1 = await api.widget.create('Customer 1', space.id, widgetProperties);
    const widget2 = await api.widget.create('Customer 2',space.id);
    const widget3 = await api.widget.create('Customer 3',space.id);

    // try delete
    // const deleted = await api.widget.delete(widget2.id); // how to get response code ?

    res.status(200).send({space, widget1, widget2, widget3});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
