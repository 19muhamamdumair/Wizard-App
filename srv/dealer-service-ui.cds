using DealerService as service from './dealer-service';

annotate service.DealerHeaders with {
	contractID       @title: 'Contract ID';
	contractType        @title: 'Type';
	status       @title: 'Status';
	statusDate        @title: 'Status Date';
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
            Target : '@UI.FieldGroup#PrimaryAddress'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Secondary Info',
            Target : '@UI.FieldGroup#SecondaryAddress'
        },
         {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Service Info',
            Target : '@UI.FieldGroup#ServiceAddress'
        },
    ],
    FieldGroup #PrimaryAddress : {Data : [
        { $Type : 'UI.DataField', Label : 'Title',Value : primaryCustomerTitle},
        { $Type : 'UI.DataField', Label : 'First Name',Value : primaryCustomerFirstName},
         { $Type : 'UI.DataField', Label : 'Last Name',Value : primaryCustomerLastName},
        { $Type : 'UI.DataField', Label : 'Email',Value : primaryCustomerEmail}
    ]},
    FieldGroup #SecondaryAddress : {Data : [
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
    


});




annotate service.Items with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Product ID',
            Value : product.productID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Category',
            Value : productCategory_ID,
        },
         {
            $Type : 'UI.DataField',
            Label : 'Make',
            Value : product.make,
        }, {
            $Type : 'UI.DataField',
            Label : 'Model',
            Value : product.model,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Description',
            Value : descr,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : qty,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Serial No',
            Value : SerialNo,
        }
    ]
);