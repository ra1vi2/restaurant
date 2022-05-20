sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"./BO",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, History, JSONModel, BO, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("zy_ss22_421restaurant.controller.TableDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zy_ss22_421restaurant.view.TableDetails
		 */
		onInit: function() {
			this.getView().setModel(new JSONModel(), "this");
			this.getView().getModel("this").setProperty("/IsItemEditable", false);
			this.getOwnerComponent()
				.getRouter()
				.getRoute("TableDetails")
				.attachPatternMatched(this._onPatternMatchedDetail, this);
		},
		_onPatternMatchedDetail: function() {
			BO.readData(this.getView().getModel(), "/TableSet").then(function(oResponse) {
				this.getView().setModel(new JSONModel(oResponse.results), "TableDetails");
			});
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf zy_ss22_421restaurant.view.TableDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf zy_ss22_421restaurant.view.TableDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf zy_ss22_421restaurant.view.TableDetails
		 */
		//	onExit: function() {
		//
		//	}
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent()
					.getRouter()
					.navTo("MainView", {}, true);
			}
		},

		onEditTable: function() {
			if (this.getView().getModel("this").getProperty("/IsItemEditable")) {
				this.getView().getModel("this").setProperty("/IsItemEditable", false);
			} else {
				this.getView().getModel("this").setProperty("/IsItemEditable", true);
			}
		},
		onDeleteTableItem: function(oEvent) {
			var oModel = this.getView().getModel("TableDetails");
			var aData = oModel.getData();
			var index = oEvent.getSource().getParent().getParent().getSelectedIndex();
			aData.splice(index, 1);
			oModel.setData(aData);
		},
		onSaveTable: function() {
			var oModel = this.getView().getModel("TableDetails");
			var aData = oModel.getData();
			BO.submitData(this.getView().getModel(), "/TableSet", aData)
				.then(function(oResponse) {
					MessageToast.show("Table Updated");
					this.getView()
						.getModel("this")
						.setProperty("/IsItemEditable", false);
				}.bind(this))
				.fail(function() {
					MessageBox.error("Error, Please Try Again");
				});
		}

	});

});