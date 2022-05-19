sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"./BO",
	"sap/m/MessageToast"
], function(Controller, JSONModel, Fragment, BO, MessageToast) {
	"use strict";

	return Controller.extend("zy_ss22_421restaurant.controller.View1", {
		onInit: function() {
			this.getView().setModel(new JSONModel(), "this");
			this.getView()
				.getModel("this")
				.setProperty("/IsUser", true);
			this.getView()
				.getModel("this")
				.setProperty("/IsBookingFieldVisible", false);
				this.getView().setModel(new JSONModel({}), "booking");

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
		},
		onStartBooking: function() {
			this.getView()
				.getModel("this")
				.setProperty("/IsBookingFieldVisible", true);
			var d = new Date();
			this.byId("todayDate").setText(d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear());
		},
		onConfrimBooking: function() {
			var aData = this.getView().getModel("booking").getData();
			aData.TableCapacity = parseInt(aData.TableCapacity, 10);                         
			BO.submitData(this.getView().getModel(), aData)
				.then(function(oResponse) {
					MessageToast.show("Booking Confirmed");
					this.getView()
						.getModel("this")
						.setProperty("/IsBookingFieldVisible", false);
				}.bind(this))
				.fail(function() {
					sap.m.MessageBox.error("No Table Available, Please select different time");
				});
		}

	});
});