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

    // add properties to database
    const supportProp = await api.schema.addProperty(space.schemaId, "string", "Support");
    const roleProp = await api.schema.addProperty(space.schemaId, "string", "Role");
    const teamSizeProp = await api.schema.addProperty(space.schemaId, "string", "Team size");
    const orgSizeProp = await api.schema.addProperty(space.schemaId, "string", "Organization Size");
    const teamAffProp = await api.schema.addProperty(space.schemaId, "string", "Team affiliation");
    const experienceProp = await api.schema.addProperty(space.schemaId, "string", "Wanted to experience first");

    // create widget properties
    const widgetProperties: WidgetProperties = {}
    widgetProperties[space.schemaId] = {}
    widgetProperties[space.schemaId][supportProp.id] = {value: "Work"}
    widgetProperties[space.schemaId][roleProp.id] = {value: "Business owner"}
    widgetProperties[space.schemaId][teamSizeProp.id] = {value: "11-15"}
    widgetProperties[space.schemaId][orgSizeProp.id] = {value: "100-249"}
    widgetProperties[space.schemaId][teamAffProp.id] = {value: "CEO"}
    widgetProperties[space.schemaId][experienceProp.id] = {value: "Set goals"}

    const customerWidget1 = await api.widget.create('Customer 1', space.id, widgetProperties);
    const customerWidget2 = await api.widget.create('Customer 2',space.id, widgetProperties);

    // try delete
    // const deleted = await api.widget.delete(widget2.id); // how to get response code from ofetch ?

    res.status(200).send({space, customerWidget1, customerWidget2});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
