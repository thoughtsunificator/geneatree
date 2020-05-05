A bidirectional multilayer persistence.

Feature :

- The application should work offline.
- User should be able to share its work through a seamless synchronization process, this is where [Remote](#remote) comes in.

## Local

These are responsible for the offline persistence of the application state.

### LocalStorage

This is where application settings are stored.

### IndexedDB

Store trees and their data client side.

## Remote

Store trees and their data server side.

The whole point of this persistence is to allow data synchronization between users.

> This persistence is not required for the application to work

## Events

To create a new persistence these are the following events that should be implemented.

### individualNotesAdd

Add a note to an individual
> The persistence layer should send back a unique identifier.

### individualNotesUpdate

Update a note from an individual

### individualNotesRemove

Remote a note from an individual

### individualRemove

Remote an individual

### individualAdd

Add an individual
> The persistence layer should send back a unique identifier.

### individualUpdate

Update an individual

### treeAdd

Add a tree
> The persistence layer should send back a unique identifier.

### treeUpdate

Update a tree

### treeRemove

Remove a tree

## Workflow

For both local and remote persistence the workflow basically is :

1. Persistence listen for UI events
2. UI listen for persistence events
3. Persistence is notified of an UI event
  1. Save / update the subject and send back a new ID (offlineId or networkId)
4. UI is notified of a persistence event
  1. Save / update the subject in-memory (if we're creating a new object we will set either offlineId or networkId dependeing on the type of persistence)
