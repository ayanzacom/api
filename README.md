# Ayanza API Documentation

This documentation provides a comprehensive guide to the Ayanza API. The API is structured into four main components: Space, Widget, SchemaApi, and AyanzaClient. 

## Ayanza API Client

The AyanzaClient serves as the primary interface for interacting with the Ayanza API. It facilitates access to the Space, Widget, and Schema APIs. 

Here is a sample usage of the AyanzaClient:

```typescript
import { AyanzaClient } from '@ayanza/api';

const client = new AyanzaClient({ token: 'your_token_here' });

// Utilizing the Space API
const space = client.space;

// Utilizing the Widget API
const widget = client.widget;

// Utilizing the Schema API
const schema = client.schema;
```

## Space

The Space API is designed for managing projects, workflows, notebooks, and spaces. 
It offers methods to get, create, update, delete, and search for spaces.

Sample usage:
```typescript
const workspace = await client.space.get('workspace_id');
const newWorkspace = await client.space.create('New Workspace', null);
const updatedWorkspace = await client.space.update('workspace_id', 'Updated Workspace', null, false);
await client.space.delete('workspace_id');
const searchedWorkspaces = await client.space.search([{ property: 'title', operator: '==', value: 'New Workspace' }]);
```

## Widget

The Widget API is designed for managing notes and database items. It offers methods to get, create, update, delete, and search.

Sample usage:
```typescript
// Get a widget
const widget = await client.widget.get('widget_id');

// Create a new widget
const newWidget = await client.widget.create('New Widget', null);

// Update an existing widget
const updatedWidget = await client.widget.update('widget_id', 'Updated Widget');

// Delete a widget
await client.widget.delete('widget_id');

// Search for a widget
const searchedWidgets = await client.widget.search([{ property: 'title', operator: '==', value: 'New Widget' }]);

// Practical use-case: Create a new widget, update it, and then delete it
const tempWidget = await client.widget.create('Temp Widget', null);
await client.widget.update(tempWidget.id, 'Updated Temp Widget');
await client.widget.delete(tempWidget.id);

// Practical use-case: Search for a widget and if it exists, delete it
const widgetsToDelete = await client.widget.search([{ property: 'title', operator: '==', value: 'Old Widget' }]);
if (widgetsToDelete.length > 0) {
    await client.widget.delete(widgetsToDelete[0].id);
}
```

## Schema

The Schema API is designed for managing properties in workflows. It offers methods to get, add properties to, and delete properties.

Sample usage:
```typescript
const schema = await client.schema.get('schema_id');
const newProperty = await client.schema.addProperty('schema_id', 'string', 'New Property');
await client.schema.deleteProperty('schema_id', 'property_id');
```





