sap.ui.define([
	"../utils/Utility",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function(Utility, JSONModel, Filter, FilterOperator, Fragment) {
	"use strict";
	return {
		submitData: function(oModel, aData) {
			return Utility.odataCreate(oModel, "/ReservationSet", aData);
		}
	};
});