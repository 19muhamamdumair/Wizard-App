using {
  Country,
  managed,
  sap,
  cuid,
  sap.common.CodeList,
} from '@sap/cds/common';

using {enbdealer.common} from './common-schema';

//fix it
namespace enbdealer;


context CustomerContract {

  entity Headers : managed {
    key ID                                    : UUID                      @(Core.Computed: true);
        contractID                            : common.ContactIDT;
        contractType                          : common.ContractTypeT; // default 'Residential Contract'; create table
        dealerBPID                            : common.BPIDT;
        customerBPID                          : common.BPIDT; //for future
        status                                : common.DocumentStatusT;
        statusDate                            : Timestamp; // When the status was last updated.
        virtual statusSince                   : String; // fix it
        virtual statusCriticality             : String default 'Positive';
        remarks                               : common.NoteT;
        primaryCustomerTitle                  : common.TitleT;
        primaryCustomerFirstName              : common.FirstNameT;
        primaryCustomerLastName               : common.LastNameT;
        primaryCustomerEmail                  : common.EmailT;
        secondaryCustomerTitle                : common.TitleT;
        secondaryCustomerFirstName            : common.FirstNameT;
        secondaryCustomerLastName             : common.LastNameT;
        secondaryCustomerEmail                : common.EmailT;
        serviceHouseNumber                    : common.HouseNumberT;
        serviceStreetName                     : common.StreetNameT;
        serviceUnitNumber                     : common.UnitNoT; // fix it,
        serviceCity                           : common.CityT;
        servicePostalCode                     : common.PostalCodeT;
        serviceProvince                       : common.ProvinceT;
        serviceCountry                        : Country; //default 'CA';
        servicePhone                          : common.PhoneT;
        productCategory                       : Association to common.ProductCategories;
        productCategory_name          : common.NameT;
        currency                              : common.Currency; // default 'Canadian Dollar (CAD)'; // fix it
        monthlyCost                           : common.CostT              @Measures.Unit: 'CAD'; //preserve it for ref
        monthlyTaxes                          : common.CostT              @Measures.Unit: 'CAD'; //preserve it for ref
        monthlyTotalCost                      : common.TotalCostT         @Measures.Unit: 'CAD'; //preserve it for ref
        totalCost                             : common.TotalCostT         @Measures.Unit: 'CAD'; // cost total of all selected product cost
        totalOMCost                           : common.TotalCostT         @Measures.Unit: 'CAD'; // OMAnnual total of all selected product cost
        estimatedInstallationDate             : Date;
        //Settings:Contract Level
        inflator                              : common.PercentT           @Measures.Unit: '%'; // bring from global setting
        taxRate                               : common.PercentT           @Measures.Unit: '%'; // copying from province table
        //Settings:Contract Level by Effective Date
        annualEGICost                         : common.CostT              @Measures.Unit: 'CAD'; //copy from EDI table
        annualEGICostEffectiveDate            : Date;
        //Settings:By Product Category
        minUsefulLifeYears                    : Integer                   @Measures.Unit: 'years'; //preserve it for ref
        termsOfLeaseYears                     : Integer                   @Measures.Unit: 'years'; //preserve it for ref
        //Settings:By Prodcut Category and Effective Date
        annualAPRPrnct                        : common.PercentT           @Measures.Unit: '%'; //preserve it for ref
        annualEBITDAPrcnt                     : common.AnnualEBITDAPrcntT @Measures.Unit: '%'; //preserve it for ref
        annualEBITDAAPREffectiveDate          : Date; //preserve it for ref
        //Calculations:Contract Level
        annualDealerCost                      : common.CostT              @Measures.Unit: 'CAD'; //preserve it for ref
        productsText                          : common.NoteT; //preserve it for ref check whether Adobe eSign

        firstYearAnnualBill                   : common.TotalCostT         @Measures.Unit: 'CAD'; //preserve it for ref
        monthlyPriceForCapital                : common.CostT              @Measures.Unit: 'CAD'; //preserve it for ref
        monthlyEBITDAPrcnt                    : common.AnnualEBITDAPrcntT @Measures.Unit: '%'; //preserve it for ref
        monthlyDealerCost                     : common.CostT              @Measures.Unit: 'CAD'; //preserve it for ref
        monthlyEGICost                        : common.CostT              @Measures.Unit: 'CAD'; //preserve it for ref
        //Calculations:By Product Category
        noOfMonthlyPayments                   : Integer; //preserve it for ref
        totalLeaseCost                        : common.CostT              @Measures.Unit: 'CAD'; //preserve it for ref
        leaseValueOfEquipment                 : common.TotalCostT         @Measures.Unit: 'CAD'; //preserve it for ref
        estimatedResidualValue                : common.TotalCostT         @Measures.Unit: 'CAD'; //preserve it for ref
        implicitFinaceCharge                  : common.TotalCostT         @Measures.Unit: 'CAD'; //preserve it for ref
        //Associations
        items                                 : Composition of many Items
                                                  on items.contract = $self;
        eSignDocumentReleaseLog               : Composition of many ESignOutputLog
                                                  on eSignDocumentReleaseLog.contract = $self;
        workCompletionCertifacate             : Association to enbdealer.CustomerCompletionCertificate.Headers;
        // enquiry                       : Association to enbretail.Enquiry.Headers;
        // Dealer Fields
        virtual a                             : String default 'Magil Construction Corporation'; // fix it
        virtual b                             : String default '40'; // fix it
        virtual c                             : String default '50th Street'; // fix it
        virtual d                             : String default 'Stayner'; // fix it
        virtual e                             : String default 'L1V 5V6'; // fix it
        virtual f                             : String default 'Ontario (ON)'; // fix it
        virtual g                             : String default 'Canada (CA)'; // fix it
        virtual h                             : String default 'Mr.'; // fix it
        virtual i                             : String default 'Kael Rass'; // fix it
        virtual j                             : String default 'kael@rass.com'; // fix it
        virtual k                             : String default '4165659898'; // fix it
        virtual l                             : String default '1000000110'; // fix it
        virtual recalculateFlag               : Boolean default false;
        virtual contractStatusName            : common.NameT;
        virtual productCategoryName           : common.FullNameT;
        virtual certificateWorkCompletionDate : common.NameT;
        virtual installerFullName             : common.FullNameT;
        virtual certificateStatusName         : common.NameT;
        virtual workCompletionCertifacateID   : common.ContactIDT;
        virtual certificateStatusCriticality  : String default 'Positive';
        virtual createdDate                   : Date;
        virtual editFlag                      : Boolean default true;
        virtual deleteFlag                    : Boolean default true;
        virtual cancelFlag                    : Boolean default true;
        virtual releaseFlag                   : Boolean default true;
        virtual createCertificateFlag         : Boolean default true;
        virtual displayPDFFlag                : Boolean default true;


  }

  @assert.unique: {uniqueIndex: [
    contract,
    product
  ]}
  entity Items : managed {
    key ID                 : UUID                           @(Core.Computed: true);
        contract           : Association to Headers;
        product            : Association to common.Products @mandatory;
        descr              : common.DescT;
        unitCost           : common.CostT; //equipment and installation cost
        qty                : Integer default 1;
        totalCost          : common.TotalCostT;
        oMAnnualCost       : common.CostT; //preserve it for ref, Multiply it with qty .
        productCategory_ID : common.ProductCategoryIDT;

  //remove
  // itemID             : Integer; //common.itemIDT;
  // isDeleted          : Boolean default false;
  // make               : common.MakeT; //preserve it for ref
  // model              : common.ModelT; //preserve it for ref


  }

  // need more fields fix it
  entity ESignOutputLog : managed {
    key ID                         : UUID @(Core.Computed: true);
        releaseID                  : Integer; // Auto increment
        contract                   : Association to Headers;
        eSignDocumentID            : String; // (find the length of the ID????)
        eSignDocumentName          : String; // (find the length of the ID????)
        channel                    : String default 'Adobe eSign'; //fix it;
        eSignDocumentTemplateID    : common.DocumentTemplateIDT;
        eSignDocumentTemplate_name : common.NameT;
        status                     : common.ESignStatusT;
        eSignAdobeAuditTrail       : Composition of many AdobeESignDocumentAuditTrail
                                       on eSignAdobeAuditTrail.ESignOutputLog = $self;

  }

  //  @cds.persistence.skip: true
  entity AdobeESignDocumentAuditTrail {
    key ID              : String;
        contract        : Association to Headers;
        ESignOutputLog  : Association to ESignOutputLog;
        type            : String;
        description     : String;
        createdDate     : String;
        participantRole : String;
        comment         : String;
  }


}


