# leafy_factory

## Prerequisites

* MongoDB Shell ([mongosh](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)) installed (at least version 2.0)

* Node.js installed and up to date

* A Database user with `atlasAdmin` role.

* An Atlas cluster.

## Inside your `Frontend` folder, run:


1. Navigate to the `src` folder.

2. Install dependencies by running:
```bash
npm install
```

3. Start the frontend development server with:
````bash
npm run dev

````
4. The frontend will now be accessible at http://localhost:3000 by default, providing a user interface.


* BONUS NOTE: If you encounter an issue when installing dependencies in your project, execute this command instead: `npm install --legacy-peer-deps`


## Summarized project execution: 

* Run `uvicorn app.main:app --reload` in your backend folder

* Run `npm run dev` in your /src (frontend) folder