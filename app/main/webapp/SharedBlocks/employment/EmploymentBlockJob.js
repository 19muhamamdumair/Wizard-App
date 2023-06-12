sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var EmploymentBlockJob = BlockBase.extend("main.SharedBlocks.employment.EmploymentBlockJob", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "main.SharedBlocks.employment.EmploymentBlockJobCollapsed",
					type: "XML"
				},
				Expanded: {
					viewName: "main.SharedBlocks.employment.EmploymentBlockJobExpanded",
					type: "XML"
				}
			}
		}
	});

	return EmploymentBlockJob;
});