context CustomerCompletionCertificate {

  entity Headers : managed {
    key ID                         : UUID @(Core.Computed: true);
        certificateID              : common.ContactIDT;
        dealerBPID                 : common.BPIDT;
        customerBPID               : common.BPIDT; //for future
        contract                   : Association to CustomerContract.Headers;
        workCompletionDate         : Date; // or Timestamp;
        installerFirstName         : common.FirstNameT;
        installerLastName          : common.LastNameT;
        status                     : common.DocumentStatusT;
        statusDate                 : Timestamp; // When the status was last updated.
        virtual statusSince        : String; // fix it
        virtual statusCriticality  : String default 'Positive';
        remarks                    : common.NoteT;
        primaryCustomerTitle       : common.TitleT;
        primaryCustomerFirstName   : common.FirstNameT;
        primaryCustomerLastName    : common.LastNameT;
        primaryCustomerEmail       : common.EmailT;
        secondaryCustomerTitle     : common.TitleT;
        secondaryCustomerFirstName : common.FirstNameT;
        secondaryCustomerLastName  : common.LastNameT;
        secondaryCustomerEmail     : common.EmailT;
        serviceHouseNumber         : common.HouseNumberT;
        serviceStreetName          : common.StreetNameT;
        serviceUnitNumber          : common.UnitNoT; // fix it,
        serviceCity                : common.CityT;
        servicePostalCode          : common.PostalCodeT;
        serviceProvince            : common.ProvinceT;
        serviceCountry             : Country; //default 'CA';
        servicePhone               : common.PhoneT;
        productCategory            : Association to common.ProductCategories;
        currency                   : common.Currency; // default 'Canadian Dollar (CAD)'; // fix it
        //Associations
        items                      : Composition of many Items
                                       on items.certificate = $self;
        eSignDocumentReleaseLog    : Composition of many ESignOutputLog
                                       on eSignDocumentReleaseLog.certificate = $self;
        //workCompletionCertifacate  :     // from table work completion certificate
        // Dealer Fields
        virtual a                  : String default 'Magil Construction Corporation'; // fix it
        virtual b                  : String default '40'; // fix it
        virtual c                  : String default '50th Street'; // fix it
        virtual d                  : String default 'Stayner'; // fix it
        virtual e                  : String default 'L1V 5V6'; // fix it
        virtual f                  : String default 'Ontario (ON)'; // fix it
        virtual g                  : String default 'Canada (CA)'; // fix it
        virtual h                  : String default 'Mr.'; // fix it
        virtual i                  : String default 'Kael Rass'; // fix it
        virtual j                  : String default 'kael@rass.com'; // fix it
        virtual k                  : String default '4165659898'; // fix it
        virtual l                  : String default '1000000110'; // fix it

  }

  @assert.unique: {uniqueIndex: [
    certificate,
    product
  ]}
  entity Items : managed {
    key ID          : UUID                           @(Core.Computed: true);
        certificate : Association to Headers;
        product     : Association to common.Products @mandatory;
        descr       : common.DescT;
        SerialNo    : common.SerialNoT;
        qty         : Integer default 1;
  }

  entity ESignOutputLog : managed {
    key ID                      : UUID @(Core.Computed: true);
        releaseID               : Integer; // Auto increment
        certificate             : Association to Headers;
        eSignDocumentID         : String; // (find the length of the ID????)
        channel                 : String default 'Adobe eSign'; //fix it;
        eSignDocumentTemplateID : common.DocumentTemplateIDT;
        status                  : common.DocumentStatusT;
  }

}


// Notes
// 1. At BP, include a flag whether to show all products. If false, then select products that should be available to the dealer ( No More)
// 2. Contract > Product Categories = maintain this table based on the products selected in the contract
// 3. Calc fields should perhaps be preserved so that contract amounts don't change if someone changes the global settings
// 4. ReCalc option should be there to apply the latest global settings for contracts that have not issued yet
// 5. unless contract is not released, user can update the contract. Once contract is released/ in Approval, user can not change the contract.
// 6. Also, if contract is rejected/Expired/Error, user can update the contract.
// 7. By default, Toatl Cost = UnitCost * Qty. User can override this value. There should be button "recalculate", to recauculate the value.
// 8. Once product category is selected during create process, it can not be changed in Edit Mode.
// 9. In Edit Mode, System will display products based on selected product category.
// 10. When status changes, modified by should not be changed.


//1. On Recalculate, setting section fields are retrieved from setting tables and saved in contract header.
//2. On Create of product, no object page is dislayed. Also, Dialog like manage inquires.
//3. Add Item for Delete Flag.
//4. How we will map customer of contract in S4Hana BP.
