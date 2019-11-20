# IoT Cloud Connection Agent 
## VanHackathon - Mobodexter
The Iot Cloud Connection Agent is a system developed to improve the reliabilty of IOT Edge Gateway based solutions, including one Cloud Connection Agent (EdgeCloudAgent) that will be in charge of storing, filter, manipulate and publish in the cloud all data received from the IOT itens.

Using this solution you will be allowed to receive telemetry data provided by IOT itens, filter and manipulate this data (if nedeed) and the send it to one of the three IOT Cloud Providers integrated (Google, AWS and Azure).

Even though the internet connection fails, the data will continue been stored inside the Edge Cloud Agent. Once the connection is restored, all data will be automatically sent to your IOT Cloud Provider.

# Architecture
The system is split into three main applications:
* Edge Cloud Agent
* Edge Gateway
* edge-gateway-config

The image below ilustrate the high level architecture:

![alt text](https://res.cloudinary.com/juabrantes/image/upload/v1574213290/architecture_qofasp.png)

The Edge Gateway is responsable for three main operations:
* Receive the data provided from the IOT itens.
* Provide a web application to handle the configurations related to the IOT itens and the IOT Cloud providers.
* Send the data received from the IOT itens to Edge Cloud Agent.

The Edge Cloud Agent is responsable for three main operations:
* Receive data of Edge Gateway.
* Filter/Process the data received from Edge Gateway.
* Send the packages to the IOT Cloud Provider using MQQT Queues.

The edge-gateway-config is a web application developed to handle the configurations related to the IOT Cloud Providers and the IOT itens.

# Technologies

The image blow show to us the technologies used in the system:

![alt text](https://res.cloudinary.com/juabrantes/image/upload/v1574213290/technologies_hh8gqi.png)

The Edge Cloud Agent is build using docker-composer to orchestrate all docker images (NodeJS, Redis and Redis-Commander) used to provide the functionaities. All code is developed using NodeJs. To control the data flux between the Edge Gateway and the IOT Cloud Provider the PUB/SUB pattern is implemented using the Bull library that implement one queue based on Redis database.

The communication betwen the the Edge Cloud Agent and the IOT Cloud Providers are implemented using TLS1.2 and MQQT Queues.

The communication between the Edge Cloud Agent and the Edge Gateway is implemented using Web Socket.

The Edge Gateway is developed to run in a Raspberry Pi, because of this, some decisions was made (avoid use of database and docker) to allow a fast, easy and light deploy.

All code is developed using NodeJS. Two internal server are exposed by the main application. The first one is in charge of the communication between the Edge Gateway and the Edge Cloud Agent usinf Web Socket. The second server is a REST-API server implemented with express.js used by the edge-gateway-config app.

As database, the Edge Gateway use one json file.

# Installation
## Edge Cloud Agent
### Prerequisites: 
    Docker: version 19.03.5 or above
    Docker-compose: version 1.17.1
    Internet connection
### Steps:
* Clone the project available in the Github using the command:
```
git clone https://github.com/flaviomau/IoTCloudConnectionAgent.git
```
* Run the docker-compose inside the edgeCloudAgent folder using the command:
```
cd edgeCloudAgent
docker-compose up
```
## Edge Gateway
### Prerequisites: 
    Nodejs: version 11.10.0 or above
    NPM: version 6.11.2 or above
    Internet connection
### Steps:
* Clone the project available in the Github using the command:
```
git clone https://github.com/flaviomau/IoTCloudConnectionAgent.git
```
* Compile the webapp entering in the edge-gateway-config folder:
```
cd edgeGateway
cd edge-gateway-config
npm build
```
* Return to the root folder and run the command bellow:
```
cd ..
npm start
```
# To be developed
* Unit tests
* use of configuration received by the edge-gateway-config
# Contributions
If you have any doubt or sugestion you can send one email to flaviomau@yahoo.com

May the force be with you! 
