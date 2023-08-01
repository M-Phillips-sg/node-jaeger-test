## Prisma tracing tutorial

Reference code for ["Get Started With Tracing Using OpenTelemetry and Prisma Tracing"](https://prisma.io/blog/tracing-tutorial-prisma-pmkddgq1lm2).

This branch reflects the code at the _end of the tutorial_.

For reference express server used at the _beginning of the tutorial_ go to the [`tracing-begin`](https://github.com/TasinIshmam/tracing-tutorial-prisma/tree/tracing-begin) branch. 

### Installation
1. first run: `npx prisma generate client`
2. Start the server: `npm run dev`.
3. Test out the example endpoint: [http://localhost:4000/users/random](http://localhost:4000/users/random).
4. Install an instance of Jaeger in podman using:
   `podman run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.6`

5. check Jaeger is running by navigating to [http://localhost:16686](http://localhost:16686)
6. refresh the web page above and check the results in Jaeger url if everything is working, there should an entry for express-server under "service"
7. Deploying to OpenShift -->
8. login into your local openshift instance as "kubeadmin"
9. From the operators menu select the "operator hub" and search for Jaeger