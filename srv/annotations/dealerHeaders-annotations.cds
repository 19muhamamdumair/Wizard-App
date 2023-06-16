using DealerService as service from '../dealer-service';

annotate service.DealerHeaders with {
	contractID       @title: 'Contract ID';
	contractType        @title: 'Type';
	status       @title: 'Status';
	statusDate        @title: 'Status Date';
    productCategory @title : 'Products'
}

annotate service.DealerHeaders with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Contract ID',
            Value : contractID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Type',
            Value : contractType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status_ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status Date',
            Value : statusDate,
        },
    ]
);



annotate service.DealerHeaders with @(UI : {HeaderInfo : {
    TypeName       : 'Contract',
    TypeNamePlural : 'Contracts',
    Title          : {Value : contractID},
    Description    : {Value : ID}
}});
/**
* ***
*
* Object Page Facets
*
* ***
*/
annotate service.DealerHeaders with @(UI : {
    Facets                : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Primary Info',
            Target : '@UI.FieldGroup#Primary'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Secondary Info',
            Target : '@UI.FieldGroup#Secondary'
        },
         {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Service Info',
            Target : '@UI.FieldGroup#ServiceAddress'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Dealer Info',
            Target : '@UI.FieldGroup#DealerBasic'
        },
        {
            
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Address',
            Target : '@UI.FieldGroup#DealerAddress',
            ![@UI.PartOfPreview] : false
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Contact',
            Target : '@UI.FieldGroup#DealerContact',
            ![@UI.PartOfPreview] : false
        }
    ],
    FieldGroup #Primary : {Data : [
        { $Type : 'UI.DataField', Label : 'Title',Value : primaryCustomerTitle},
        { $Type : 'UI.DataField', Label : 'First Name',Value : primaryCustomerFirstName},
         { $Type : 'UI.DataField', Label : 'Last Name',Value : primaryCustomerLastName},
        { $Type : 'UI.DataField', Label : 'Email',Value : primaryCustomerEmail}
    ]},
    FieldGroup #Secondary : {Data : [
        { $Type : 'UI.DataField', Label : 'Title',Value : secondaryCustomerTitle},
        { $Type : 'UI.DataField', Label : 'First Name',Value : secondaryCustomerFirstName},
         { $Type : 'UI.DataField', Label : 'Last Name',Value : secondaryCustomerLastName},
        { $Type : 'UI.DataField', Label : 'Email',Value : secondaryCustomerEmail}
    ]},
    FieldGroup #ServiceAddress : {Data : [
        { $Type : 'UI.DataField', Label : 'House No',Value : serviceHouseNumber},
        { $Type : 'UI.DataField', Label : 'Street',Value : serviceStreetName},
        { $Type : 'UI.DataField', Label : 'Unit No',Value : serviceUnitNumber},
        { $Type : 'UI.DataField', Label : 'City',Value : serviceCity},
        { $Type : 'UI.DataField', Label : 'Province',Value : serviceProvince_code},
        { $Type : 'UI.DataField', Label : 'Postal Code',Value : servicePostalCode},
        { $Type : 'UI.DataField', Label : 'Country',Value : serviceCountry_code},
        { $Type : 'UI.DataField', Label : 'Phone',Value : servicePhone},


    ]},
    FieldGroup #DealerBasic : {Data : [
        { $Type : 'UI.DataField', Label : 'Dealer ID',Value : dealerBPID},
        { $Type : 'UI.DataField', Label : 'Comapny Name',Value : a}

    ]},
    FieldGroup #DealerAddress : {Data : [
        { $Type : 'UI.DataField', Label : 'House No',Value : b,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'Street',Value : c,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'City',Value : d,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'Postal Code',Value : e,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'Province/State',Value : f,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'Country',Value : g,![@UI.PartOfPreview] : false}
    ]},

     FieldGroup #DealerContact : {Data : [
        { $Type : 'UI.DataField', Label : 'Title',Value : h,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'Name',Value : i,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'Email',Value : j,![@UI.PartOfPreview] : false},
        { $Type : 'UI.DataField', Label : 'Phone',Value : k,![@UI.PartOfPreview] : false},

    ]},
    


});


