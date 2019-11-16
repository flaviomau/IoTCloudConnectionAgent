import { NOTIFY_URL } from './queues';

export const processorInitialisers = {
  [NOTIFY_URL]: () => job => {
    console.log(`Processing ${job}`);
    //return axios.post(job.data.url, job.data.payload);
  }
}