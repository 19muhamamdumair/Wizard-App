sap.ui.define([
    'sap/fe/core/PageController',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (PageController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return PageController.extend("main.ext.wizard.Wizard", {
		onInit: function () {
            PageController.prototype.onInit.apply(this);
			this._wizard = this.byId("CreateProductWizard");
			this._oNavContainer = this.byId("wizardNavContainer");
			this._oWizardContentPage = this.byId("wizardContentPage");

			this.model = new JSONModel();
			this.model.setData({
				firstNameState: "Error",
				lastNameState: "Error"
			});
			this.getView().setModel(this.model,"mymodel");
			



			this.getView().bindElement({
				path: "/DealerHeaders" + "(ID=03c51370-7044-4d2b-868f-38012df74cc8)"
			});

			// this.getAppComponent().getRouter().getRoute("wizard");
			// var oOwnerComponent = this.getAppComponent();

			// this.oRouter = oOwnerComponent.getRouter();
			// this.oModel = oOwnerComponent.getModel();

			// this.oRouter.getRoute("wizard").attachPatternMatched(this._onProductMatched, this);

		},

		changeDate:function(){
			var completionDate = this.byId("completionDate").getValue();
			this.getModel("mymodel").setProperty("/completionDate",completionDate);
		},


		
		changeSerialNo:function () {
				var sId=this.byId("sNo").getValue();
				this.getModel("mymodel").setProperty("/serialNo",sId);

		},
		changeDate:function () {
			var cDate=this.byId("completionDate").getValue();
			this.getModel("mymodel").setProperty("/completionDate",cDate);

	},
	

		additionalInfoValidation: function () {
			var fname = this.byId("fname").getValue();
			var lname = this.byId("lname").getValue();
			var completionDate = this.byId("completionDate").getValue();

			if(completionDate)
			{
				var d=completionDate.split("/")
				var newDate=new Date(d[2] + '/' + d[1] + '/' + d[0]);
				newDate=newDate.toISOString().slice(0,10);
				this.getModel("mymodel").setProperty("/completionDate",newDate);

				console.log(newDate);
			}


		

			// if (isNaN(lname)) {
			// 	this._wizard.setCurrentStep(this.byId("CustomerStep"));
			// 	this.getModel("mymodel").setProperty("/lastNameState", "Error");
			// } else {
			// 	this.getModel("mymodel").setProperty("/lastNameState", "None");
			// }

            

			// if (fname.length < 6) {
			// 	this._wizard.setCurrentStep(this.byId("CustomerStep"));
			// 	this.getModel("mymodel").setProperty("/firstNameState", "Error");
			// } else {
			// 	this.getModel("mymodel").setProperty("/firstNameState", "None");
			// }

            // if (lname.length < 6) {
			// 	this._wizard.setCurrentStep(this.byId("CustomerStep"));
			// 	this.getModel("mymodel").setProperty("/lastNameState", "Error");
			// } else {
			// 	this.getModel("mymodel").setProperty("/lastNameState", "None");
			// }

			

			this.getModel("mymodel").setProperty("/firstNameValue",fname);
			this.getModel("mymodel").setProperty("/lastNameValue",lname);


			// if (fname.length < 6 || lname.length < 6) {
			// 	this._wizard.invalidateStep(this.byId("CustomerStep"));
			// } else {
			// 	this.getModel("mymodel").setProperty("/firstNameValue",fname);
			// 	this.getModel("mymodel").setProperty("/lastNameValue",lname);
			// 	this._wizard.validateStep(this.byId("CustomerStep"));
			// }
		},

		

		

		_handleNavigationToStep: function (iStepNumber) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this.backToWizardContent();
		},

		_handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._handleNavigationToStep(0);
						this._wizard.discardProgress(this._wizard.getSteps()[0]);
					}
				}.bind(this)
			});
		},

		_setEmptyValue: function (sPath) {
			this.getModel("mymodel").setProperty(sPath, "n/a");
		},

		handleWizardCancel: function () {
			this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
		},

		handleWizardSubmit: function () {
			this._handleMessageBoxOpen("Are you sure you want to submit your report?", "confirm");
		},

		productWeighStateFormatter: function (val) {
			return isNaN(val) ? "Error" : "None";
		},

		discardProgress: function () {
			this._wizard.discardProgress(this.byId("ProductTypeStep"));

			var clearContent = function (content) {
				for (var i = 0; i < content.length; i++) {
					if (content[i].setValue) {
						content[i].setValue("");
					}

					if (content[i].getContent) {
						clearContent(content[i].getContent());
					}
				}
			};

			this.getModel("mymodel").setProperty("/lastNameState", "Error");
			this.getModel("mymodel").setProperty("/firstNameState", "Error");
			clearContent(this._wizard.getSteps());
		},
		wizardCompletedHandler: async function (oView) {
			console.log(oView);

			const oModel=this.getModel();

			var certID;
			
			var data=oView.getSource().getBindingContext().getObject()
			var modelData=this.getModel("mymodel").getData()
			var itemsData = {
                // "ID": data.ID,
                "a": data.a,
                "b": data.b,
                "c": data.c,
                "d": data.d,
                "e": data.e,
                "f": data.f,
                "g": data.g,
                "h": data.h,
                "i": data.i,
                "j": data.j,
                "k": data.k,
                "dealerBPID": data.dealerBPID,
                "primaryCustomerEmail": data.primaryCustomerEmail,
                "primaryCustomerFirstName": data.primaryCustomerFirstName,
                "primaryCustomerLastName": data.primaryCustomerLastName,
                "primaryCustomerTitle": data.primaryCustomerTitle,
				"secondaryCustomerEmail": data.secondaryCustomerEmail,
                "secondaryCustomerFirstName": data.secondaryCustomerFirstName,
                "secondaryCustomerLastName": data.secondaryCustomerLastName,
                "secondaryCustomerTitle": data.secondaryCustomerTitle,
                "serviceCity": data.serviceCity,
                "serviceCountry_code": data.serviceCountry_code,
                "serviceHouseNumber": data.serviceHouseNumber,
                "servicePhone": data.servicePhone,
                "servicePostalCode": data.servicePostalCode,
                "serviceProvince_code": data.serviceProvince_code,
                "serviceStreetName": data.serviceStreetName,
                "serviceUnitNumber": data.serviceUnitNumber,
				"workCompletionDate":modelData.completionDate,
                "installerFirstName":modelData.firstNameValue,
				"installerLastName":modelData.lastNameValue,
            };


            const oBindListHeaders = oModel.bindList("/CustomerCompletionCertificateHeaders");
            var oDataCreateHeaders = oBindListHeaders.create(itemsData);

			

            await oDataCreateHeaders.created().then(function () {
				certID = oDataCreateHeaders.getProperty("ID");
				//call method in cart controller using event bus
				MessageBox.show(" Data Inserted");
				
            }, function (oError) {
                console.error("Error inserting Data in Headers")
            })





			const oListBinding = oModel.bindList("/Items");

			await oListBinding.requestContexts().then((items)=> {

				const iCrewEmpCount = items.length;
	
				if(iCrewEmpCount === 0) {
					fnTimesheetEmpCreateResolve();
				} else {
					items.forEach(function (item) {
						const certificateItem = item.getObject();

						var data={
							"certificate_ID":certID,
							"product_ID":certificateItem.product_ID,
							"descr":certificateItem.descr,
							"SerialNo":modelData.serialNo,
							"qty":certificateItem.qty
						}

						const oBindListItems = oModel.bindList("/CustomerCompletionCertificateItems");
						var oDataCreate = oBindListItems.create(data);
			
						
			
						oDataCreate.created().then(function () {
							//call method in cart controller using event bus
							MessageBox.show(" Data Inserted in Items");
							
						}, function (oError) {
							console.error("Error inserting Data in Items")
						})
		
					})
				}
			}, function (oError) {
                console.error(oError);
                // fnTimesheetEmpCreateReject();
        }).catch(err=>{
			console.log(err)
		});

			
		},


		
	});
});

