# NodeJS-Microservices-Example
NodeJS Microservices Example with: 
- Tchannel - https://github.com/uber/tchannel-node
- Hyperbahn - https://github.com/uber/hyperbahn
- Kue - https://github.com/Automattic/kue
- ExpressJS - https://github.com/expressjs/express

# Quick Start
1. Run Huperbahn - https://github.com/uber/hyperbahn#local-quick-start
2. Run Front Api - ```node front/api.js```
3. Run Users Service (Microservice) - ```node services/users/users.service.js```
4. Run Email Worker (Microservice) - ```node workers/email/email.worker.js```
5. Run ```curl 'http://localhost:3000/register' ```


