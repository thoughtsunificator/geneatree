# geneatree

Web-based interactive family tree maker.

## Introduction

There are plenty of great genealogy softwares out there (FamilySearch, geneatique etc..), so why the need to create another one?

1. Most of them are not web based, surely not lightweight and most of all not open-source
2. They are not interactive enough
3. They lack support for collaborative work
4. They lack support for descending genealogy (used by professional genealogists for example)

## Features

- No server required (multilayer persistence)
- Works offline
- Lightweight and minimalist UI 
- Interface with existing genealogy softwares through data standards such as [GEDCOM](https://www.gedcom.org/gedcom.html)
- No dependencies

## Getting started

### Run

- ```npm install```
- ```npm start```

## Persistence

- LocalStorage (Client side settings)
- IndexedDB (Client side storage)
- MongoDB (Server side storage) 
> See [geneatree-server](https://github.com/thoughtsunificator/geneatree-server).

For more information see [Persistence](./src/persistence)
