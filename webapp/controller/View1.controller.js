sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Label",
	"sap/m/Button",
	'sap/m/Token',
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	'sap/m/Tokenizer'
], function (Controller, Fragment, Filter, FilterOperator, Button, Label, Token, JSONModel, MessageToast, Tokenizer) {
	"use strict";
	return Controller.extend("wl.Worklist.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf wl.Worklist.view.View1
		 */
		onInit: function () {
			this.arrFilters = [];
			//this.arrFilters = [...new Set(this.arrFilters.map(JSON.stringify))].map(JSON.parse);

			// Get the Router Info
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			// Validate/Match the Router Details sent from source using oRouter.navTo("Router_Detail", {SelectedItem: selectPO});
			//oRouter.getRoute("Route_View1").attachMatched(this._onRouteFound, this);

			//var myModel = this.getOwnerComponent().getModel();

			var oSelect1 = this.getView().byId("slProductID");
			var oSelect2 = this.getView().byId("slCategory");
			//var oSelect3 = this.getView().byId("slName");

			var sURI = "/api";

			var oModel1 = new sap.ui.model.odata.ODataModel(sURI);
			var oModel2 = new sap.ui.model.odata.ODataModel(sURI);
			//var oModel3 = new sap.ui.model.odata.ODataModel(sURI);

			oModel2.read(
				"/ProductSet", {
					method: "GET",
					success: function (oData2, oResponse) {
						//Create JSON Model
						console.log("Success!");
						console.log(oData2);
						console.log(oResponse);

						var catArr = [];
						for (var i = 0; i < oData2.results.length; i++) {
							catArr.push({
								"category": oData2.results[i].Category
							}); //make sure to push object and not string
						};
						console.log(catArr);

						let filteredList = [...new Set(catArr.map(JSON.stringify))].map(JSON.parse); //works for array of objects
						//let uniqueChars = [...new Set(categories)];      //works only for strings in arrays, not for objects in arrays
						console.log(filteredList);

						var oODataJSONModel = new sap.ui.model.json.JSONModel();
						//filteredList should be Array of Objects...basically in setData the value is Array of Objects
						oODataJSONModel.setData({
							Category: filteredList
						});

						//	var oItemTemplate = new sap.ui.core.Item({
						//		key: "{category}",
						//		text: "{category}"
						//	});

						oSelect2.setModel(oODataJSONModel);
						//	oSelect2.bindAggregation("items", "/Category", oItemTemplate);
						//oSelect2.bindItems("/Category", oItemTemplate);

						var newItem2 = new sap.ui.core.Item({
							key: "all",
							text: "ALL"
						});
						oSelect2.insertItem(newItem2);
						oSelect2.setSelectedIndex(0);
					},

					error: function (oError) {
						console.log("Error!");
					}
				}
			);

			// Option 1 - attach request completed to Model
			oModel1.attachRequestCompleted(function () {
				var newItem1 = new sap.ui.core.Item({
					key: "all",
					text: "ALL"
				});
				oSelect1.insertItem(newItem1);
				oSelect1.setSelectedIndex(0);

			}.bind(this));
			this.getView().byId("slProductID").setModel(oModel1);

			// oModel3.attachRequestCompleted(function () {
			// 	var newItem1 = new sap.ui.core.Item({
			// 		key: "all",
			// 		text: "ALL"
			// 	});
			// 	oSelect3.insertItem(newItem1);
			// 	//oSelect3.setSelectedIndex(0);
			// }.bind(this));
			// oSelect3.setModel(oModel3);

			// oModel2.attachRequestCompleted(function () {
			// 	var newItem2 = new sap.ui.core.Item({
			// 		key: "all",
			// 		text: "ALL"
			// 	});
			// 	oSelect2.insertItem(newItem2);
			// 	oSelect2.setSelectedIndex(0);

			// 	// This is not really required, I was trying Unique values thing in DropDown
			// 	//var data = oModel2.getData()['d']['results'];
			// 	//var data = oModel2.getData();
			// 	//var oSelectModel = this.getView().byId("slCategory").getModel();
			// 	//var oSelectModel = this.getOwnerComponent().getModel().getData();
			// 	//console.log(oSelectModel);
			// 	//var data = oModel2.oData["ProductSet"];
			// 	//var data = this.getView().getModel("modelll").getProperty("/d/results");

			// 	//var x = data.value;
			// 	//	console.log(data);
			// 	// var categories = data.map(function (v, i) {
			// 	// 	console.log(v);
			// 	// 	return v.Category; // assuming state is the attribute
			// 	// });

			// 	// let filteredList = [...new Set(data.map(JSON.stringify))].map(JSON.parse);   //works for array of objects
			// 	// console.log(filteredList);
			// 	// oModel2.setData({"/d/results/ProductSet": filteredList});

			// }.bind(this));
			// this.getView().byId("slCategory").setModel(oModel2);

			//console.log(name);
			/*this.getView().byId("slCategory").bindItems('oModel2>/ProductSet', new sap.ui.core.Item({
				key: 'ProductID',
				text: 'Category'
			}));*/

			/*var myActionSelect = this.byId("slProductID");
			var myActionButton = new Button({
				text: "All",
				press: [myActionSelect, this.onRemoveSelectionPress, this]
			});
			myActionSelect.addButton(myActionButton);*/
		},

		/*onRemoveSelectionPress: function (pressEvent, actionSelect) {
			actionSelect.close().setSelectedKey("");
			var oTable = this.byId("table0");
            var oModel = oTable.getModel();
            var oListBinding = oTable.getBinding("items");
            oListBinding.filter([]);
            oModel.refresh(true);
			},*/
		/**
		 *@memberOf wl.Worklist.controller.View1
		 */

		// Custom Method to bind the elements using the Event Arguments
		_onRouteFound: function (oEvt) {

			/*	var oArgument = oEvt.getParameter("arguments");

			var oView = this.getView();

			oView.bindElement({
				path: "/ProductSet('" + oArgument.SelectedItemfromView0 + "')",
				parameters : {
                expand : "ToSupplier"	// To bind Navigation Property, this is required on receiver end
            }
			});*/
		},

		GoToView2: function (oEvent) {
			//This code was generated by the layout editor.
			//var g1 = g;
			alert("Navigating to Details of " + oEvent.getSource().getBindingContext());
			// Get Property of the Clicked Item. i.e. PO number of the item which was clicked
			var selectProductID = oEvent.getSource().getBindingContext().getProperty("ProductID");
			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Tell the Router to Navigate To Route_PODetail which is linked to V_PODetail view
			oRouter.navTo("Route_View2", {
				SelectedItem: selectProductID
			});
		},
		/**
		 *@memberOf wl.Worklist.controller.View1
		 */
		handleSearch: function (oEvent) {
			//This code was generated by the layout editor.

			var livequery = oEvent.getParameters().newValue;

			// var filters = [];
			// var filter = new sap.ui.model.Filter("ProductID", FilterOperator.Contains, livequery);
			// filters.push(filter);
			// /*var filter1 = new sap.ui.model.Filter("Name", FilterOperator.Contains, livequery);
			// filters.push(filter1);*/
			// var filter2 = new sap.ui.model.Filter("Category", FilterOperator.Contains, livequery);
			// filters.push(filter2);

			var ofilter =
				new sap.ui.model.Filter({
					filters: [
						new Filter({
							path: "ProductID",
							operator: FilterOperator.Contains,
							value1: livequery
						}),
						new Filter({
							path: "Category",
							operator: FilterOperator.Contains,
							value1: livequery
						})
						/*,
						new Filter({
							path: 'Price',
							operator: FilterOperator.Contains,
							value1: livequery
						})*/
					],
					and: false
				});
			//console.log(ofilter);
			var tabledata = this.byId("table0");
			var binding = tabledata.getBinding("items");
			binding.filter(ofilter); //OData model filtering is Case sensitive
		},

		onSelectChange: function (oEvent) {
			// Get View info
			var cat = this.getView().byId("slCategory").getSelectedItem().getText();
			var pid = this.getView().byId("slProductID").getSelectedItem().getText();

			// if(oEvent.getSource().sId == "__xmlview0--slName"){
			// 	var aFilters = oEvent.getSource().getSelectedKeys();
			// }
			// var aFilters = [];
			// var selectedItems = oEvent.getParameters("selectedItems");
			// for (var i = 0; i < selectedItems.length; i++) {
			// 	aFilters.push(new Filter("ProductID", FilterOperator.Contains, selectedItems[i].getText()));
			// }	&& selectedItems.value.getText() == "ALL"

			if (cat == "ALL" && pid == "ALL") {
				var tabledata = this.byId("table0");
				var binding = tabledata.getBinding("items");
				binding.filter([]);
			} else if (cat == "ALL") {
				var ofilter =
					new sap.ui.model.Filter({
						filters: [
							new Filter({
								path: "ProductID",
								operator: FilterOperator.Contains,
								value1: pid
							})
						],
						and: false
					});
				tabledata = this.byId("table0");
				binding = tabledata.getBinding("items");
				binding.filter(ofilter);
			} else if (pid == "ALL") {
				ofilter =
					new sap.ui.model.Filter({
						filters: [
							new Filter({
								path: "Category",
								operator: FilterOperator.Contains,
								value1: cat
							})
						],
						and: false
					});
				tabledata = this.byId("table0");
				binding = tabledata.getBinding("items");
				binding.filter(ofilter);
			} else {
				ofilter =
					new sap.ui.model.Filter({
						filters: [
							new Filter({
								path: "ProductID",
								operator: FilterOperator.Contains,
								value1: pid
							}),
							new Filter({
								path: "Category",
								operator: FilterOperator.Contains,
								value1: cat
							})
							// ,
							// new Filter(aFilters, false)
						],
						and: true
					});
				tabledata = this.byId("table0");
				binding = tabledata.getBinding("items");
				binding.filter(ofilter);
			}

		},

		// onSelectChange: function (oEvent) {
		// 	// Get View info
		// 	var cat = this.getView().byId("slCategory").getSelectedItem().getText();
		// 	//var pid = this.getView().byId("slProductID").getSelectedItem().getText();
		// 	var aFilters = [];
		// 	var arr = [];
		// 	if(oEvent.getSource().sId == "__xmlview0--slInput"){
		// 		arr = oEvent.getSource().getSelectedKeys();
		// 		for (var i = 0; i < arr.length; i++) {
		// 		aFilters.push(new Filter("ProductID", FilterOperator.Contains, arr[i]));
		// 		}
		// 	}
		// 	// var aFilters = [];
		// 	// var selectedItems = oEvent.getParameters("selectedItems");
		// 	// for (var i = 0; i < selectedItems.length; i++) {
		// 	// 	aFilters.push(new Filter("ProductID", FilterOperator.Contains, selectedItems[i].getText()));
		// 	// }	&& selectedItems.value.getText() == "ALL"

		// 	if (cat == "ALL" && arr == []){
		// 		var tabledata = this.byId("table0");
		// 		var binding = tabledata.getBinding("items");
		// 		binding.filter([]);
		// 	}
		// 	else if (cat == "ALL") {
		// 		var ofilter =

		// 					new Filter(aFilters, false)

		// 			;
		// 		 tabledata = this.byId("table0");
		// 		 binding = tabledata.getBinding("items");
		// 		binding.filter(ofilter);
		// 	} 
		// 	else if (arr == []) {

		// 		ofilter =
		// 			new sap.ui.model.Filter({
		// 				filters: [
		// 					new Filter({
		// 						path: "Category",
		// 						operator: FilterOperator.Contains,
		// 						value1: cat
		// 					})
		// 				],
		// 				and: false
		// 			});

		// 		 tabledata = this.byId("table0");
		// 		 binding = tabledata.getBinding("items");
		// 		binding.filter(ofilter);
		// 	}
		// 	else {
		// 		ofilter =
		// 			new sap.ui.model.Filter({
		// 				filters: [
		// 					new Filter({
		// 						path: "Category",
		// 						operator: FilterOperator.Contains,
		// 						value1: cat
		// 					})
		// 					,
		// 					new Filter(aFilters, false)
		// 				],
		// 				and: true
		// 			});
		// 		tabledata = this.byId("table0");
		// 		binding = tabledata.getBinding("items");
		// 		binding.filter(ofilter);
		// 	}

		// },

		// handleSelectionFinish: function (oEvent) {
		// 	var selectedItems = oEvent.getParameter("selectedItems");
		// 	var aFilters = [];
		// 	for (var i = 0; i < selectedItems.length; i++) {
		// 		aFilters.push(new Filter("ProductID", FilterOperator.Contains, selectedItems[i].getText()));
		// 	}
		// 	var tabledata = this.byId("table0");
		// 	var binding = tabledata.getBinding("items");
		// 	var ofilter = new sap.ui.model.Filter(aFilters, false)
		// 	binding.filter(ofilter);

		// },

		onPress: function () {

			var oTable = this.byId("table0");
			var oModel = oTable.getModel();
			var oListBinding = oTable.getBinding("items");
			oListBinding.filter([]);
			oModel.refresh(true);

			var actionSelect = this.byId("slCategory");
			actionSelect.close().setSelectedKey("");

			var actionSelect2 = this.byId("slProductID");
			actionSelect2.close().setSelectedKey("");
			this.byId("slInput").destroyTokens();
		},

		handleValueHelp: function (oEvent) {
			this.byId("slInput").destroyTokens();
			var sInputValue = oEvent.getSource().getValue();
			//var oView = this.getView();
			// create value help dialog
			if (!this._valueHelpDialog) {
				Fragment.load({
					id: "valueHelpDialog",
					name: "wl.Worklist.view.Dialog",
					controller: this
				}).then(function (oValueHelpDialog) {
					this._valueHelpDialog = oValueHelpDialog;
					this.getView().addDependent(this._valueHelpDialog);
					this._openValueHelpDialog(sInputValue);
				}.bind(this));
			} else {
				this._openValueHelpDialog(sInputValue);
			}
		},

		_openValueHelpDialog: function (sInputValue) {
			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new Filter(
				"ProductID",
				FilterOperator.Contains,
				sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},

		_handleValueHelpSearch: function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"ProductID",
				FilterOperator.Contains,
				sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose: function (evt) {
			// Adds the tokens to MultiInput
			var aSelectedItems = evt.getParameter("selectedItems"),
				oMultiInput = this.byId("slInput");

			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					oMultiInput.addToken(new Token({
						text: oItem.getTitle()
					}));
				});
			}

			// Filtering the Table Binding
			var aFilters = [];
			for (var i = 0; i < aSelectedItems.length; i++) {
				aFilters.push(new Filter("ProductID", FilterOperator.Contains, aSelectedItems[i].getTitle())); //here I have to use getTitle instead of getText as used for MultiCombo's event handler
			}
			var tabledata = this.byId("table0");
			var binding = tabledata.getBinding("items");
			var ofilter = new sap.ui.model.Filter(aFilters, false)
			binding.filter(ofilter);

			// Toast Message for items selected
			var aContexts = evt.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				MessageToast.show("You have chosen " + aContexts.map(function (oContext) {
					return oContext.getObject().ProductID;
				}).join(", "));
			} else {
				MessageToast.show("No new item was selected.");
			}
		},

		handleTokenUpdate: function (oEvent) {
			var tokenArray = [];
            
            
            // var Tokentype = oEvent.getParameter('type');	//removed or added
            if(oEvent.getParameter('type') === "added"){
            	var txt = oEvent.getParameter("addedTokens")[0].getText();
	            // oEvent.getSource().addToken(new sap.m.Token({text: txt}));
            }
            else if(oEvent.getParameter('type') === "removed"){
            var TokenIDtoRemove = oEvent.getParameter("removedTokens")[0].sId;
            oEvent.getSource().removeToken(TokenIDtoRemove);
            }
            
            oEvent.getSource().getTokens().map(item => tokenArray.push(new Filter("ProductID", FilterOperator.Contains, item.getText())));
            console.log(tokenArray);
            
            // var Token = oEvent.getParameter("removedTokens")[0].mProperties.text;

			var tabledata = this.byId("table0");
			var binding = tabledata.getBinding("items");
			var ofilter = new sap.ui.model.Filter(tokenArray, false)
			binding.filter(ofilter);
			tokenArray = [];
		}

	});
});
