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
            Label  : 'Basic Info',
            Target : '@UI.FieldGroup#BasicInfo'
        },
    ],
    FieldGroup #BasicInfo : {Data : [
        { $Type : 'UI.DataField', Label : 'ID',Value : ID},
        { $Type : 'UI.DataField', Label : 'Contract ID',Value : contractID}
    ]},
    


});




annotate service.Items with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Product ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Category',
            Value : productCategory_ID,
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
        }
    ]
);