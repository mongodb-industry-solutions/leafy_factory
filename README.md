# leafy_factory

## Prerequisites

* MongoDB Shell ([mongosh](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)) installed (at least version 2.0)

* Node.js installed and up to date

* A Database user with `atlasAdmin` role.

* An Atlas cluster.

## Inside your `Frontend` folder, run:

* To install the dependencies and packages, execute `npm install` in your Terminal.

* Once this is done, execute `npm run build` to create your React App ( and build folder).

* You're all set, now you can run `npm start`, 

* BONUS NOTE: If you encounter an issue when running your app, execute this extra command: `npm uninstall @testing-library/react @testing-library/jest-dom @testing-library/user-event`


## For the project execution: 

* Run `uvicorn app.main:app --reload` in your backend folder

* Run `npm start` in your frontend folder