import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {
  SimpleSpanProcessor,
  BatchSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { trace, Tracer } from '@opentelemetry/api';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

export function initializeTracing(serviceName: string): Tracer {
  const traceRatio = process.env.NODE_ENV === 'production' ? 0.1 : 1.0;
  const endpoint =
    process.env.JAEGER_END_POINT || 'http://localhost:14268/api/traces';
  console.log('%c⧭', 'color: #ff0000', endpoint);

  const provider = new NodeTracerProvider({
    sampler: new TraceIdRatioBasedSampler(traceRatio),
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  const jaegerExporter = new JaegerExporter({
    endpoint,
  });

  if (process.env.NODE_ENV === 'production') {
    provider.addSpanProcessor(new BatchSpanProcessor(jaegerExporter));
  } else {
    provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
  }

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new PrismaInstrumentation(),
    ],
    tracerProvider: provider,
  });

  provider.register();

  return trace.getTracer(serviceName);
}
