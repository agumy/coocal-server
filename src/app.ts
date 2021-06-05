import fastify from "fastify";

const app = fastify({ logger: true });

app.get("/", async (request, reply) => {
  reply.type("application/json").code(200);
  return { hello: "world" };
});

app.listen(8008, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
