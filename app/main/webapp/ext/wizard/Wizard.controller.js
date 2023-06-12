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
			this.getModel("mymodel").setProperty("/productType", "Mobile");
			this.getModel("mymodel").setProperty("/availabilityType", "In Store");
			this.getModel("mymodel").setProperty("/navApiEnabled", true);
			this.getModel("mymodel").setProperty("/productVAT", false);
			this.getModel("mymodel").setProperty("/measurement", "");
			this._setEmptyValue("/productManufacturer");
			this._setEmptyValue("/productDescription");
			this._setEmptyValue("/size");
			this._setEmptyValue("/productPrice");
			this._setEmptyValue("/manufacturingDate");
			this._setEmptyValue("/discountGroup");



			// this.getView().bindElement({
			// 	path: "/DealerHeaders/" + "3a331d16-b5a4-4e30-b716-c57821f39999"
			// });

			// this.getAppComponent().getRouter().getRoute("wizard");
			// var oOwnerComponent = this.getAppComponent();

			// this.oRouter = oOwnerComponent.getRouter();
			// this.oModel = oOwnerComponent.getModel();

			// this.oRouter.getRoute("wizard").attachPatternMatched(this._onProductMatched, this);

		},

		// onInit: function () {
		// 	PageController.prototype.onInit.apply(this,arguments);
		// 	this.getAppComponent().getRouter().getRoute("list");
		// 	var oOwnerComponent = this.getAppComponent();

		// 	this.oRouter = oOwnerComponent.getRouter();
		// 	this.oModel = oOwnerComponent.getModel();

		// 	this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
		// },


		// _onProductMatched: function (oEvent) {
		// 	this._key = oEvent.getParameter("arguments").key || this._key || "0";
		// 	this.getView().bindElement({
		// 		path: "/Books/" + "3a331d16-b5a4-4e30-b716-c57821f39999"
		// 	});
		// },

		setProductType: function (evt) {
			var productType = evt.getSource().getTitle();
			this.getModel("mymodel").setProperty("/productType", productType);
			this.byId("ProductStepChosenType").setText("Chosen product type: " + productType);
			this._wizard.validateStep(this.byId("ProductTypeStep"));
		},

		setProductTypeFromSegmented: function (evt) {
			var productType = evt.getParameters().item.getText();
			this.getModel("mymodel").setProperty("/productType", productType);
			this._wizard.validateStep(this.byId("ProductTypeStep"));
		},

		completionDateChange: function() {
			var cDate = this.byId("completionDate").getValue();

		},

		additionalInfoValidation: function () {
			var fname = this.byId("fname").getValue();
			var lname = this.byId("lname").getValue();

			this.getModel("mymodel").setProperty("/completionDateState", "None");

			// if (isNaN(lname)) {
			// 	this._wizard.setCurrentStep(this.byId("ProductInfoStep"));
			// 	this.getModel("mymodel").setProperty("/lastNameState", "Error");
			// } else {
			// 	this.getModel("mymodel").setProperty("/lastNameState", "None");
			// }

            

			if (fname.length < 6) {
				this._wizard.setCurrentStep(this.byId("ProductInfoStep"));
				this.getModel("mymodel").setProperty("/firstNameState", "Error");
			} else {
				this.getModel("mymodel").setProperty("/firstNameState", "None");
			}

            if (lname.length < 6) {
				this._wizard.setCurrentStep(this.byId("ProductInfoStep"));
				this.getModel("mymodel").setProperty("/lastNameState", "Error");
			} else {
				this.getModel("mymodel").setProperty("/lastNameState", "None");
			}

			if (fname.length < 6 || lname.length < 6) {
				this._wizard.invalidateStep(this.byId("ProductInfoStep"));
			} else {
				this._wizard.validateStep(this.byId("ProductInfoStep"));
			}
		},

		optionalStepActivation: function () {
			MessageToast.show(
				'This event is fired on activate of Step3.'
			);
		},

		optionalStepCompletion: function () {
			MessageToast.show(
				'This event is fired on complete of Step3. You can use it to gather the information, and lock the input data.'
			);
		},

		pricingActivate: function () {
			this.getModel("mymodel").setProperty("/navApiEnabled", true);
		},

		pricingComplete: function () {
			this.getModel("mymodel").setProperty("/navApiEnabled", false);
		},

		scrollFrom4to2: function () {
			this._wizard.goToStep(this.byId("ProductTypeStep"));
		},

		goFrom4to3: function () {
			if (this._wizard.getProgressStep() === this.byId("dealer")) {
				this._wizard.previousStep();
			}
		},

		goFrom4to5: function () {
			if (this._wizard.getProgressStep() === this.byId("dealer")) {
				this._wizard.nextStep();
			}
		},

		wizardCompletedHandler: function () {
			this._oNavContainer.to(this.byId("wizardReviewPage"));
		},

		backToWizardContent: function () {
			this._oNavContainer.backToPage(this._oWizardContentPage.getId());
		},

		editStepOne: function () {
			this._handleNavigationToStep(0);
		},

		editStepTwo: function () {
			this._handleNavigationToStep(1);
		},

		editStepThree: function () {
			this._handleNavigationToStep(2);
		},

		editStepFour: function () {
			this._handleNavigationToStep(3);
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
		}
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
// 			// 	this._wizard.setCurrentStep(this.byId("ProductInfoStep"));
// 			// 	this.getModel("mymodel").setProperty("/lastNameState", "Error");
// 			// } else {
// 			// 	this.getModel("mymodel").setProperty("/lastNameState", "None");
// 			// }

            

// 			if (fname.length < 6) {
// 				this._wizard.setCurrentStep(this.byId("ProductInfoStep"));
// 				this.getModel("mymodel").setProperty("/firstNameState", "Error");
// 			} else {
// 				this.getModel("mymodel").setProperty("/firstNameState", "None");
// 			}

//             if (lname.length < 6) {
// 				this._wizard.setCurrentStep(this.byId("ProductInfoStep"));
// 				this.getModel("mymodel").setProperty("/lastNameState", "Error");
// 			} else {
// 				this.getModel("mymodel").setProperty("/lastNameState", "None");
// 			}

// 			if (fname.length < 6 || lname.length < 6) {
// 				this._wizard.invalidateStep(this.byId("ProductInfoStep"));
// 			} else {
// 				this._wizard.validateStep(this.byId("ProductInfoStep"));
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

 