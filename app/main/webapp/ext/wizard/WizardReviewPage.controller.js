sap.ui.define(
    [
        'sap/fe/core/PageController',
	"sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
    ],
    function(PageController,JSONModel,MessageBox) {
        'use strict';

        return PageController.extend('main.ext.wizard.WizardReviewPage', {

            onInit: function () {
                PageController.prototype.onInit.apply(this);
            
                sap.ui.getCore().getModel().getData();
                

                this.model = new JSONModel();
                this.model.setData(sap.ui.getCore().getModel().getData());
            
                this.getView().setModel(this.model,"installerModel");
			


                sap.ui.getCore().getModel("itemsModel").getData().itemsData;
                this.model=new JSONModel();

                this.model.setData(sap.ui.getCore().getModel("itemsModel").getData())
                this.getView().setModel(this.model,"itemsModel");

                this.getView().bindElement({
                    path: "/DealerHeaders" + "(ID=03c51370-7044-4d2b-868f-38012df74cc8)"
                });
    

               


                // var modelData=this.getModel("mymodel").getData()

                // console.log(modelData);
                // this.getAppComponent().getRouter().getRoute("wizard");
                // var oOwnerComponent = this.getAppComponent();
    
                // this.oRouter = oOwnerComponent.getRouter();
                // this.oModel = oOwnerComponent.getModel();
    
                // this.oRouter.getRoute("wizard").attachPatternMatched(this._onProductMatched, this);
    
            },

            editStepOne:function(oEvent){

                // this.routing.navigateToRoute("Wizard");
            //  this.routing.navigateToRoute("Wizard")
            // var fnAfterNavigate = function () {
            //     // Reset wizard to given step
            //     var oWizard = this.byId("wizardReviewPage");
            //     var oStepToEdit = this.byId(sStepId);
            //     oWizard.goToStep(oStepToEdit);
    
            //     var oNavContainer = this.byId("nav-container");
            //     oNavContainer.detachAfterNavigate(fnAfterNavigate);
            // }.bind(this);
    
            // // Nav back to the create page, use callback to set wizard
            // var oNavContainer = this.byId("nn-nav-container");
            // oNavContainer.attachAfterNavigate(fnAfterNavigate);
            // oNavContainer.backToTop();

            var oEventBus = this.getAppComponent().getEventBus();
            oEventBus.publish("editStepTwo",{key: oEntry.ID});

        }
           
        });
    },

);

 