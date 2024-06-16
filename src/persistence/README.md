A two way multilayer persistence.

Feature :

- The application should work offline.
- User should be able to share its work through a seamless synchronization process, this is where [Remote](#remote) comes in.

## Local

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
