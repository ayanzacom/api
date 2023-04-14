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

// Example
// Create single task
app.get('/createTask', async (req, res) => {
    const api = new AyanzaClient({
        token: process.env.API_TOKEN as string, // Your API token
    })

    // Create required widget properties
    // Task need to have set status in order to be listed in MY WORK
    const widgetProperties: WidgetProperties = {}
    widgetProperties['WORK'] = {}
    widgetProperties['WORK']['status'] = {value: {category: 'Active', id: 'TODO'}}

    const myTask = await api.widget.create('My task title', null, widgetProperties, "This is the content of my task");

    res.status(200).send({myTask});
})

// Example:
// Update OKR metrics with slug or without it
app.get('/metrics', async (req, res) => {
    const api = new AyanzaClient({
        token: process.env.API_TOKEN as string, // Your API token
    })

    const metricId1 = "XXXXX";
    const metricId2 = "XXXX";
    const slug = "revenue"

    // You can create slugs to access metrics by your custom name
    await api.metric.createSlug({id: metricId1, slug: slug})

    // Update single value with a single timestamp
    await api.metric.update({"1681378319636": {[slug]: 100}})

    // Update multiple values with a multiple timestamps
    await api.metric.update({"1681378325171": {[slug]: 100, [metricId2]: 500}, "1681378332754": {[slug]: 160}})

    res.status(200).send({success: true});
})

// Example:
// Create customers space (database) with custom schema properties
// and add widgets (items) to it
app.get('/customers', async (req, res) => {
    const api = new AyanzaClient({
        token: process.env.API_TOKEN as string, // Your API token
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

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
