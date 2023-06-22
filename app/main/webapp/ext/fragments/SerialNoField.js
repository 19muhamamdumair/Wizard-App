sap.ui.define(["sap/m/MessageBox",'sap/fe/core/PageController',
'sap/ui/model/json/JSONModel',
"sap/m/MessageToast",
"sap/m/MessageBox"], function(MessageBox,PageController,JSONModel) {
    "use strict";
 
    
    return {

        onInit: function () {
            PageController.prototype.onInit.apply(this);
            console.log(this)
			// this._wizard = this.byId("CreateProductWizard");
			// this._oNavContainer = this.byId("wizardNavContainer");
			// this._oWizardContentPage = this.byId("wizardContentPage");

			// this.model = new JSONModel();
			// this.model.setData({
			// 	firstNameState: "Error",
			// 	lastNameState: "Error"
			// });
			// this.getView().setModel(this.model,"mymodel");
			// sap.ui.getCore().setModel(this.model);
			



			// this.getView().bindElement({
			// 	path: "/DealerHeaders" + "(ID=03c51370-7044-4d2b-868f-38012df74cc8)"
			// });

			// this.getAppComponent().getRouter().getRoute("wizard");
			// var oOwnerComponent = this.getAppComponent();

			// this.oRouter = oOwnerComponent.getRouter();
			// this.oModel = oOwnerComponent.getModel();

			// this.oRouter.getRoute("wizard").attachPatternMatched(this._onProductMatched, this);

		},



        changeSerialNo:async function(oEvent) {  
            console.log(oEvent);

			// sap.ui.getCore().getModel("itemsModel").getData();

			if(sap.ui.getCore().getModel("itemsModel"))
			{
				let itemsModel=sap.ui.getCore().getModel("itemsModel").getData();
				let itemsData=itemsModel.itemsData;
				let dealerId=oEvent.getSource().getBindingContext().getObject().ID

				itemsData.map((item)=>{
					if(item.ID===dealerId)
					{
						Object.assign(item,{"serialNo":oEvent.getSource().getDOMValue()})
					}
				})

			}else{
				let dealerId=oEvent.getSource().getBindingContext().getObject().ID;
				let serialNo=oEvent.getSource().getDOMValue();
				const oModel=this.getModel();

				const oListBinding = oModel.bindList("/Items");
	
		
					let itemsData=[];
					await oListBinding.requestContexts().then((items)=> {
	
						const iCrewEmpCount = items.length;
			
						if(iCrewEmpCount === 0) {
							fnTimesheetEmpCreateResolve();
						} else {
							items.forEach(function (item) {
								const itemData = item.getObject();
								itemsData.push(itemData);
							})
						}
	
	
					})


					itemsData.map((item)=>{
						if(item.ID===dealerId)
						{
							Object.assign(item,{"serialNo":serialNo})
						}
					})
	
					this.model = new JSONModel();
					this.model.setData({
						itemsData
					});
					// this.getView().setModel(this.model,"itemsModel");
					sap.ui.getCore().setModel(this.model,"itemsModel");	
			}

			
			


            // var data = oEvent.getSource().getBindingContext().getObject();

            // Object.assign(data,{"serialNo":oEvent.getSource().getDOMValue()})

            // this.model = new JSONModel();
			// this.model.setData(data);
			// this.getView().setModel(this.model,"serialnoModel");
			// sap.ui.getCore().setModel(this.model,"serialnoModel");

            // console.log(sap.ui.getCore().getModel("serialnoModel").getData())
            
        }
    };
});
