sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var BlockJobInfoPart1 = BlockBase.extend("main.SharedBlocks.employment.BlockJobInfoPart1", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "main.SharedBlocks.employment.BlockJobInfoPart1",
					type: "XML"
				},
				Expanded: {
					viewName: "main.SharedBlocks.employment.BlockJobInfoPart1",
					type: "XML"
				}
			}
		}
	});

	return BlockJobInfoPart1;
});
