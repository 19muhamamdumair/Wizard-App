using enbdealer as my from '../db/data-model';

service DealerService {
  
  entity DealerHeaders as projection on my.CustomerContract.Headers;
  annotate DealerHeaders with @odata.draft.enabled;

  entity Items as projection on my.CustomerContract.Items;

  entity Products as projection on my.common.Products;



  // entity CustomerCompletionCertificateHeaders as projection on my.CustomerCompletionCertificate.Headers;


}