// sap.ui.define(
//     [
//         'sap/fe/core/PageController',
// 	"sap/ui/model/json/JSONModel",
//     "sap/m/MessageBox"
//     ],
//     function(PageController,JSONModel,MessageBox) {
//         'use strict';

//         return PageController.extend('main.ext.wizard.Wizard', {

//             onInit: function () {
//                             PageController.prototype.onInit.apply(this);
//                 			this._wizard = this.byId("CreateProductWizard");
//                 			this._oNavContainer = this.byId("wizardNavContainer");
//                 			this._oWizardContentPage = this.byId("wizardContentPage");
                
// 			this.model = new JSONModel();


//             this.model.setData({
// 				firstNameState: "Error",
// 				lastNameState: "Error"
// 			});
//             // this.setModel(this.model);
// 			this.getView().setModel(this.model,"mymodel");
// 			this.getModel("mymodel").setProperty("/productType", "Mobile");
// 			this.getModel("mymodel").setProperty("/availabilityType", "In Store");
// 			this.getModel("mymodel").setProperty("/navApiEnabled", true);
// 			this.getModel("mymodel").setProperty("/productVAT", false);
// 			this.getModel("mymodel").setProperty("/measurement", "");
// 			this._setEmptyValue("/productManufacturer");
// 			this._setEmptyValue("/productDescription");
// 			this._setEmptyValue("/size");
// 			this._setEmptyValue("/productPrice");
// 			this._setEmptyValue("/manufacturingDate");
// 			this._setEmptyValue("/discountGroup");

                			
                			
                
//                 		},

            
//             		additionalInfoValidation: function () {
// 			var fname = this.byId("fname").getValue();
// 			var lname = this.byId("lname").getValue();

