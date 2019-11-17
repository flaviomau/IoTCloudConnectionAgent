import { AWS_CLOUD_PROVIDER, AZURE_CLOUD_PROVIDER, GOOGLE_CLOUD_PROVIDER} from './queues';
import * as aws from './providers/aws/aws';
import * as google from './providers/google/google';
import * as azure from './providers/azure/azure';

export const processorInitialisers = {
  [AWS_CLOUD_PROVIDER]: () => job => {        
    aws.process(job.data);        
  },
  [AZURE_CLOUD_PROVIDER]: () => job => {
    azure.process(job.data);
  },
  [GOOGLE_CLOUD_PROVIDER]: () => job => {
    google.process(job.data);
  }
}
