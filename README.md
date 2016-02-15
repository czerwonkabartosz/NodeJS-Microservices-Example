# NodeJS-Microservices-Example
NodeJS Microservices Example with: 
- Tchannel - https://github.com/uber/tchannel-node
- Hyperbahn - https://github.com/uber/hyperbahn
- Kue - https://github.com/Automattic/kue
- ExpressJS - https://github.com/expressjs/express

# Quick Start
1. Change config - config/development.json
2. Run Huperbahn - https://github.com/uber/hyperbahn#local-quick-start
3. Run Front Api - ```node front/api.js```
4. Run Users Service (Microservice) - ```node services/users/users.service.js```
5. Run Email Worker (Microservice) - ```node workers/email/email.worker.js```
6. Run ```curl 'http://localhost:3000/register' ```


