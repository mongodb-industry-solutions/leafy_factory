# LEAFY FACTORY DEMO

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Javascript] (https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20.svg?style=for-the-badge&logo=Apache-Kafka&logoColor=white)
![Mosquitto](https://img.shields.io/badge/mosquitto-%233C5280.svg?style=for-the-badge&logo=eclipsemosquitto&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)



## Prerequisites

* **MongoDB Shell** ([mongosh](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)) installed (at least version 2.0)

* **Node.js** (14 or higher): Installed and up to date

* **Python** (3.12 or higher): The project relies on Python to run the backend and manage dependencies.

* **PostgreSQL** (15.10 or higher): The demo will use a hosted PostgreSQL cluster.

* **MongoDB Atlas Cluster** (8.0.4 or higher): Under `atlasAdmin` role:

* **Apache Kafka** (3.9.0): For the purpose of this internal README, the demo will use a hosted Kafka cluster.

* **Java JDK** (Minimum version 23): Java JDK is essential for running Kafka and its plugins.

* **Git:** Ensure you have Git installed on your development machine. 



## Inside your `frontend/src` folder:

* Create a .env file and add the following lines:

```
MONGO_URI=“your_connection_string”
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
```

* To install the dependencies and packages, execute `npm install` in your Terminal.

* You're all set, now you can run `npm run dev` 


## [Go to the `backend` folder](../backend) 

* To execute the backend dependencies and start your server.


## For the project execution: 

* Once finalized both steps in `frontend`and `backend`, now you can:

* Run `uvicorn app.main:app --reload` in your backend folder.

* Run `npm run dev` in your frontend/src folder.