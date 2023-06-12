using { enbdealer as my } from '../db/dealer-schema';

service DealerService {
  entity DealerHeaders as projection on my.CustomerContract.Headers;
  annotate DealerHeaders with @odata.draft.enabled;
  entity Items as projection on my.CustomerContract.Items;

}
