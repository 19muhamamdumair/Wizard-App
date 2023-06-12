sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockEmpDetailPart2 = BlockBase.extend("main.SharedBlocks.employment.BlockEmpDetailPart2", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "main.SharedBlocks.employment.BlockEmpDetailPart2",
					type: "XML"
				},
				Expanded: {
					viewName: "main.SharedBlocks.employment.BlockEmpDetailPart2",
					type: "XML"
				}
			}
		}
	});

	return BlockEmpDetailPart2;
});
