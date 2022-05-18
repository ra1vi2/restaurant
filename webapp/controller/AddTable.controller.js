sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"../utils/Utility",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, History, Utility, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("zy_ss22_421restaurant.controller.AddTable", {
		onInit: function() {
			this.getView().setModel(new JSONModel({}), "NewTable");
		},
		onSaveNewTablePress: function() {
			var aData = this.getView().getModel("NewTable").getData();
			this.submitData(this.getView().getModel(), aData).then(function(oResponse) {
				MessageToast.show("New Table Added");
				this.onNavBack();
			}.bind(this));
		},

		submitData: function(oModel, aData) {
			return Utility.odataCreate(oModel, "/TableSet", aData);
		},

		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent()
					.getRouter()
					.navTo("MainView", {}, true);
			}
		}
	});

});