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
