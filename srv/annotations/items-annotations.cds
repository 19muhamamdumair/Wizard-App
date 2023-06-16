using DealerService as service from '../dealer-service';

annotate service.Items with @Common: {SemanticKey: [product.productID]};

annotate service.Items with @(

    UI.LineItem        : {$value: [
        {
            $Type            : 'UI.DataFieldForAnnotation',
            Target           : '@UI.FieldGroup#ProductData',
            Label            : 'Product',
            ![@HTML5.CssDefaults] : {width : '10rem'}
        },
        {
            $Type: 'UI.DataField',
            Label: 'Product',
            Value: product_ID,
            ![@UI.Hidden]
        },
        {
            $Type: 'UI.DataField',
            Label: 'Quantity',
            Value: qty
        },

    ]},
    PresentationVariant: {
        RequestAtLeast: [
            ID,
            product_ID,
            product.productID
        ],
        Visualizations: ['@UI.LineItem']
    }

);


annotate service.Items with {
    product @(Common: {
        Text           : descr,
        TextArrangement: #TextOnly
    })

};

annotate service.Items with @(UI.FieldGroup #ProductData: {Data: [
    {Value: product_ID},
    {Value: product.productID},
]});

annotate service.Products with @(
    UI.QuickViewFacets        : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.FieldGroup#ProductInfo',

    }],
    UI.FieldGroup #ProductInfo: {Data: [
        {
            $Type: 'UI.DataField',
            Label: 'ID',
            Value: ID
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: descr
        },
        {
            $Type: 'UI.DataField',
            Label: 'Category',
            Value: productCategory_ID
        },
        {
            $Type: 'UI.DataField',
            Label: 'Make',
            Value: make
        },
        {
            $Type: 'UI.DataField',
            Label: 'Model',
            Value: url
        }
    ]}
);


annotate service.Products with @(UI: {HeaderInfo: {
    TypeName      : 'Product',
    TypeNamePlural: 'Products',
    Title         : {Value: productID},
    Description   : {Value: descr},
    TypeImageUrl  : url,

}});
