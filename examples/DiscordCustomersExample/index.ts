import {AyanzaClient} from "../../src";
import {WidgetProperties} from "../../src/lib/Widget/WidgetApi";
import * as dotenv from 'dotenv'

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3098
app.use(cors({ origin: true }));

const dotEnvPath = '../../.env'
dotenv.config({ path: dotEnvPath})

app.get('/', async (req, res) => {
    const api = new AyanzaClient({
        token: process.env.API_TOKEN as string,
        apiTarget: 'http://127.0.0.1:5005/knoweveryone-4e500/europe-west4/api'
    })

    const team = await api.space.create('Customers', null, true);
    const space = await api.space.create('Customers database', team.id);

    await api.space.update(space.id, "customers edited", team.id, false)

    // remove default workspace properties
   await api.schema.deleteProperty(space.schemaId, "priority");
   await api.schema.deleteProperty(space.schemaId, "status");
   await api.schema.deleteProperty(space.schemaId, "assignee");
   await api.schema.deleteProperty(space.schemaId, "due_date");
   await api.schema.deleteProperty(space.schemaId, "owner");

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

    const customerWidget1 = await api.widget.create('Customer 1', space.id, widgetProperties, "test content of customer 1");
    const customerWidget2 = await api.widget.create('Customer 2',space.id, widgetProperties, "test content of customer 2");

    // try update
    const updatedCustomerWidget1 = await api.widget.update(customerWidget1.id,"Customer H16", undefined," customer h16" );

    const searchCustomer1 = await api.widget.search([{property: 'title', operator: '==', value:'Customer H16'}]);

    // try delete
    // const deleted = await api.widget.delete(widget2.id);

    res.status(200).send({space, customerWidget1, customerWidget2, updatedCustomerWidget1, searchCustomer1});
})

app.get('/metrics', async (req, res) => {
    const api = new AyanzaClient({
        token: process.env.API_TOKEN as string,
        apiTarget: 'http://127.0.0.1:5005/knoweveryone-4e500/europe-west4/api'
    })

    const slug = "revenue2"
    await api.metric.createSlug({id: "atgFf0J8QCPNj7NcmkQ8", slug: slug})

    await api.metric.update( {id: "atgFf0J8QCPNj7NcmkQ8", value: 9999});
    await api.metric.update( {id: slug, value: 99999});

    await api.metric.updateBulk({"4445": {slug: 6666}, "875441": {"atgFf0J8QCPNj7NcmkQ8": 6666}})

    res.status(200).send({success: true});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
