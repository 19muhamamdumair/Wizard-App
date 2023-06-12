using {
    managed,
    temporal,
    sap.common.CodeList,
    sap,
    cuid,
    Country,
    Currency
} from '@sap/cds/common';

namespace enbdealer;

/**
 * ***
 *
 * Common types
 *
 * ***
 */
context common {
    type FullNameT           : String(80);
    type EmailT              : String(80);
    type FirstNameT          : String(40);
    type LastNameT           : String(40);
    type PhoneT              : String(12);
    type NameT               : String(255);
    type DescT               : String(1000);
    type TextT               : String(255);
    type UnitT               : Integer;
    type NoteT               : String(2000);
    type HouseNumberT        : String(60);
    type StreetNameT         : String(60);
    type UnitNoT             : String(60);
    type CityT               : String(40);
    type PostalCodeT         : String(10);
    type ContactIDT          : String(10);
    type BPIDT               : String(10);
    type TitleT              : String(3);
    type CostT               : Decimal(11, 2);
    type TotalCostT          : Decimal(22, 2);
    type ProductIDT          : String(10);
    type AnnualEBITDAPrcntT  : Decimal(6, 3);
    type PercentT            : Decimal(5, 2);
    type MakeT               : String(255);
    type ModelT              : String(255);
    type ProductCategoryIDT  : String(3);
    type ContractTypeT       : String(100); // fix it will be removed once table is created
    type SerialNoT           : String(100);
    type Currency            : Association to sap.common.Currencies;
    type DocumentTemplateIDT : String(50);

    /**
     * ***
     *
     * Contract Status VH & T
     *
     * ***
     */
    @cds.odata.valuelist
    // @cds.autoexpose: false
    entity DocumentStatus : managed, CodeList {
        key ID              : String(3) @mandatory;
            isDeleted       : Boolean default false;
            displaySequence : Integer default 0;
            criticality     : Integer;
            eSignStatus     : Composition of many ESignStatus
                                  on eSignStatus.documentStatus = $self;
    }

    type DocumentStatusT     : Association to DocumentStatus;

    @cds.odata.valuelist
    // @cds.autoexpose: false
    entity ESignStatus : managed, CodeList {
        key ID              : UUID       @(Core.Computed: true);
            eSignStatusID   : String(50) @mandatory;
            documentStatus  : Association to DocumentStatus;
            isDeleted       : Boolean default false;
            displaySequence : Integer default 0;
    }

    type ESignStatusT        : Association to ESignStatus;

    /**
     * Code list for province
     */
    @cds.odata.valuelist
    entity Province : CodeList, managed {
        key code    : String(2)  @(title: '{i18n>provinceCode}')  @mandatory;
            country : Country;
    }

    type ProvinceT           : Association to common.Province;

    @assert.unique: {effectiveDate: [effectiveDate]}
    @cds.odata.valuelist
    entity AnnualEGICosts : managed {
        key ID            : UUID         @(Core.Computed: true);
        key effectiveDate : Date         @mandatory;
            eGICost       : common.CostT @mandatory;
    }

    @assert.unique: {province: [province]}
    @cds.odata.valuelist
    entity TaxRates : managed {
        key ID       : UUID            @(Core.Computed: true);
            province : ProvinceT       @mandatory;
            taxRate  : Decimal(11, 2)  @mandatory  @Measures.Unit: '%';
    }


    @cds.odata.valuelist
    entity GlobalSettings : managed {
        key ID        : String(15);
            value     : Decimal(11, 2) @mandatory;
            isDeleted : Boolean default false;
    }

    @cds.odata.valuelist
    entity ProductCategories : managed {
        key ID                               : common.ProductCategoryIDT;
            name                             : common.NameT               @mandatory;
            termsOfLeaseYears                : Integer                    @mandatory;
            minUsefulLifeYears               : Integer                    @mandatory;
            eSignContractTemplateID          : common.DocumentTemplateIDT @mandatory;
            eSignContractTemplate_name       : common.NameT;
            eSignWorkCompletionTemplateID    : common.DocumentTemplateIDT @mandatory;
            eSignWorkCompletionTemplate_name : common.NameT;
            isDeleted                        : Boolean default false;
            displaySequence                  : Integer default 0;

            @Core.MediaType  : mediaType
            content                          : LargeBinary;

            @Core.IsMediaType: true
            mediaType                        : String;
            fileName                         : String;
            url                              : String;
            virtual imgFlag                  : Boolean default true;
            productCategoryRate              : Composition of many ProductCategoryRates
                                                   on productCategoryRate.productCategory = $self;
    }

    @cds.odata.valuelist
    @assert.unique: {uniqueIndex: [
        productCategory,
        effectiveDate,
    ]}
    entity ProductCategoryRates : managed {
        key ID                : UUID                             @(Core.Computed: true);
            productCategory   : Association to ProductCategories @mandatory;
            effectiveDate     : Date                             @mandatory;
            annualAPRPrcnt    : PercentT                         @mandatory;
            annualEBITDAPrcnt : AnnualEBITDAPrcntT               @mandatory;
    }

    @cds.odata.valuelist
    // logical delete
    entity Products : managed {
        key ID                           : UUID                             @(Core.Computed: true);
            productID                    : ProductIDT; // @mandatory;
            productCategory              : Association to ProductCategories @mandatory;
            make                         : common.MakeT                     @mandatory;
            model                        : common.ModelT                    @mandatory;
            descr                        : common.DescT                     @mandatory;
            minPrice                     : common.CostT;
            maxPrice                     : common.CostT;
            oMAnnualCost                 : common.CostT;

            @Core.MediaType  : mediaType
            content                      : LargeBinary;

            @Core.IsMediaType: true
            mediaType                    : String;
            fileName                     : String;
            url                          : String;
            virtual imgFlag              : Boolean default true;
            virtual productCategory_name : common.NameT;
            virtual isEnabled            : String(1) default 'T';
            isDeleted                    : Boolean default false;
    }

    @cds.persistence.skip: true
    entity DocumentTemplates {
        key ID           : String;
            name         : String;
            status       : String;
            creatorEmail : String;
            ownerEmail   : String;
    }

    @readonly  @cds.persistence.skip
    entity PDFdoc {
        key ID  : String;
            url : String;
    }
}