// 			// if (isNaN(lname)) {
// 			// 	this._wizard.setCurrentStep(this.byId("CustomerStep"));
// 			// 	this.getModel("mymodel").setProperty("/lastNameState", "Error");
// 			// } else {
// 			// 	this.getModel("mymodel").setProperty("/lastNameState", "None");
// 			// }

            

// 			if (fname.length < 6) {
// 				this._wizard.setCurrentStep(this.byId("CustomerStep"));
// 				this.getModel("mymodel").setProperty("/firstNameState", "Error");
// 			} else {
// 				this.getModel("mymodel").setProperty("/firstNameState", "None");
// 			}

//             if (lname.length < 6) {
// 				this._wizard.setCurrentStep(this.byId("CustomerStep"));
// 				this.getModel("mymodel").setProperty("/lastNameState", "Error");
// 			} else {
// 				this.getModel("mymodel").setProperty("/lastNameState", "None");
// 			}

// 			if (fname.length < 6 || lname.length < 6) {
// 				this._wizard.invalidateStep(this.byId("CustomerStep"));
// 			} else {
// 				this._wizard.validateStep(this.byId("CustomerStep"));
// 			}
// 		},
                

					
//             onSelectProduct(oEvent) {
// 				var oCtx=oEvent.getParameter("bindingContext"), productPath = oCtx.getPath(),
// 				product = productPath.split("/").slice(-1).pop();
				

// 			    this.routing.navigateToRoute("detail", {key: oCtx.getProperty("ID")});
//             },
//             onSearch(event) {
//                 var oSource = event.getSource();
//                 const filters = event.getParameter("filters");
//                 var oSearchParameters = event.getParameters() || {};
//                 this.getView().byId("productContainer").getBinding("items").filter(filters).changeParameters({$search:oSearchParameters.search});
//             },
//             onFiltersChanged(event) {
//                 const filters = event.getParameter("filters");
//                 const oSearchParameters = event.getParameter("search");
//                 this.getView().byId("productContainer").getBinding("items").filter(filters).changeParameters({$search: oSearchParameters})
//             },
//             onGoToCheckout(event) {
//                 this.getExtensionAPI().routing.navigateToRoute("CheckoutPage");
//             },
//             onPressAction(oEvent) {
//                 // var oCtx=oEvent.getParameter("bindingContext"), productPath = oCtx.getPath(),
// 				// product = productPath.split("/").slice(-1).pop();
				

// 			    // this.routing.navigateToRoute("detail", {key: oCtx.getProperty("ID")});
//                 var oTable = this.byId("LineItemTablePageCustomActions");
//                 var aSelection = oTable.getSelectedContexts();
//                 // MessageBox.show("You pressed the custom action with " + aSelection.length + " rows selected");
//             },
//         });
//     }
// );

 