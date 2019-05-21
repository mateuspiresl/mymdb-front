# MyMDb (ArcTouch Test)

This project is the front end for the [MyMDb application](https://mymdb-front-mpl.herokuapp.com/).

## Architecture​

The presentation layer is located in the `pages` folder, which uses components from the `components` folder.

The domain layer is located in the `actions` and `reducers` folders.

- The actions defines the ways the data can change in response to the use inputs.
- The reducers defines how the data changes and also how it is structured.

The data access layer is located at the `api` folder. There are made all the requests to the API.

## Build​ ​instructions

First, define the back end address at `src/config/constants`.

To build this application for production, run `yarn build`. A folder called `build` will be created. It can be served with the script `bin/www`, so use `node www/bin` to start its server.

## Third-party​ ​libraries​

- `Express`: web application framework.
  - Serves the application.
  - It's not included in the build.
- `React`: UI framework.
  - Application framework.
- `Axios`: HTTP client.
  - Does the requests to the API.
- `Flow`: static type checker library.
  - Avoids bugs and improve the code consistency.
- `Lodash`: utility library.
  - Only the debounce and throttle functions are used.
- `Redux`: Predictable state container.
  - Used for data management.
