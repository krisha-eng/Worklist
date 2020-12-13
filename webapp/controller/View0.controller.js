sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("wl.Worklist.controller.View0", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf wl.Worklist.view.View0
		 */
		onInit: function () {},
		/**
		 *@memberOf wl.Worklist.controller.View0
		 */
		GoToView1: function (oEvent) {
			//This code was generated by the layout editor.
			//var selectProductIDView0 = this.getView().byId("select0").getSelectedItem().getText();
			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Tell the Router to Navigate To Route_PODetail which is linked to V_PODetail view
			oRouter.navTo("Route_View1", {});
		}
	});
});