import { AWS_CLOUD_PROVIDER, AZURE_CLOUD_PROVIDER, GOOGLE_CLOUD_PROVIDER} from './queues';

export const processorInitialisers = {
  [AWS_CLOUD_PROVIDER]: () => job => {
    console.log(`Processing ${job}`);
    //return axios.post(job.data.url, job.data.payload);
  },
  [AZURE_CLOUD_PROVIDER]: () => job => {
    console.log(`Processing ${job}`);
    //return axios.post(job.data.url, job.data.payload);
  },
  [GOOGLE_CLOUD_PROVIDER]: () => job => {
    console.log(`Processing ${job}`);
    //return axios.post(job.data.url, job.data.payload);
  }
}