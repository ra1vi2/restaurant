sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"./BO",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, History, JSONModel, BO, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("zy_ss22_421restaurant.controller.BookingDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zy_ss22_421restaurant.view.BookingDetails
		 */
		onInit: function() {
			this.getView().setModel(new JSONModel(), "this");
			this.getView().getModel("this").setProperty("/IsItemEditable", false);
			this.getOwnerComponent()
				.getRouter()
				.getRoute("BookingDetails")
				.attachPatternMatched(this._onPatternMatchedDetail, this);
		},
		_onPatternMatchedDetail: function() {
			BO.readData(this.getView().getModel(), "/ReservationSet").then(function(oResponse) {
				this.getView().setModel(new JSONModel(oResponse.results), "BookingDetails");
			});
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
		},
		onEditBooking: function() {
			if (this.getView().getModel("this").getProperty("/IsItemEdiBooking")) {
				this.getView().getModel("this").setProperty("/IsItemEdiBooking", false);
			} else {
				this.getView().getModel("this").setProperty("/IsItemEdiBooking", true);
			}
		},
		onDeleteBookingItem: function(oEvent) {
			var oModel = this.getView().getModel("BookingDetails");
			var aData = oModel.getData();
			var index = oEvent.getSource().getParent().getParent().getSelectedIndex();
			aData.splice(index, 1);
			oModel.setData(aData);
		},
		onSaveBooking: function() {
			var oModel = this.getView().getModel("BookingDetails");
			var aData = oModel.getData();
			BO.submitData(this.getView().getModel(), "/ReservationSet", aData)
				.then(function(oResponse) {
					MessageToast.show("Booking Updated");
					this.getView()
						.getModel("this")
						.setProperty("/IsItemEdiBooking", false);
				}.bind(this))
				.fail(function() {
					MessageBox.error("Error, Please Try Again");
				});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf zy_ss22_421restaurant.view.BookingDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf zy_ss22_421restaurant.view.BookingDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf zy_ss22_421restaurant.view.BookingDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});