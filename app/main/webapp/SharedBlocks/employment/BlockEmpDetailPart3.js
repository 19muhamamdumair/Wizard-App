sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockEmpDetailPart3 = BlockBase.extend("main.SharedBlocks.employment.BlockEmpDetailPart3", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "main.SharedBlocks.employment.BlockEmpDetailPart3",
					type: "XML"
				},
				Expanded: {
					viewName: "main.SharedBlocks.employment.BlockEmpDetailPart3",
					type: "XML"
				}
			}
		}
	});
	return BlockEmpDetailPart3;
});
