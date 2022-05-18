sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function(Controller, JSONModel, Fragment) {
	"use strict";

	return Controller.extend("zy_ss22_421restaurant.controller.View1", {
		onInit: function() {
			this.getView().setModel(new JSONModel(), "this");
			this.getView()
				.getModel("this")
				.setProperty("/IsUser", true);

		},
		onSelectHeaderRadioButton: function(oEvent) {
			var iSelectedIndex = oEvent.getParameter("selectedIndex");
			if (iSelectedIndex === 0) {
				this.getView()
					.getModel("this")
					.setProperty("/IsUser", true);
			}
			if (iSelectedIndex === 1) {
				this.getView()
					.getModel("this")
					.setProperty("/IsUser", false);
			}
		},
		onAddNewTable: function() {
			this.getOwnerComponent().getRouter().navTo("AddTable");
		}
	});
});