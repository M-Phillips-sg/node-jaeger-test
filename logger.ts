import pino from 'pino';

export const logger = pino({
  name: 'jaeger-demo',
  level: 'debug',
});
