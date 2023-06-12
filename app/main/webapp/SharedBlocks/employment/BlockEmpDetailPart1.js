sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockEmpDetailPart1 = BlockBase.extend("main.SharedBlocks.employment.BlockEmpDetailPart1", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "main.SharedBlocks.employment.BlockEmpDetailPart1",
					type: "XML"
				},
				Expanded: {
					viewName: "main.SharedBlocks.employment.BlockEmpDetailPart1",
					type: "XML"
				}
			}
		}
	});
	return BlockEmpDetailPart1;
});
