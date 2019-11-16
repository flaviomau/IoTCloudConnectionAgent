import { queues } from './queues';
import { processorInitialisers } from './processor';

Object.entries(queues).forEach(([queueName, queue]) => {
  console.log(`Worker listening to '${queueName}' queue`);
  queue.process(processorInitialisers[queueName]());
});