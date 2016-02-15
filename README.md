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
5. Run Posts Service (Microservice) - ```node services/posts/posts.service.js```
6. Run Email Worker (Microservice) - ```node workers/email/email.worker.js```
7. Run ```curl 'http://localhost:3000/register' ```
8. Run ```curl 'http://localhost:3000/users/1/posts' ```
9. Run ```curl 'http://localhost:3000/users/4/posts' ```


