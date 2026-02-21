console.log("script.js loaded");
import { computeLight_Logic } from "./computeLight_Logic.js";
import { computeSearchLight_Logic } from "./computeLight_Logic.js";
import { initEventLog_Logic } from "./eventlog.js";
import { toggleEventLog_Logic } from "./eventlog.js";
import { isPointInEventLog_Logic } from "./eventlog.js";
import { toggleInventory_Logic } from "./inventory.js";
import { addInventoryItem_Logic } from "./inventory.js";
import { useInventoryItem_Logic } from "./inventory.js";
import { updateInventoryDisplay_Logic } from "./inventory.js";
import { initInventory_Logic } from "./inventory.js";
import { scrollEventLog_Logic } from "./eventlog.js";
import { addEvent_Logic } from "./eventlog.js";
import { updateEventLogDisplay_Logic } from "./eventlog.js";
import { showRatingIcon_Logic } from "./settlementScene.js";
import { showInventoryItem_Logic } from "./settlementScene.js";
import { showSettlementScene_Logic } from "./settlementScene.js";
import { findDialogText_Logic } from "./dialog.js";
import { creatNPCDialogButton_Logic } from "./dialog.js";
import { showNPCDialog_Logic } from "./dialog.js";
import { typeText_Logic } from "./dialog.js";
import { closeDialog_Logic } from "./dialog.js";
import { showCompleteDialog_Logic } from "./dialog.js";
import { initializeCarCanvas_Logic } from "./carInLevel1.js";
import { startCarAnimation_Logic } from "./carInLevel1.js";
import { cleanupCarAnimation_Logic } from "./carInLevel1.js";
import { _preloadImage_Logic } from "./carInLevel1.js";



// GameSceneUI将作为全局变量使用，无需import
const levelData = {
    level1: {
        width: 30,
        height: 30,
        tiles: [
            [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 4, 4, 1, 2, 1, 1, 1],
            [1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 2, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 6, 6, 6, 6, 1, 1],
            [1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 6, 1, 1, 1, 1],
            [1, 1, 1, 1, 13, 1, 5, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 5, 1, 7, 1, 1, 1, 1, 6, 1, 1, 1, 1],
            [1, 1, 1, 1, 4, 1, 5, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 5, 1, 7, 1, 6, 1, 1, 6, 1, 1, 1, 1],
            [1, 1, 1, 1, 4, 1, 5, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 5, 1, 7, 1, 6, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 4, 1, 5, 1, 1, 1, 1, 1, 15, 1, 1, 1, 1, 1, 5, 1, 7, 1, 6, 1, 1, 1, 1, 1, 6, 1],
            [1, 1, 1, 1, 4, 1, 1, 1, 1, 2, 1, 1, 15, 1, 1, 2, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 6, 1],
            [4, 4, 4, 4, 4, 7, 7, 7, 4, 4, 4, 4, 15, 4, 4, 4, 4, 7, 7, 7, 7, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [8, 16, 8, 16, 8, 16, 8, 16, 8, 16, 8, 16, 8, 17, 8, 16, 8, 16, 8, 12, 12, 5, 4, 4, 4, 1, 1, 4, 4, 4],
            [16, 16, 16, 16, 9, 16, 16, 16, 16, 16, 16, 16, 16, 9, 16, 16, 16, 16, 16, 12, 12, 5, 4, 4, 4, 2, 1, 4, 4, 4],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 12, 12, 5, 4, 4, 4, 1, 1, 4, 4, 4],
            [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 12, 12, 5, 4, 4, 4, 1, 1, 1, 1, 1],
            [16, 16, 16, 16, 9, 16, 16, 16, 16, 16, 16, 16, 16, 9, 16, 16, 16, 16, 8, 12, 12, 5, 4, 4, 4, 1, 1, 1, 1, 1],
            [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 12, 12, 5, 4, 4, 4, 1, 1, 1, 1, 1],
            [16, 16, 16, 16, 9, 16, 16, 16, 16, 16, 8, 16, 8, 9, 8, 16, 8, 16, 8, 12, 12, 5, 4, 4, 4, 1, 1, 4, 4, 4],
            [16, 16, 16, 16, 16, 16, 17, 17, 17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 1, 4, 4, 4, 1, 1, 4, 4, 4],
            [16, 16, 16, 16, 16, 16, 17, 17, 17, 12, 8, 16, 8, 16, 8, 16, 8, 16, 8, 12, 12, 1, 4, 4, 4, 4, 4, 4, 4, 4],
            [16, 8, 16, 8, 16, 8, 17, 17, 17, 12, 16, 16, 16, 16, 16, 16, 16, 16, 16, 12, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 8, 16, 9, 9, 9, 9, 9, 16, 16, 12, 12, 2, 1, 2, 1, 2, 1, 2, 1, 2],
            [16, 8, 16, 8, 16, 8, 16, 8, 16, 12, 16, 16, 16, 16, 16, 16, 16, 16, 16, 12, 12, 1, 4, 4, 4, 1, 1, 1, 1, 1],
            [16, 16, 16, 16, 16, 16, 16, 16, 8, 12, 8, 16, 9, 9, 9, 9, 9, 16, 16, 12, 12, 2, 4, 4, 4, 1, 1, 1, 1, 1],
            [16, 16, 16, 16, 16, 16, 16, 16, 16, 12, 16, 16, 16, 16, 16, 16, 16, 16, 16, 12, 12, 1, 4, 4, 4, 1, 1, 1, 1, 1]
        ],
    },
    level2: {
        width: 30,
        height: 30,
        tiles: [
            [23, 23, 23, 23, 23, 23, 18, 26, 26, 26, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26, 26, 26, 26],
            [23, 31, 31, 31, 23, 23, 18, 26, 26, 24, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26, 22, 26, 30, 30, 30, 30, 30, 30, 26],
            [23, 31, 23, 23, 23, 23, 22, 26, 26, 22, 22, 26, 22, 22, 22, 22, 26, 26, 26, 26, 26, 22, 26, 30, 30, 30, 30, 30, 30, 26],
            [23, 31, 23, 29, 23, 23, 22, 26, 26, 22, 26, 26, 24, 26, 26, 22, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26, 26, 26, 26],
            [23, 31, 23, 23, 23, 23, 22, 26, 26, 22, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26, 30, 30, 26],
            [23, 31, 23, 29, 23, 23, 22, 26, 26, 22, 22, 22, 22, 26, 26, 22, 30, 30, 22, 22, 22, 22, 26, 26, 22, 26, 26, 30, 30, 26],
            [23, 31, 23, 23, 23, 23, 22, 26, 26, 22, 26, 24, 26, 26, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26],
            [23, 31, 23, 29, 23, 23, 22, 26, 26, 22, 26, 26, 26, 26, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26],
            [23, 31, 23, 23, 23, 23, 22, 26, 26, 22, 22, 22, 22, 22, 22, 26, 22, 22, 22, 22, 26, 26, 22, 22, 22, 22, 22, 22, 22, 22],
            [23, 31, 23, 23, 23, 23, 18, 26, 26, 26, 26, 26, 26, 24, 26, 26, 26, 26, 26, 26, 26, 26, 22, 32, 32, 32, 32, 21, 21, 21],
            [23, 31, 23, 23, 23, 23, 18, 26, 26, 26, 26, 26, 24, 26, 26, 26, 26, 26, 24, 26, 26, 26, 30, 32, 32, 32, 32, 32, 32, 21],
            [23, 23, 23, 22, 23, 23, 22, 26, 26, 22, 22, 20, 22, 22, 20, 22, 26, 20, 22, 22, 26, 26, 30, 32, 32, 32, 21, 32, 21, 21],
            [23, 23, 23, 22, 23, 23, 22, 26, 26, 20, 19, 26, 26, 26, 26, 26, 26, 26, 19, 20, 26, 24, 22, 32, 21, 32, 32, 32, 32, 21],
            [23, 23, 23, 22, 22, 22, 22, 26, 19, 22, 26, 26, 26, 27, 26, 26, 28, 26, 26, 22, 19, 26, 22, 32, 32, 32, 21, 32, 32, 21],
            [23, 23, 23, 23, 23, 26, 26, 26, 26, 26, 26, 27, 26, 30, 30, 30, 26, 28, 26, 26, 26, 26, 22, 32, 32, 21, 32, 21, 21, 21],
            [23, 23, 23, 22, 22, 22, 22, 26, 19, 22, 26, 26, 27, 26, 26, 26, 26, 26, 26, 22, 19, 26, 22, 32, 32, 32, 32, 32, 32, 21],
            [23, 23, 23, 22, 23, 23, 22, 26, 26, 20, 19, 26, 26, 26, 26, 26, 26, 26, 19, 20, 26, 26, 22, 32, 32, 32, 32, 32, 32, 21],
            [23, 23, 23, 22, 23, 23, 22, 26, 26, 22, 22, 20, 22, 22, 20, 22, 22, 20, 22, 22, 26, 26, 22, 22, 22, 26, 26, 22, 22, 22],
            [23, 31, 23, 23, 23, 23, 18, 26, 26, 26, 26, 26, 26, 24, 26, 26, 26, 26, 26, 26, 24, 26, 22, 26, 26, 24, 26, 26, 26, 22],
            [23, 31, 23, 23, 23, 23, 18, 26, 26, 26, 26, 30, 30, 26, 26, 26, 26, 24, 26, 26, 26, 26, 24, 26, 26, 26, 26, 26, 26, 22],
            [23, 31, 23, 23, 23, 23, 22, 18, 18, 22, 22, 22, 26, 26, 22, 22, 22, 22, 22, 22, 26, 26, 26, 26, 26, 26, 26, 26, 24, 22],
            [23, 31, 23, 29, 23, 23, 22, 26, 26, 26, 26, 26, 26, 26, 26, 25, 26, 26, 26, 22, 26, 24, 26, 24, 26, 30, 30, 26, 26, 22],
            [23, 31, 23, 23, 23, 23, 22, 26, 26, 26, 26, 26, 26, 26, 26, 26, 25, 25, 26, 24, 26, 26, 26, 26, 26, 30, 30, 26, 26, 22],
            [23, 31, 23, 29, 23, 23, 22, 26, 26, 26, 25, 25, 25, 26, 26, 26, 26, 25, 26, 22, 26, 26, 26, 26, 26, 30, 30, 26, 26, 22],
            [23, 31, 23, 23, 23, 23, 22, 26, 26, 26, 26, 26, 26, 25, 26, 25, 26, 26, 26, 22, 26, 26, 26, 26, 26, 26, 26, 26, 26, 22],
            [23, 31, 23, 29, 23, 23, 22, 26, 25, 26, 30, 30, 30, 25, 26, 26, 25, 25, 26, 22, 24, 26, 26, 26, 24, 26, 26, 26, 24, 22],
            [23, 31, 23, 23, 23, 23, 22, 26, 26, 26, 30, 30, 30, 26, 26, 26, 26, 26, 26, 22, 26, 26, 24, 26, 26, 26, 26, 26, 26, 22],
            [23, 31, 31, 31, 23, 23, 18, 26, 26, 26, 26, 26, 26, 25, 26, 26, 26, 26, 26, 22, 26, 26, 26, 26, 26, 24, 26, 26, 24, 22],
            [23, 23, 23, 23, 23, 23, 18, 26, 26, 26, 26, 25, 26, 26, 26, 26, 26, 26, 26, 22, 24, 26, 26, 24, 26, 26, 26, 26, 26, 22],
            [23, 23, 23, 23, 23, 23, 22, 18, 18, 22, 22, 22, 22, 18, 18, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22]
        ],
    },
    level3: {
        width: 30,
        height: 30,
        tiles: [
            [44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44],
            [44, 39, 39, 39, 46, 46, 46, 46, 46, 46, 42, 46, 35, 35, 35, 39, 39, 46, 46, 42, 46, 46, 46, 46, 46, 46, 46, 46, 46, 44],
            [44, 39, 39, 39, 46, 46, 45, 45, 46, 46, 46, 46, 46, 46, 46, 39, 39, 46, 46, 46, 46, 45, 45, 46, 46, 46, 45, 45, 46, 44],
            [44, 46, 45, 46, 45, 46, 46, 46, 46, 46, 42, 46, 37, 37, 46, 46, 46, 46, 46, 42, 46, 46, 45, 46, 46, 46, 46, 46, 46, 44],
            [46, 46, 46, 46, 46, 46, 39, 39, 39, 46, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 46, 46, 45, 46, 46, 46, 46, 46, 46, 46],
            [46, 46, 46, 46, 46, 46, 39, 39, 39, 46, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 46, 46, 46, 46, 45, 46, 45, 46, 46, 46],
            [45, 45, 45, 45, 46, 46, 45, 45, 45, 45, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 46, 46, 46, 45, 46, 46, 46, 33, 46, 46],
            [46, 46, 46, 46, 46, 46, 46, 39, 46, 46, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 46, 45, 45, 46, 46, 45, 46, 33, 46, 46],
            [46, 46, 46, 46, 46, 46, 46, 39, 46, 46, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 46, 46, 46, 46, 46, 46, 33, 46, 46, 46],
            [42, 42, 39, 39, 42, 42, 42, 42, 42, 41, 46, 41, 46, 41, 43, 43, 40, 46, 40, 46, 40, 42, 42, 42, 42, 42, 33, 46, 42, 42],
            [43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 34, 43, 43, 43, 43],
            [46, 46, 46, 33, 33, 33, 33, 33, 33, 33, 33, 46, 46, 42, 43, 43, 42, 46, 46, 46, 46, 33, 33, 33, 33, 46, 46, 33, 46, 46],
            [46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 42, 43, 43, 42, 46, 46, 46, 46, 46, 46, 46, 46, 46, 40, 46, 46, 46],
            [46, 46, 46, 46, 37, 37, 37, 46, 37, 37, 37, 37, 37, 42, 43, 43, 42, 37, 46, 37, 37, 37, 46, 36, 39, 39, 39, 46, 46, 46],
            [46, 46, 46, 41, 46, 46, 46, 38, 46, 46, 46, 46, 46, 46, 43, 43, 46, 46, 46, 46, 46, 46, 36, 36, 39, 39, 39, 46, 46, 46],
            [46, 46, 42, 46, 37, 46, 37, 37, 37, 37, 37, 46, 46, 42, 43, 43, 42, 46, 37, 37, 37, 37, 36, 46, 39, 39, 39, 42, 46, 46],
            [46, 46, 42, 46, 46, 46, 46, 46, 45, 46, 46, 46, 46, 42, 43, 43, 42, 38, 46, 46, 46, 46, 46, 46, 46, 46, 40, 42, 46, 46],
            [45, 46, 42, 46, 37, 37, 37, 46, 37, 46, 37, 37, 37, 42, 43, 43, 42, 37, 37, 46, 37, 46, 37, 37, 37, 46, 46, 42, 46, 45],
            [46, 46, 42, 41, 46, 46, 46, 46, 46, 46, 38, 46, 46, 46, 43, 43, 46, 46, 46, 46, 36, 46, 46, 46, 46, 46, 33, 42, 46, 46],
            [46, 46, 42, 46, 37, 37, 37, 37, 37, 37, 37, 46, 46, 42, 43, 43, 42, 37, 37, 37, 37, 46, 37, 37, 37, 33, 33, 42, 46, 46],
            [46, 46, 42, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 42, 43, 43, 42, 46, 46, 46, 46, 46, 46, 46, 46, 46, 40, 42, 46, 46],
            [46, 46, 42, 46, 46, 37, 46, 37, 37, 37, 37, 37, 37, 42, 43, 43, 42, 37, 37, 37, 37, 37, 37, 46, 46, 33, 46, 42, 46, 46],
            [45, 46, 42, 41, 46, 46, 46, 46, 46, 46, 38, 46, 46, 46, 43, 43, 46, 46, 46, 46, 46, 46, 46, 46, 37, 46, 46, 42, 45, 46],
            [46, 46, 42, 46, 46, 37, 37, 37, 46, 37, 46, 46, 46, 42, 43, 43, 42, 37, 37, 37, 37, 37, 37, 37, 46, 46, 46, 42, 46, 46],
            [46, 46, 42, 46, 46, 46, 46, 46, 46, 36, 46, 46, 46, 42, 43, 43, 42, 46, 46, 46, 46, 46, 46, 46, 37, 46, 40, 42, 46, 46],
            [46, 46, 42, 46, 46, 37, 37, 37, 37, 37, 37, 46, 46, 42, 43, 43, 42, 37, 46, 37, 46, 37, 37, 46, 46, 46, 46, 42, 46, 46],
            [46, 46, 42, 41, 46, 46, 46, 46, 46, 46, 46, 46, 39, 39, 43, 43, 46, 46, 46, 46, 46, 46, 46, 37, 46, 46, 46, 42, 46, 46],
            [46, 46, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 46, 46, 43, 43, 46, 46, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 46, 46],
            [46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 43, 43, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46],
            [46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 43, 43, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46]
        ],
    },
    level4: {
        width: 30,
        height: 30,
        tiles: [
            [49, 49, 49, 49, 49, 49, 54, 54, 54, 54, 49, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49],
            [49, 49, 49, 47, 49, 49, 54, 54, 54, 54, 49, 47, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49],
            [49, 49, 49, 47, 49, 49, 54, 54, 54, 54, 49, 47, 54, 54, 54, 49, 54, 54, 54, 47, 54, 54, 54, 49, 54, 54, 54, 47, 49, 49],
            [49, 49, 49, 53, 49, 49, 49, 49, 49, 49, 49, 53, 54, 54, 54, 49, 54, 54, 54, 53, 54, 54, 54, 49, 54, 54, 54, 53, 49, 49],
            [49, 49, 49, 47, 49, 49, 54, 54, 54, 54, 49, 47, 54, 54, 54, 49, 54, 54, 54, 47, 54, 54, 54, 49, 54, 54, 54, 47, 49, 49],
            [49, 49, 49, 49, 49, 49, 54, 54, 54, 54, 49, 47, 49, 48, 49, 49, 49, 48, 49, 49, 49, 48, 49, 49, 49, 48, 49, 47, 49, 49],
            [49, 49, 49, 47, 49, 49, 54, 54, 54, 54, 49, 47, 54, 54, 54, 49, 54, 54, 54, 47, 54, 54, 54, 49, 54, 54, 54, 47, 49, 49],
            [49, 49, 49, 47, 49, 49, 49, 49, 49, 49, 49, 47, 54, 54, 54, 49, 54, 54, 54, 47, 54, 54, 54, 49, 54, 54, 54, 47, 49, 49],
            [49, 49, 49, 53, 49, 49, 49, 49, 49, 49, 49, 49, 54, 54, 54, 49, 54, 54, 54, 47, 54, 54, 54, 49, 54, 54, 54, 53, 49, 49],
            [49, 49, 49, 53, 49, 49, 49, 49, 49, 49, 49, 49, 49, 48, 49, 49, 49, 48, 49, 47, 49, 48, 49, 49, 49, 48, 49, 53, 49, 49],
            [49, 49, 54, 47, 49, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 49, 47, 49, 49],
            [49, 49, 54, 47, 49, 47, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 47, 49, 47, 49, 49],
            [49, 49, 54, 47, 49, 47, 50, 47, 47, 47, 47, 47, 50, 47, 47, 47, 47, 47, 50, 47, 50, 50, 50, 47, 50, 47, 49, 47, 49, 54],
            [49, 49, 49, 47, 49, 47, 50, 50, 50, 47, 56, 56, 56, 47, 50, 50, 50, 51, 50, 47, 50, 47, 50, 47, 50, 47, 49, 47, 49, 54],
            [49, 49, 49, 53, 49, 47, 50, 50, 50, 47, 56, 56, 56, 47, 50, 47, 47, 47, 50, 47, 50, 47, 50, 47, 50, 47, 49, 53, 49, 54],
            [49, 49, 49, 47, 49, 47, 50, 50, 50, 47, 50, 50, 50, 47, 50, 50, 50, 47, 50, 47, 50, 47, 50, 47, 50, 47, 49, 47, 49, 49],
            [49, 49, 49, 47, 49, 47, 50, 50, 50, 47, 56, 56, 50, 47, 47, 47, 47, 47, 50, 50, 47, 50, 47, 50, 50, 47, 49, 47, 49, 49],
            [49, 49, 49, 47, 49, 47, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 47, 49, 47, 49, 49],
            [49, 49, 49, 47, 49, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 52, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 49, 47, 49, 49],
            [49, 49, 49, 53, 49, 49, 47, 49, 49, 49, 49, 49, 47, 49, 49, 49, 49, 49, 47, 49, 49, 49, 49, 49, 47, 49, 49, 53, 49, 49],
            [49, 49, 49, 53, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 53, 49, 49],
            [47, 47, 49, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 49, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 49, 49],
            [49, 49, 49, 54, 54, 54, 49, 54, 54, 54, 49, 49, 49, 54, 54, 54, 49, 49, 47, 49, 49, 49, 49, 49, 54, 54, 54, 54, 49, 49],
            [49, 49, 49, 54, 54, 54, 49, 54, 54, 54, 49, 47, 49, 54, 54, 54, 49, 49, 47, 49, 49, 49, 49, 49, 54, 54, 54, 54, 49, 49],
            [49, 49, 49, 54, 54, 54, 49, 54, 54, 54, 49, 47, 49, 54, 54, 54, 49, 49, 47, 55, 55, 47, 49, 49, 54, 54, 54, 54, 49, 49],
            [49, 49, 49, 49, 48, 49, 49, 49, 48, 49, 49, 47, 49, 49, 48, 49, 49, 49, 47, 49, 49, 47, 49, 49, 49, 49, 49, 49, 49, 49],
            [49, 49, 49, 54, 54, 54, 49, 54, 54, 54, 49, 47, 47, 47, 53, 47, 47, 47, 47, 49, 49, 47, 49, 49, 49, 49, 49, 49, 49, 49],
            [49, 49, 49, 54, 54, 54, 49, 54, 54, 54, 49, 49, 49, 49, 49, 49, 49, 47, 55, 55, 55, 47, 49, 49, 49, 49, 49, 49, 49, 49],
            [49, 49, 49, 54, 54, 54, 49, 54, 54, 54, 49, 49, 49, 49, 49, 49, 49, 47, 55, 55, 55, 47, 49, 49, 49, 49, 49, 49, 49, 49],
            [49, 49, 49, 49, 48, 49, 49, 49, 48, 49, 49, 49, 49, 49, 49, 49, 49, 47, 55, 55, 55, 47, 49, 49, 49, 49, 49, 49, 49, 49]
        ],
    }
};

class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // 加载占位图片
        // 角色
        this.load.image('丰川祥子Normal', './assets/角色/正式采用/正侧视图/抠图/512标准化/丰川祥子.png');
        this.load.image('丰川祥子Cry', './assets/角色/正式采用/正侧视图/抠图/512标准化/丰川祥子哭.png');
        this.load.image('丰川祥子CryCircle', './assets/角色/正式采用/正侧视图/抠图/⚪祥子哭.png');
        this.load.image('丰川祥子Smile', './assets/角色/正式采用/正侧视图/抠图/512标准化/丰川祥子笑.png');
        this.load.image('丰川祥子SmileCircle', './assets/角色/正式采用/正侧视图/抠图/⚪祥子笑.png');
        this.load.image('Mortis', './assets/角色/正式采用/正侧视图/抠图/512标准化/莫提丝.png');
        this.load.image('若叶睦', './assets/角色/正式采用/正侧视图/抠图/512标准化/若叶睦.png');
        this.load.image('八幡海玲', './assets/角色/正式采用/正侧视图/抠图/512标准化/八幡海玲.png');
        this.load.image('佑天寺若麦', './assets/角色/正式采用/正侧视图/抠图/512标准化/佑天寺若麦.png');
        this.load.image('三角初华', './assets/角色/正式采用/正侧视图/抠图/512标准化/三角初华.png');
        this.load.image('高松灯', './assets/角色/正式采用/正侧视图/抠图/512标准化/高松灯.png');
        this.load.image('长崎素世', './assets/角色/正式采用/正侧视图/抠图/512标准化/长崎素世.png');
        this.load.image('千早爱音', './assets/角色/正式采用/正侧视图/抠图/512标准化/千早爱音.png');
        this.load.image('椎名立希', './assets/角色/正式采用/正侧视图/抠图/512标准化/椎名立希.png');
        this.load.image('要乐奈', './assets/角色/正式采用/正侧视图/抠图/512标准化/要乐奈.png');
        this.load.image('纯田真奈', './assets/角色/正式采用/正侧视图/抠图/512标准化/纯田真奈.png');
        this.load.image('Ring店员', './assets/角色/正式采用/正侧视图/抠图/512标准化/Ring店员.png');
        this.load.image('丰川定治', './assets/角色/正式采用/正侧视图/抠图/512标准化/丰川定治.png');
        this.load.image('初华炸毛', './assets/角色/正式采用/正侧视图/抠图/512标准化/初华炸毛.png');
        // 道具
        this.load.image('cucumber', './assets/道具/标准化/闪亮黄瓜.png');
        this.load.image('mask', './assets/道具/标准化/难绷的假面.png')
        this.load.image('爱音的手机', './assets/道具/标准化/爱音的手机.png')
        this.load.image('素世的香水', './assets/道具/标准化/素世的香水.png')
        this.load.image('巧克力奶', './assets/道具/标准化//巧克力奶.png')
        this.load.image('天文望远镜', './assets/道具/标准化/天文望远镜.png')
        this.load.image('抹茶巴菲', './assets/道具/标准化/抹茶巴菲.png')
        this.load.image('迈巴赫钥匙', './assets/道具/标准化/迈巴赫钥匙.png')
        this.load.image('空啤酒罐', './assets/道具/标准化/空啤酒罐.png')
        this.load.image('芭蕾舞鞋', './assets/道具/标准化/芭蕾舞鞋.png')
        this.load.image('Mygo联合演出邀请函', './assets/道具/标准化/Mygo联合演出邀请函.png')
        this.load.image('神秘的玩偶', './assets/道具/标准化/神秘的玩偶.png')
        this.load.image('甜甜圈', './assets/道具/标准化/甜甜圈.png')
        // 尝试加载游戏音乐 - 使用简化但可靠的方法
        try {
            console.log('Starting to load background music');
            // 尝试加载两个音频文件作为备选
            this.load.audio('backgroundMusic', './music/莫提丝小曲.mp3');
            this.load.audio('shadowOfSpring', './music/春日影.mp3');
            this.load.audio('ImprisonedII', './music/ImprisonedII.mp3');
            this.load.audio('不要把小祥从我身边抢走', './music/不要把小祥从我身边抢走.mp3');
            
            // 添加完整的加载完成事件监听器
            this.load.once('complete', () => {
                console.log('All assets loaded, checking audio files');
                // 这个监听器会在所有资源加载完成后触发
            });
        } catch (error) {
            console.log('Music loading setup error:', error);
        }

        

        // 加载第二关所需的新贴图资源
        this.load.image('dark', './assets/dark.png');
        this.load.image('dialog', './assets/框/对话框/采用/对话框.png');
        this.load.image('select1', './assets/框/对话框/采用/白键1.png');
        this.load.image('select2', './assets/框/对话框/采用/白键2.png');
        this.load.image('blackkey', './assets/框/对话框/采用/黑键.png');
        this.load.image('t1', './assets/关卡1/标准化/1.png');
        this.load.image('t2', './assets/关卡1/标准化/2.png');
        this.load.image('t3', './assets/关卡1/标准化/3.png');
        this.load.image('t4', './assets/关卡1/标准化/4.png');
        this.load.image('t5', './assets/关卡1/标准化/5.png');
        this.load.image('t6', './assets/关卡1/标准化/6.png');
        this.load.image('t7', './assets/关卡1/标准化/7.png');
        this.load.image('t8', './assets/关卡1/标准化/8.png');
        this.load.image('t9', './assets/关卡1/标准化/9.png');
        this.load.image('t10', './assets/关卡1/标准化/10.png');
        this.load.image('t11', './assets/关卡1/标准化/11.png');
        this.load.image('t12', './assets/关卡1/标准化/12.png');
        this.load.image('t13', './assets/关卡1/标准化/13.png');
        this.load.image('t14', './assets/关卡1/标准化/14.png');
        this.load.image('t15', './assets/关卡1/标准化/15.png');
        this.load.image('t16', './assets/关卡1/标准化/16.png');
        this.load.image('t17', './assets/关卡1/标准化/17.png');
        this.load.image('t18', './assets/关卡2/tile/标准化/18.png');
        this.load.image('t19', './assets/关卡2/tile/标准化/19.png');
        this.load.image('t20', './assets/关卡2/tile/标准化/20.png');
        this.load.image('t21', './assets/关卡2/tile/标准化/21.png');
        this.load.image('t22', './assets/关卡2/tile/标准化/22.png');
        this.load.image('t23', './assets/关卡2/tile/标准化/23.png');
        this.load.image('t24', './assets/关卡2/tile/标准化/24.png');
        this.load.image('t25', './assets/关卡2/tile/标准化/25.png');
        this.load.image('t26', './assets/关卡2/tile/标准化/26.png');
        this.load.image('t27', './assets/关卡2/tile/标准化/27.png');
        this.load.image('t28', './assets/关卡2/tile/标准化/28.png');
        this.load.image('t29', './assets/关卡2/tile/标准化/29.png');
        this.load.image('t30', './assets/关卡2/tile/标准化/30.png');
        this.load.image('t31', './assets/关卡2/tile/标准化/31.png');
        this.load.image('t32', './assets/关卡2/tile/标准化/32.png');
        this.load.image('t33', './assets/关卡3/tile/标准化/33.png');
        this.load.image('t34', './assets/关卡3/tile/标准化/34.png');
        this.load.image('t35', './assets/关卡3/tile/标准化/35.png');
        this.load.image('t36', './assets/关卡3/tile/标准化/36.png');
        this.load.image('t37', './assets/关卡3/tile/标准化/37.png');
        this.load.image('t38', './assets/关卡3/tile/标准化/38.png');
        this.load.image('t39', './assets/关卡3/tile/标准化/39.png');
        this.load.image('t40', './assets/关卡3/tile/标准化/40.png');
        this.load.image('t41', './assets/关卡3/tile/标准化/41.png');
        this.load.image('t42', './assets/关卡3/tile/标准化/42.png');
        this.load.image('t43', './assets/关卡3/tile/标准化/43.png');
        this.load.image('t44', './assets/关卡3/tile/标准化/44.png');
        this.load.image('t45', './assets/关卡3/tile/标准化/45.png');
        this.load.image('t46', './assets/关卡3/tile/标准化/46.png');
        this.load.image('t47', './assets/特殊关卡/tile/标准化/47.png');
        this.load.image('t48', './assets/特殊关卡/tile/标准化/48.png');
        this.load.image('t49', './assets/特殊关卡/tile/标准化/49.png');
        this.load.image('t50', './assets/特殊关卡/tile/标准化/50.png');
        this.load.image('t51', './assets/特殊关卡/tile/标准化/51.png');
        this.load.image('t52', './assets/特殊关卡/tile/标准化/52.png');
        this.load.image('t53', './assets/特殊关卡/tile/标准化/53.png');
        this.load.image('t54', './assets/特殊关卡/tile/标准化/54.png');
        this.load.image('t55', './assets/特殊关卡/tile/标准化/55.png');
        this.load.image('t56', './assets/特殊关卡/tile/标准化/56.png');

        this.load.image('whitehouse', './assets/关卡1/标准化/白房子.png');
        this.load.image('bluehouse', './assets/关卡1/标准化/蓝房子.png');
        this.load.image('yellowhouse', './assets/关卡1/标准化/黄房子.png');
        this.load.image('greenhouse', './assets/关卡1/标准化/绿房子.png');
        this.load.image('yuqiu', './assets/关卡1/标准化/羽丘学院.png');
        this.load.image('yuqiudamen', './assets/关卡1/标准化/学院大门开门.png');
        this.load.image('无轮小轿车向左', './assets/关卡1/标准化/无轮小轿车向左.png');
        this.load.image('无轮小轿车向右', './assets/关卡1/标准化/无轮小轿车向右.png');
        this.load.image('车轮子', './assets/关卡1/标准化/车轮子.png');
        this.load.image('红灯亮', './assets/关卡1/标准化/红灯亮.png');
        this.load.image('黄灯亮', './assets/关卡1/标准化/黄灯亮.png');
        this.load.image('绿灯亮', './assets/关卡1/标准化/绿灯亮.png');
        this.load.image('penquan', './assets/关卡1/标准化/飞鸟山喷泉.png');
        this.load.image('Ring', './assets/关卡1/标准化/Ring.png');
        this.load.image('riverheng', './assets/关卡1/标准化/河流横.png');
        this.load.image('riverzong', './assets/关卡1/标准化/河流竖.png');
        this.load.image('maybach', './assets/关卡1/标准化/迈巴赫侧视.png');
        this.load.image('qiaodong', './assets/关卡1/标准化/桥洞.png');
        this.load.image('芭菲车', './assets/关卡2/tile/标准化/芭菲车抠图.png');
        this.load.image('睦头床', './assets/关卡2/tile/标准化/床抠图暗红.png');
        this.load.image('沙发', './assets/关卡2/tile/标准化/二次元沙发抠图.png');
        this.load.image('俯视迈巴赫', './assets/关卡2/tile/标准化/迈巴赫俯视图抠图.png');
        this.load.image('莫提斯玩偶', './assets/关卡2/tile/标准化/莫提斯.png');
        this.load.image('莫提斯玩偶笑', './assets/关卡2/tile/标准化/莫提斯笑.png');
        this.load.image('铁栅栏', './assets/关卡2/tile/标准化/铁栅栏抠图.png');
        this.load.image('血色长桌', './assets/关卡2/tile/标准化/血色长桌.png');
        this.load.image('舞台', './assets/关卡3/tile/标准化/舞台.png');
        this.load.image('厅内芭菲车', './assets/关卡3/tile/标准化/第三关芭菲车抠图.png');
        this.load.image('人偶堆', './assets/关卡3/tile/标准化/人偶堆抠图.png');
        this.load.image('椅子堆', './assets/关卡3/tile/标准化/椅子堆叠抠图.png');
        this.load.image('荣誉板', './assets/特殊关卡/tile/标准化/本月优秀员工荣誉板.png');
        this.load.image('工位', './assets/特殊关卡/tile/标准化/工位抠图.png');
        this.load.image('公司大门', './assets/特殊关卡/tile/标准化/公司大门抠图无栅栏.png');
        this.load.image('会议桌', './assets/特殊关卡/tile/标准化/会议桌抠图.png');
        this.load.image('进门闸机', './assets/特殊关卡/tile/标准化/进门闸机抠图.png');
        this.load.image('领导办公桌', './assets/特殊关卡/tile/标准化/领导办公桌抠图.png');
        this.load.image('领导沙发', './assets/特殊关卡/tile/标准化/领导沙发.png');
        this.load.image('投影屏幕', './assets/特殊关卡/tile/标准化/投影屏幕抠图.png');
        this.load.image('饮水机', './assets/特殊关卡/tile/标准化/饮水机抠图.png');

        // 加载事件框及物品栏素材
        this.load.image('eventlog', './assets/框/事件框/事件框设计.png')
        this.load.image('inventory', './assets/框/道具框/道具框.png')
        this.load.image('eventlog_expand', './assets/框/向上展开.png')
        this.load.image('eventlog_collapsed', './assets/框/向下收起.png')
        this.load.image('inventory_expand', './assets/框/向右展开.png')
        this.load.image('inventory_collapsed', './assets/框/向左收起.png')
        // 加载对话框素材
        this.load.image('passDialogBox', './assets/框/游戏结束/游戏过关.png');
        this.load.image('gameOverDialogBox', './assets/框/游戏结束/游戏结束.png');
        this.load.image('passSelect1', './assets/框/游戏结束/按钮1.png');
        this.load.image('passSelect2', './assets/框/游戏结束/按钮2.png');
        // 加载结算界面素材
        this.load.image('settlementDialogBox', './assets/结算界面/结算界面.png');
        this.load.image('S', './assets/结算界面/S.png');
        this.load.image('A', './assets/结算界面/A.png');
        this.load.image('B', './assets/结算界面/B.png');
        this.load.image('C', './assets/结算界面/C.png');
        this.load.image('D', './assets/结算界面/D.png');
        this.load.image('AVEMUJICA', './assets/结算界面/AVE MUJICA.png');

        // 加载主界面素材
        this.load.image('主界面红幕布', './assets/开始界面/红幕布背景.png');
        this.load.image('菜单栏背景', './assets/开始界面/菜单栏背景1.png');
        this.load.image('莫提丝木牌', './assets/开始界面/莫提丝木牌反转.png');
        this.load.image('祥子木牌', './assets/开始界面/祥子木牌反转.png');
        this.load.image('祥子哭木牌', './assets/开始界面/祥子哭木牌.png');
        this.load.image('逃离莫提丝字体', './assets/开始界面/逃离莫提斯！.png');
        this.load.image('悬挂木牌', './assets/开始界面/悬挂木牌.png');
        this.load.image('主界面菜单按钮', './assets/开始界面/选项框.png');
        this.load.image('主界面鼠标悬停时菜单按钮', './assets/开始界面/选项框被选中.png');
        this.load.image('主界面返回按钮', './assets/开始界面/返回键.png');
        this.load.image('主界面鼠标悬停时返回按钮', './assets/开始界面/返回键悬停.png');
        this.load.image('图鉴背景纸', './assets/图鉴成就规则/图鉴背景纸.png');
        this.load.image('成就背景纸', './assets/图鉴成就规则/成就背景纸.png');
        this.load.image('规则背景纸', './assets/图鉴成就规则/规则背景纸.png');
        this.load.image('背景板子level1', './audio/背景板子level1.png');
        this.load.image('背景板子level2', './audio/背景板子level2.png');
        this.load.image('背景板子level3', './audio/背景板子level3.png');
        this.load.image('规则', './assets/图鉴成就规则/规则.png');
        this.load.image('规则鼠标悬置', './assets/图鉴成就规则/规则鼠标悬置.png')

        this.load.on('filecomplete', (key) => console.log(`Loaded: ${key}`));
        this.load.on('loaderror', (file) => console.error(`Failed to load: ${file.key}`));
        // 添加音频文件加载完成的特定监听器
        this.load.on('filecomplete-audio-backgroundMusic', () => {
            console.log('Background music loaded successfully');
        });

        try {

            try {
                // 使用try-catch包装视频加载
                this.load.video('cherryBlossomVideo', './audio/cherryblossom.mp4', false, true);
                // 转场动画
                this.load.video('关卡短切换level1', './audio/关卡短切换level1.mp4', false, true);
                this.load.video('关卡短切换level2', './audio/关卡短切换level2.mp4', false, true);
                this.load.video('关卡短切换level3', './audio/关卡短切换level3.mp4', false, true);
                this.load.video('关卡短切换倒放level1', './audio/关卡短切换倒放level1.mp4', false, true);
                this.load.video('关卡短切换倒放level2', './audio/关卡短切换倒放level2.mp4', false, true);
                this.load.video('关卡短切换倒放level3', './audio/关卡短切换倒放level3.mp4', false, true);

                // 设置加载完成事件处理
                this.load.on('filecomplete-video-cherryBlossomVideo', () => {
                    console.log('视频资源cherryBlossomVideo加载完成');
                });
                
                // 设置加载错误事件处理
                this.load.on('loaderror-video-cherryBlossomVideo', (file, type, data) => {
                    console.error('视频资源加载失败:', file, type, data);
                });
                
                console.log('樱花视频已预加载');
            } catch (error) {
                console.error('设置视频加载时出错:', error);
            }
            
        } catch (error) {
            console.error('处理视频加载时出错:', error);
        }
    }

    create() {
        this.scene.start('MainScene');
    }
}


class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.lastDirection = 'right'; // 默认朝向
        this.npcDirections = {}; // 存储NPC朝向
    }
    


    init(data) {
        console.log('GameScene init, level:', data.level);
        this.level = data.level || 1;
        // 接收从上一关传递的道具信息
        this.inheritedInventory = data.inventory || {};
        // 如果没有从上一关传递道具信息，尝试从localStorage加载
        if (Object.keys(this.inheritedInventory).length === 0) {
            try {
                const savedInventory = localStorage.getItem('gameInventory');
                if (savedInventory) {
                    const loadedInventory = JSON.parse(savedInventory);
                    // 只保留"迈巴赫钥匙"、"空啤酒罐"、"芭蕾舞鞋"、"Mygo联合演出邀请函"、"神秘的玩偶"道具，其他道具不加载
                    this.inheritedInventory = {};
                    if (loadedInventory['迈巴赫钥匙']) {
                        this.inheritedInventory['迈巴赫钥匙'] = loadedInventory['迈巴赫钥匙'];
                    }
                    if (loadedInventory['空啤酒罐']) {
                        this.inheritedInventory['空啤酒罐'] = loadedInventory['空啤酒罐'];
                    }
                    if (loadedInventory['芭蕾舞鞋']) {
                        this.inheritedInventory['芭蕾舞鞋'] = loadedInventory['芭蕾舞鞋'];
                    }
                    if (loadedInventory['Mygo联合演出邀请函']) {
                        this.inheritedInventory['Mygo联合演出邀请函'] = loadedInventory['Mygo联合演出邀请函'];
                    }
                    if (loadedInventory['神秘的玩偶']) {
                        this.inheritedInventory['神秘的玩偶'] = loadedInventory['神秘的玩偶'];
                    }
                    console.log('从localStorage加载道具信息:', this.inheritedInventory);
                }
            } catch (error) {
                console.error('加载localStorage道具信息失败:', error);
            }
        }
        this.inheritedCucumberCount = data.cucumberCount || 0;
        // 接收累计数据参数
        this.total_cucumber = data.total_cucumber || 0;
        this.total_friend = data.total_friend || 0;
        // 接收分数参数
        this.score = data.score || 0;
        // 接收fromMain参数，标记是否从主界面开始游戏
        this.fromMain = data.fromMain || false;

        // 重置永久双倍移动标志，确保进入新关卡时不继承此状态
        this.permanentDoubleMove = false;
        // 接收allowAccessToTheNextLevel参数，如果没有传递则默认为false
        this.allowAccessToTheNextLevel = data.allowAccessToTheNextLevel || false;
        console.log('allowAccessToTheNextLevel initialized to:', this.allowAccessToTheNextLevel);

    }

    getRandomPosition(mapData, usedPositions, requireDark = false) {
        const width = mapData.width;
        const height = mapData.height;
        const tiles = mapData.tiles;
        let x, y;
        let attempts = 0;
        const maxAttempts = 1000;
        // 设置可通行的tile
        const validTiles = this.validTiles;
        do {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);
            attempts++;
            if (attempts > maxAttempts) {
                console.error('Failed to find valid position');
                return null;
            }
        } while (
            !validTiles.includes(tiles[y][x]) ||
            (requireDark && this.isBright(x, y)) ||
            usedPositions.some(pos => pos.x === x && pos.y === y) ||
            // 第一关的位置限制 - 修正坐标范围以匹配Math.floor后的实际坐标范围[0,29]
            (this.level === 1 && (
                // 区域1：25<=横坐标<=29且19<=纵坐标<=21
                (x >= 25 && x <= 29 && y >= 19 && y <= 21) ||
                // 区域2：25<=横坐标<=26且22<=纵坐标<=23
                (x >= 25 && x <= 26 && y >= 22 && y <= 23)
            )) ||
            // 第二关的位置限制 - 16<=tileX<=20且0<=tileY<=4的区域
            (this.level === 2 && x >= 16 && x <= 20 && y >= 0 && y <= 4) ||
            // 第三关的位置限制 - 8<=tileX<=9&&7<=tileY<=8的区域
            (this.level === 3 && x >= 8 && x <= 9 && y >= 7 && y <= 8) ||
            // 特殊关卡的位置限制 - 19<=tileX<=20且25<=tileY<=26的区域
            (this.level === 4 && x >= 19 && x <= 20 && y >= 25 && y <= 26) ||
            // 特殊关卡的位置限制 - 5<=tileX<=25且10<=tileY<=18的区域
            (this.level === 4 && x >= 5 && x <= 25 && y >= 10 && y <= 18)
        );
        return { x, y };
    }

    create(data) {
        console.log('GameScene create started');

        // 首先初始化音频系统
        this.initializeAudio();
        
        // 立即尝试播放背景音乐，不再等待用户交互
        console.log('Attempting to play background music immediately');
        this.playBackgroundMusicImmediately();
        
        // 仍然保留用户交互监听器作为备选
        console.log('Adding user interaction listener as backup for audio playback');
        this.input.once('pointerdown', this.handleUserInteraction, this);
        this.input.keyboard.once('keydown', this.handleUserInteraction, this);
        
        // 初始化游戏状态
        this.initGameState(data);
        
        // 初始化permanentDoubleMove状态跟踪
        this.previousPermanentDoubleMove = this.permanentDoubleMove;
        
        // 初始化地图
        this.initializeMap();
        
        // 锁定键盘输入
        this.keyboardLocked = true;
        
        // 处理关卡过渡动画
        if (this.level === 1 && this.allowAccessToTheNextLevel) {
            // 第一关：背景板子level1向上平移到屏幕外
            const backgroundBoard = this.add.image(960, 960, '背景板子level1');
            backgroundBoard.setDisplaySize(1920, 1920);
            backgroundBoard.setDepth(100); // 设置高深度，确保显示在最前面
            
            this.tweens.add({
                targets: backgroundBoard,
                y: -960,
                duration: 1000, // 动画持续时间1秒
                ease: 'Linear',
                onComplete: () => {
                    // 动画结束后销毁背景板子level1
                    backgroundBoard.destroy();
                    // 解除键盘锁定
                    this.keyboardLocked = false;
                }
            });
        } else if (this.level === 2 && this.showTransition) {
            // 第二关：播放视频‘关卡短切换level2’，然后播放'背景板子level2'向上移动动画
            const transitionVideo = this.add.video(this.game.config.width / 2, this.game.config.height / 2, '关卡短切换level2');
            transitionVideo.setDisplaySize(1920, 1920);
            transitionVideo.setDepth(100); // 设置高深度，确保显示在最前面
            transitionVideo.play();
            
            transitionVideo.on('complete', () => {
                transitionVideo.destroy();
                
                // 4)：'背景板子level2'从屏幕中央移动到屏幕外
                const backgroundBoard2 = this.add.image(960, 960, '背景板子level2');
                backgroundBoard2.setDisplaySize(1920, 1920);
                backgroundBoard2.setDepth(100); // 设置高深度，确保显示在最前面
                
                this.tweens.add({
                    targets: backgroundBoard2,
                    y: -960,
                    duration: 1000, // 动画持续时间1秒
                    ease: 'Linear',
                    onComplete: () => {
                        // 动画结束后销毁背景板子level2
                        backgroundBoard2.destroy();
                        // 解除键盘锁定
                        this.keyboardLocked = false;
                    }
                });
            });
        } else if (this.level === 3 && this.showTransition) {
            // 第三关：播放视频‘关卡短切换level3’，然后播放'背景板子level3'向上移动动画
            const transitionVideo = this.add.video(this.game.config.width / 2, this.game.config.height / 2, '关卡短切换level3');
            transitionVideo.setDisplaySize(1920, 1920);
            transitionVideo.setDepth(100); // 设置高深度，确保显示在最前面
            transitionVideo.play();
            
            transitionVideo.on('complete', () => {
                transitionVideo.destroy();
                
                // 4)：'背景板子level3'从屏幕中央移动到屏幕外
                const backgroundBoard3 = this.add.image(960, 960, '背景板子level3');
                backgroundBoard3.setDisplaySize(1920, 1920);
                backgroundBoard3.setDepth(100); // 设置高深度，确保显示在最前面
                
                this.tweens.add({
                    targets: backgroundBoard3,
                    y: -960,
                    duration: 1000, // 动画持续时间1秒
                    ease: 'Linear',
                    onComplete: () => {
                        // 动画结束后销毁背景板子level3
                        backgroundBoard3.destroy();
                        // 解除键盘锁定
                        this.keyboardLocked = false;
                    }
                });
            });
        } else {
            // 其他关卡，直接解除键盘锁定
            this.keyboardLocked = false;
        }
        
        // 只在第一关添加樱花视频
        if (this.level === 1) {
            // 将视频放在地图右下角位置
            const mapData = levelData['level' + this.level];
            const videoX = 6.5 * this.tile_Width; // 距离右侧留出2个格子
            const videoY = 7.5 * this.tile_Height; // 距离底部留出2个格子
            
            // 添加多个樱花视频到场景
            try {
                // 原始视频位置
                if (typeof videoX !== 'undefined' && typeof videoY !== 'undefined') {
                    this.cherryBlossom = this.add.video(videoX, videoY, 'cherryBlossomVideo');
                    if (this.cherryBlossom) {
                        this.cherryBlossom.setScale(61/960);
                        this.cherryBlossom.setDepth(5);
                        this.cherryBlossom.setScrollFactor(1);
                        this.cherryBlossom.play(true);
                        console.log('原始樱花视频已添加到场景，位置:', videoX, videoY);
                    }
                }
                
                // 创建视频位置数组
                const videoPositions = [
                    { x: 21.5 * this.tile_Width, y: 15.5 * this.tile_Width },
                    { x: 21.5 * this.tile_Width, y: 16.5 * this.tile_Width },
                    { x: 21.5 * this.tile_Width, y: 17.5 * this.tile_Width },
                    { x: 21.5 * this.tile_Width, y: 19.5 * this.tile_Width },
                    { x: 21.5 * this.tile_Width, y: 20.5 * this.tile_Width },
                    { x: 21.5 * this.tile_Width, y: 21.5 * this.tile_Width },
                    { x: 21.5 * this.tile_Width, y: 22.5 * this.tile_Width }
                ];
                
                // 在每个位置创建视频
                this.cherryBlossomInstances = [];
                videoPositions.forEach((pos, index) => {
                    try {
                        const video = this.add.video(pos.x, pos.y, 'cherryBlossomVideo');
                        if (video) {
                            // 应用与原始视频相同的设置
                            video.setScale(61/960);
                            video.setDepth(5);
                            video.setScrollFactor(1);
                            video.play(true);
                            this.cherryBlossomInstances.push(video);
                            console.log(`樱花视频 ${index + 1} 已添加到场景，位置:`, pos.x, pos.y);
                        }
                    } catch (err) {
                        console.error(`创建视频 ${index + 1} 时出错:`, err);
                    }
                });
                
            } catch (error) {
                console.error('处理视频功能时出错:', error);
            }
        } else {
            // 非第一关时，确保没有樱花视频
            console.log(`当前是第${this.level}关，不添加樱花视频`);
        }
        
        // 初始化游戏对象
        this.initializeGameObjects();
        if (this.level === 1){
            // 添加交通灯贴图（设置为不可通行）
            const trafficLightX = 13.5 * this.tile_Width;
            const trafficLightY = 15.5 * this.tile_Height;
            // 使用physics.add.image创建物理对象，使其可以参与碰撞
            this.trafficLight = this.physics.add.image(trafficLightX, trafficLightY, '绿灯亮');
            // 设置缩放
            this.trafficLight.setScale(this.tile_Width / this.trafficLight.width, this.tile_Height / this.trafficLight.height);
            // 设置较高的深度以确保可见
            this.trafficLight.setDepth(10);
            // 设置为不可移动，使其成为障碍物
            this.trafficLight.body.immovable = true;
            console.log('交通灯已添加（不可通行），位置:', trafficLightX, trafficLightY, '初始贴图:绿灯亮');
            // 初始化时更新交通灯状态（第一回合）
            this.updateTrafficLightState();
        }
        
        
        // 初始化控制和UI
        this.initializeControlsAndUI();
        
        // 初始化游戏系统
        this.initializeGameSystems();

    }
    
    // 初始化音频系统但不立即播放
    initializeAudio() {
        try {
            console.log('Initializing audio system with HTML5 Audio API');
            
            // 创建全局变量来存储不同的音频实例
            if (!window.gameAudioInstances) {
                window.gameAudioInstances = {};
            }
            
            // 初始化默认背景音乐
            if (!window.gameAudioInstances.defaultMusic) {
                window.gameAudioInstances.defaultMusic = new Audio('./music/莫提丝小曲.mp3');
                window.gameAudioInstances.defaultMusic.loop = true;
                window.gameAudioInstances.defaultMusic.volume = 0.8;
                window.gameAudioInstances.defaultMusic.load();
                
                // 添加事件监听器
                this.setupAudioEventListeners(window.gameAudioInstances.defaultMusic, 'defaultMusic');
            }
            
            // 初始化shadowOfSpring音乐（对应春日影.mp3）
            if (!window.gameAudioInstances.shadowOfSpring) {
                window.gameAudioInstances.shadowOfSpring = new Audio('./music/春日影.mp3');
                window.gameAudioInstances.shadowOfSpring.loop = true;
                window.gameAudioInstances.shadowOfSpring.volume = 0.8;
                window.gameAudioInstances.shadowOfSpring.load();
                
                // 添加事件监听器
                this.setupAudioEventListeners(window.gameAudioInstances.shadowOfSpring, 'shadowOfSpring');
            }
            
            // 初始化ImprisonedII音乐（对应白月光形态）
            if (!window.gameAudioInstances.imprisonedII) {
                window.gameAudioInstances.imprisonedII = new Audio('./music/ImprisonedII.mp3');
                window.gameAudioInstances.imprisonedII.loop = true;
                window.gameAudioInstances.imprisonedII.volume = 0.8;
                window.gameAudioInstances.imprisonedII.load();
                
                // 添加事件监听器
                this.setupAudioEventListeners(window.gameAudioInstances.imprisonedII, 'imprisonedII');
            }
                
            // 设置当前活动的音乐
            this.currentMusic = 'defaultMusic';
            
            console.log('Audio initialized, waiting for user interaction to play');
        } catch (error) {
            console.log('Audio initialization error:', error);
        }
    }
    
    // 设置音频事件监听器的辅助方法
    setupAudioEventListeners(audioElement, audioName) {
        audioElement.addEventListener('loadeddata', () => {
            console.log(`${audioName} data loaded successfully`);
        });
        
        audioElement.addEventListener('canplaythrough', () => {
            console.log(`${audioName} can play through without interruption`);
        });
        
        audioElement.addEventListener('play', () => {
            console.log(`${audioName} is now playing`);
        });
        
        audioElement.addEventListener('error', (e) => {
            console.log(`${audioName} error occurred:`, e);
            console.log('Error code:', audioElement.error ? audioElement.error.code : 'Unknown');
        });
    }
    
    // 切换背景音乐的方法
    switchBackgroundMusic(musicType) {
        console.log(`Switching background music to ${musicType}`);
        
        // 停止当前播放的音乐
        if (window.gameAudioInstances && window.gameAudioInstances[this.currentMusic]) {
            try {
                window.gameAudioInstances[this.currentMusic].pause();
                window.gameAudioInstances[this.currentMusic].currentTime = 0;
                console.log(`Stopped ${this.currentMusic}`);
            } catch (error) {
                console.log(`Error stopping ${this.currentMusic}:`, error);
            }
        }
        
        // 播放新音乐
        if (window.gameAudioInstances && window.gameAudioInstances[musicType]) {
            try {
                this.currentMusic = musicType;
                const playPromise = window.gameAudioInstances[musicType].play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log(`${musicType} started successfully`);
                    }).catch((error) => {
                        console.log(`Failed to play ${musicType}:`, error);
                    });
                }
            } catch (error) {
                console.log(`Error playing ${musicType}:`, error);
            }
        } else {
            console.log(`${musicType} audio instance not found`);
        }
    }
    
    // 停止所有音频播放
    stopAllMusic() {
        console.log('Stopping all background music');
        
        if (window.gameAudioInstances) {
            for (const musicType in window.gameAudioInstances) {
                try {
                    window.gameAudioInstances[musicType].pause();
                    window.gameAudioInstances[musicType].currentTime = 0;
                    console.log(`Stopped ${musicType}`);
                } catch (error) {
                    console.log(`Error stopping ${musicType}:`, error);
                }
            }
        }
    }
    
    // 处理用户交互，播放音乐（作为备选）
    handleUserInteraction() {
        console.log('User interaction detected, attempting to play music as backup');
        
        // 尝试播放当前设置的背景音乐
        if (window.gameAudioInstances && window.gameAudioInstances[this.currentMusic]) {
            try {
                const playPromise = window.gameAudioInstances[this.currentMusic].play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log(`${this.currentMusic} started successfully after user interaction`);
                    }).catch((error) => {
                        console.log(`Failed to play ${this.currentMusic} after user interaction:`, error);
                    });
                }
            } catch (playError) {
                console.log('Error during music playback attempt:', playError);
            }
        }
    }
    
    // 立即尝试播放背景音乐的方法
    playBackgroundMusicImmediately() {
        console.log('Attempting to play background music immediately on scene load');
        
        // 尝试播放当前设置的背景音乐
        if (window.gameAudioInstances && window.gameAudioInstances[this.currentMusic]) {
            try {
                const playPromise = window.gameAudioInstances[this.currentMusic].play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log(`${this.currentMusic} started successfully immediately on scene load`);
                    }).catch((error) => {
                        console.log(`Failed to play ${this.currentMusic} immediately (browser autoplay policy may be blocking):`, error);
                        console.log('Music will play when user interacts with the game');
                    });
                }
            } catch (playError) {
                console.log('Error during immediate music playback attempt:', playError);
            }
        }
    }
    
    // 场景更新方法

    
    // 场景销毁方法 - 停止所有音乐和清理资源
    destroy() {
        console.log('GameScene is being destroyed, stopping all music');
        this.stopAllMusic();
        
        // 清理车辆动画资源
        this.cleanupCarAnimation();
        
        // 调用父类的destroy方法
        super.destroy();
    }
    
    // 场景关闭方法 - 确保场景退出时停止所有音乐和清理资源
    shutdown() {
        console.log('GameScene is shutting down, stopping all music');
        this.stopAllMusic();
        
        // 清理车辆动画资源
        this.cleanupCarAnimation();
        
        // 调用父类的shutdown方法
        super.shutdown();
    }
    
    // 初始化事件框
    initEventLog() {
        initEventLog_Logic.call(this)
    }
    
    // 切换事件框的收起/展开状态
    toggleEventLog() {
        toggleEventLog_Logic.call(this)
    }
    
    // 检查点是否在事件框内
    isPointInEventLog(x, y) {
        return isPointInEventLog_Logic.call(this, x, y);
    }
    
    // 初始化物品栏
    initInventory() {
        initInventory_Logic.call(this)
    }
    
    // 切换物品栏的收起/展开状态
    toggleInventory() {
        toggleInventory_Logic.call(this)
    }
    
    // 添加物品到物品栏
    addInventoryItem(itemType, count = 1) {
        addInventoryItem_Logic.call(this, itemType, count)
    }
    
    // 使用物品并更新物品栏
    useInventoryItem(itemType, count = 1) {
        useInventoryItem_Logic.call(this, itemType, count)
    }
    
    // 更新物品栏显示
    updateInventoryDisplay() {
        updateInventoryDisplay_Logic.call(this)
    }
    
    // 滚动事件日志
    scrollEventLog(deltaY) {
        scrollEventLog_Logic.call(this, deltaY)
    }
    
    // 添加新事件
    addEvent(text) {
        addEvent_Logic.call(this, text)
    }
    
    // 更新事件框显示
    updateEventLogDisplay() {
        updateEventLogDisplay_Logic.call(this)
    }


    
    // 初始化游戏状态的辅助方法
    initGameState(data) {
        this.score = this.score || 0; // 使用从init传递的分数
        // 从继承的信息初始化黄瓜数量
        this.col_cucumbers = this.inheritedCucumberCount || 0;
        // 使用从init传递的累计数据
        this.total_cucumber = this.total_cucumber || 0;
        this.total_friend = this.total_friend || 0;
        this.Parfait = 0; // 初始化抹茶巴菲数量
        this.team = []; // team不包含场景本身，仅包含玩家和招募的NPC
        this.currentPlayer = '丰川祥子normal';
        this.moonlightDirection = 'up';
        this.turn = 0;
        this.tile_Width = 64;
        this.tile_Height = 64;
        this.lastDirection = 'right'; // 初始化玩家朝向
        this.npcDirections = {}; // 初始化NPC朝向对象
        this.gameOver = false; // 初始化游戏结束标志
        this.dialogVisible = false; // 初始化对话框可见性
        this.turnInProgress = false; // 初始化回合进行状态
        this.currentNpc = null; // 当前对话的NPC
        this.isCompleteDialog = false; // 初始化是否为通关对话框
        this.choice = null; // 初始化用户选择
        this.lastNpcDialogTime = 0; // 上一次NPC对话框显示的时间戳，用于冷却机制
        this.leftNpcsThisTurn = []; // 记录本回合中玩家选择离开的NPC
        this.canMoveTwice = false; // 标记玩家是否可以一回合移动两次
        this.moveCount = 0; // 记录当前回合已经移动的次数
        this.permanentDoubleMove = false; // 标记是否获得永久双倍移动能力
        // 从传入的参数中初始化白月光形态状态
        this.whiteMoonlightFormActive = data?.whiteMoonlightFormActive || false; // 标记是否激活白月光形态
        // 从传入的参数中初始化是否显示过渡动画
        this.showTransition = data?.showTransition || false; // 标记是否显示过渡动画
        this.validTiles = [1,3,12,13,15,16,23,26,32,43,46,48,49,50]; //可通行地块，添加新的可通行tile
        this.lightBlockingTiles = [2,4,5,6,7,8,9,14,17,21,22,24,25,27,28,29,30,31,33,34,35,36,37,38,39,40,41,42,45,47,51,52,54,56]; //可阻挡月光地块，添加新的阻挡月光tile
        this.maxTileId = 56; //地块类型总量
        // 从继承的信息初始化物品栏
        this.inventory = data?.inventory || [
            {name: '闪亮黄瓜', count: this.inheritedCucumberCount || 0},
            {name: '抹茶巴菲', count: this.inheritedParfaitCount || 0}
        ];
        this.inventoryItemTypes = this.inheritedInventory || {};
        
        // 初始化物品组（如果不存在）
        if (!this.inventoryItems) {
            this.inventoryItems = this.add.group();
        }
    }
    
    // 初始化地图的方法
    initializeMap() {
        const mapData = levelData['level' + this.level];
        console.log('Map data:', mapData);

        this.map = this.make.tilemap({ data: mapData.tiles, tileWidth: this.tile_Width, tileHeight: this.tile_Height });
        // 加载所有可能需要的tile图片
        const maxTileNum = 56; // 最大瓦片编号，更新为46以包含新的tile
        for (let i = 1; i <= maxTileNum; i++) {
            this.map.addTilesetImage('t' + i, 't' + i, 64, 64, 0, 0, i);
        }
        // 包含所有瓦片
        const allTilesets = [];
        for (let i = 1; i <= maxTileNum; i++) {
            allTilesets.push(this.map.tilesets[i-1]);
        }
        const mainLayer = this.map.createLayer('layer', allTilesets, 0, 0);
        
        // 创建t13专用高亮层，用于单独控制t13元素的显示层级
        this.t13Layer = this.add.group();
        // 设置碰撞检测，不可通行的tile
        const maxTileId = this.maxTileId;
        const collisionTiles = [];
        for (let i = 1; i <= maxTileId; i++) {
            if (!this.validTiles.includes(i)) {
                collisionTiles.push(i);
            }
        }

        this.map.setCollision(collisionTiles);

        this.pathFinder = new EasyStar.js();
        this.pathFinder.setGrid(mapData.tiles);
        // 设置可通行的tile
        this.pathFinder.setAcceptableTiles(this.validTiles);
        this.pathFinder.enableSync();
        this.pathFinder.setIterationsPerCalculation(1000);
    }
    
    // 初始化游戏对象的方法
    initializeGameObjects() {
        const mapData = levelData['level' + this.level];
        
        this.brightTiles = Array.from({ length: mapData.height }, () => Array(mapData.width).fill(false));
        this.shadowGroup = this.add.group();
        this.visionGroup = this.add.group(); // 用于玩家视野的视觉效果
        
        // 初始化道具变量
        this.emptyBeerCan = null;
        this.balletShoes = null;
        this.mygoInvitation = null;
        this.mysteriousDoll = null;
        
        // 初始化车辆动画相关属性
        this.carAnimationInProgress = false;
        this.carAnimationActive = false;
        this.carCanvas = null;
        this.carCtx = null;
        this.carAnimationId = null;
        this.keyboardLocked = false;
        
        // 只有在第一关才初始化车辆动画
        if (this.level === 1) {
            this.initializeCarCanvas();
        }

        this.npcs = this.physics.add.group();
        const usedPositions = [];

        const playerPos = this.getRandomPosition(mapData, usedPositions);
        // 使用丰川祥子Normal作为玩家角色
        this.player = this.physics.add.sprite(playerPos.x * this.tile_Width + this.tile_Width / 2, playerPos.y * this.tile_Height + this.tile_Height / 2, '丰川祥子Normal');
        // 设置玩家大小为64x64像素
        this.player.setDisplaySize(64, 64);
        // 玩家默认朝向为右
        this.player.flipX = false;
        this.player.collided = 0; // 添加collided属性，初始值为0
        this.team.push(this.player); // 玩家加入team
        usedPositions.push(playerPos);

        const ghostPos = this.getRandomPosition(mapData, usedPositions);
        this.ghost = this.physics.add.sprite(ghostPos.x * this.tile_Width + this.tile_Width / 2, ghostPos.y * this.tile_Height + this.tile_Height / 2, 'Mortis');
        this.ghost.setDepth(19); // 设置深度高于黄瓜但低于NPC
        // 设置鬼大小为64x64像素
        this.ghost.setDisplaySize(64, 64);
        // 鬼默认朝向为右
        this.ghost.flipX = false;
        this.ghost.collided = 0; // 添加collided属性，初始值为0
        usedPositions.push(ghostPos);

        // 检查玩家是否持有Mygo联合演出邀请函
        const hasMygoInvitation = this.inventoryItemTypes && this.inventoryItemTypes['Mygo联合演出邀请函'];
        
        const npcSprites = ['若叶睦', '八幡海玲', '佑天寺若麦', '三角初华', '高松灯', '长崎素世', '千早爱音', '椎名立希', '要乐奈', '纯田真奈'];
        npcSprites.forEach(spriteKey => {
            // 根据NPC类型设置出现概率
            let spawnChance = 100; // 默认100%出现
            if (['高松灯', '长崎素世', '千早爱音', '椎名立希'].includes(spriteKey)) {
                spawnChance = hasMygoInvitation ? 50 : 25; // 持有邀请函时50%，否则25%
            } else if (spriteKey === '要乐奈') {
                spawnChance = hasMygoInvitation ? 50 : 30; // 持有邀请函时50%，否则30%
            } else if (spriteKey === '纯田真奈') {
                spawnChance = 2;
            }
            
            // 随机判断是否生成该NPC
            if (Math.random() * 100 < spawnChance) {
                const npcPos = this.getRandomPosition(mapData, usedPositions);
                const npcSprite = this.npcs.create(npcPos.x * this.tile_Width + this.tile_Width / 2, npcPos.y * this.tile_Height + this.tile_Height / 2, spriteKey);
                // 设置NPC大小为64x64像素
                npcSprite.setDisplaySize(64, 64);
                // NPC默认朝向为右
                npcSprite.flipX = false;
                npcSprite.name = spriteKey;
                usedPositions.push(npcPos);
                npcSprite.follow = false;
                npcSprite.active = true;
                npcSprite.collided = 0; // 添加collided属性，初始值为0
                this.npcDirections[spriteKey] = 'right'; // 默认朝向
                npcSprite.dialogStage = 0; // 添加对话阶段标记
                console.log(`${spriteKey} 生成成功，概率: ${spawnChance}%`);
            } else {
                console.log(`${spriteKey} 未生成，概率: ${spawnChance}%`);
            }
        });

        // 在第四关添加丰川定治NPC
        if (this.level === 4) {
            const toyodaPos = { x: 10, y: 15 };
            const toyodaSprite = this.npcs.create(toyodaPos.x * this.tile_Width + this.tile_Width / 2, toyodaPos.y * this.tile_Height + this.tile_Height / 2, '丰川定治');
            // 设置NPC大小为64x64像素
            toyodaSprite.setDisplaySize(64, 64);
            // NPC默认朝向为右
            toyodaSprite.flipX = false;
            toyodaSprite.name = '丰川定治';
            usedPositions.push(toyodaPos);
            toyodaSprite.follow = false;
            toyodaSprite.active = true;
            toyodaSprite.collided = 0; // 添加collided属性，初始值为0
            this.npcDirections['丰川定治'] = 'right'; // 默认朝向
            toyodaSprite.dialogStage = 0; // 添加对话阶段标记
        }

        this.cucumbers = this.physics.add.group();
        for (let i = 0; i < 4; i++) {
            const cucumberPos = this.getRandomPosition(mapData, usedPositions);
            const cucumber = this.cucumbers.create(cucumberPos.x * this.tile_Width + this.tile_Width / 2, cucumberPos.y * this.tile_Height + this.tile_Height / 2, 'cucumber');
            cucumber.setDepth(18); // 设置深度低于NPC但高于视野高亮效果
            cucumber.setDisplaySize(64, 64); // 黄瓜在地图上显示时一律缩放为64*64
            usedPositions.push(cucumberPos);
        }
        
        // 创建假面道具（每个关卡一个）
        this.masks = this.physics.add.group();
        this.collectedMask = false; // 标记是否已收集假面
        const maskPos = this.getRandomPosition(mapData, usedPositions);
        this.mask = this.masks.create(maskPos.x * this.tile_Width + this.tile_Width / 2, maskPos.y * this.tile_Height + this.tile_Height / 2, 'mask');
        this.mask.setDepth(18); // 设置深度与黄瓜相同
        this.mask.setDisplaySize(64, 64); // 假面在地图上显示时一律缩放为64*64
        usedPositions.push(maskPos);
        this.maskTileX = maskPos.x;
        this.maskTileY = maskPos.y;

        // 确保只在第一关创建空啤酒罐
        if (this.level === 1) {
            // 添加空啤酒罐道具
            console.log('开始创建空啤酒罐，level:', this.level);
            // 直接使用像素坐标，确保位置正确
            const beerCanX = 26.5 * this.tile_Width; // tile 26.5, 中间位置
            const beerCanY = 22.5 * this.tile_Height; // tile 22.5, 中间位置
            console.log('空啤酒罐位置：', beerCanX, beerCanY, 'tile大小：', this.tile_Width, this.tile_Height);
            
            // 尝试创建空啤酒罐，使用physics.add.sprite确保它能正确显示
            this.emptyBeerCan = this.physics.add.sprite(beerCanX, beerCanY, '空啤酒罐');
            if (this.emptyBeerCan) {
                this.emptyBeerCan.setDisplaySize(64, 64);
                this.emptyBeerCan.setDepth(18); // 设置非常高的深度，确保可见
                this.emptyBeerCan.visible = true; // 确保它是可见的
                this.emptyBeerCan.body.immovable = true; // 设置为不可移动
                console.log('空啤酒罐创建成功！');
                console.log('空啤酒罐对象：', this.emptyBeerCan);
                console.log('空啤酒罐深度：', this.emptyBeerCan.depth);
                console.log('空啤酒罐可见性：', this.emptyBeerCan.visible);
            } else {
                console.error('空啤酒罐创建失败：sprite为null');
            }
        }
        
        // 在第二关创建芭蕾舞鞋
        if (this.level === 2) {
            // 添加芭蕾舞鞋道具
            console.log('开始创建芭蕾舞鞋，level:', this.level);
            // 直接使用像素坐标，确保位置正确
            const balletShoesX = 18.5 * this.tile_Width; // tile 18.5, 中间位置
            const balletShoesY = 2.5 * this.tile_Height; // tile 2.5, 中间位置
            console.log('芭蕾舞鞋位置：', balletShoesX, balletShoesY, 'tile大小：', this.tile_Width, this.tile_Height);
            
            // 尝试创建芭蕾舞鞋，使用physics.add.sprite确保它能正确显示
            this.balletShoes = this.physics.add.sprite(balletShoesX, balletShoesY, '芭蕾舞鞋');
            if (this.balletShoes) {
                this.balletShoes.setDisplaySize(64, 64);
                this.balletShoes.setDepth(18); // 设置非常高的深度，确保可见
                this.balletShoes.visible = true; // 确保它是可见的
                this.balletShoes.body.immovable = true; // 设置为不可移动
                console.log('芭蕾舞鞋创建成功！');
                console.log('芭蕾舞鞋对象：', this.balletShoes);
                console.log('芭蕾舞鞋深度：', this.balletShoes.depth);
                console.log('芭蕾舞鞋可见性：', this.balletShoes.visible);
            } else {
                console.error('芭蕾舞鞋创建失败：sprite为null');
            }
        }
        
        // 在第三关创建Mygo联合演出邀请函
        if (this.level === 3) {
            // 添加Mygo联合演出邀请函道具
            console.log('开始创建Mygo联合演出邀请函，level:', this.level);
            // 直接使用像素坐标，确保位置正确
            const invitationX = 9.5 * this.tile_Width; // tile 9.5, 中间位置
            const invitationY = 7.5 * this.tile_Height; // tile 7.5, 中间位置
            console.log('Mygo联合演出邀请函位置：', invitationX, invitationY, 'tile大小：', this.tile_Width, this.tile_Height);
            
            // 尝试创建Mygo联合演出邀请函，使用physics.add.sprite确保它能正确显示
            this.mygoInvitation = this.physics.add.sprite(invitationX, invitationY, 'Mygo联合演出邀请函');
            if (this.mygoInvitation) {
                this.mygoInvitation.setDisplaySize(64, 64);
                this.mygoInvitation.setDepth(18); // 设置非常高的深度，确保可见
                this.mygoInvitation.visible = true; // 确保它是可见的
                this.mygoInvitation.body.immovable = true; // 设置为不可移动
                console.log('Mygo联合演出邀请函创建成功！');
                console.log('Mygo联合演出邀请函对象：', this.mygoInvitation);
                console.log('Mygo联合演出邀请函深度：', this.mygoInvitation.depth);
                console.log('Mygo联合演出邀请函可见性：', this.mygoInvitation.visible);
            } else {
                console.error('Mygo联合演出邀请函创建失败：sprite为null');
            }
        }
        
        // 在特殊关卡创建神秘的玩偶
        if (this.level === 4) {
            // 添加神秘的玩偶道具
            console.log('开始创建神秘的玩偶，level:', this.level);
            // 直接使用像素坐标，确保位置正确
            const dollX = 16.5 * this.tile_Width; // tile 16.5, 中间位置
            const dollY = 15.5 * this.tile_Height; // tile 16.5, 中间位置
            console.log('神秘的玩偶位置：', dollX, dollY, 'tile大小：', this.tile_Width, this.tile_Height);
            
            // 尝试创建神秘的玩偶，使用physics.add.sprite确保它能正确显示
            this.mysteriousDoll = this.physics.add.sprite(dollX, dollY, '神秘的玩偶');
            if (this.mysteriousDoll) {
                this.mysteriousDoll.setDisplaySize(64, 64);
                this.mysteriousDoll.setDepth(18); // 设置非常高的深度，确保可见
                this.mysteriousDoll.visible = true; // 确保它是可见的
                this.mysteriousDoll.body.immovable = true; // 设置为不可移动
                console.log('神秘的玩偶创建成功！');
                console.log('神秘的玩偶对象：', this.mysteriousDoll);
                console.log('神秘的玩偶深度：', this.mysteriousDoll.depth);
                console.log('神秘的玩偶可见性：', this.mysteriousDoll.visible);
            } else {
                console.error('神秘的玩偶创建失败：sprite为null');
            }
        }
        
        // 初始化黄瓜和假面的显示大小（确保所有情况下都正确缩放）
        this.initCucumbers();
        this.initMask();
        
        // 只有在第一关才显示以下贴图
        if (this.level === 1) {
            // 创建一个数组来存储所有贴图
            this.customImages = [];
            
            // 添加用户要求的贴图
            // 贴图一：左上角坐标：【23，16】*64像素 + 32，名称'greenhouse'
            const greenhouse1 = this.add.image(23 * this.tile_Width + 32, 16 * this.tile_Height + 32, 'greenhouse');
            greenhouse1.setDepth(6); // 设置深度在地图tile之上
            this.customImages.push(greenhouse1);
            
            // 贴图二：左上角坐标：【28，16】*64像素 + 32，名称'greenhouse'
            const greenhouse2 = this.add.image(28 * this.tile_Width + 32, 16 * this.tile_Height + 32, 'greenhouse');
            greenhouse2.setDepth(6);
            this.customImages.push(greenhouse2);
            
            // 贴图三：左上角坐标：【23，20】*64像素 + 32，名称'whitehouse'
            const whitehouse1 = this.add.image(23 * this.tile_Width + 32, 20 * this.tile_Height + 32, 'whitehouse');
            whitehouse1.setDepth(6);
            this.customImages.push(whitehouse1);
            
            // 贴图四：左上角坐标：【23，23】*64像素 + 32，名称'whitehouse'
            const whitehouse2 = this.add.image(23 * this.tile_Width + 32, 23 * this.tile_Height + 32, 'whitehouse');
            whitehouse2.setDepth(6);
            this.customImages.push(whitehouse2);
            
            // 贴图五：左上角坐标：【23，28】*64像素 + 32，名称'yellowhouse'
            const yellowhouse = this.add.image(23 * this.tile_Width + 32, 28 * this.tile_Height + 32, 'yellowhouse');
            yellowhouse.setDepth(6);
            this.customImages.push(yellowhouse);
            
            // 贴图六：左上角坐标：【28，23】*64像素 + 32，名称'bluehouse'
            const bluehouse = this.add.image(28 * this.tile_Width + 32, 23 * this.tile_Height + 32, 'bluehouse');
            bluehouse.setDepth(6);
            this.customImages.push(bluehouse);

            // 添加额外的8个贴图 - 坐标已互换（横坐标和纵坐标值互换）
            // 贴图一：左上角坐标：【8，7】*64像素，名称'yuqiu'
            const yuqiu = this.add.image(12 * this.tile_Width + 32, 8 * this.tile_Height + 32, 'yuqiu');
            yuqiu.setDepth(6); // 设置深度在地图tile之上
            this.customImages.push(yuqiu);
            
            // 贴图二：左上角坐标：【8，12】*64像素，名称'yuqiudamen'
            const yuqiudamen = this.add.image(12 * this.tile_Width + 32, 12 * this.tile_Height, 'yuqiudamen');
            yuqiudamen.setDepth(6);
            this.customImages.push(yuqiudamen);
            
            // 贴图三：左上角坐标：【23，1】*64像素，名称'penquan'
            const penquan = this.add.image(24 * this.tile_Width, 2 * this.tile_Height, 'penquan');
            penquan.setDepth(6);
            this.customImages.push(penquan);
            
            // 贴图四：左上角坐标：【6，23】*64像素，名称'Ring'
            const ring = this.add.image(7 * this.tile_Width + 32, 24 * this.tile_Height + 32, 'Ring');
            ring.setDepth(6);
            this.customImages.push(ring);
            
            // 贴图五：左上角坐标：【12，0】*64像素，名称'riverheng'
            const riverheng = this.add.image(2 * this.tile_Width +32, 12 * this.tile_Height +32, 'riverheng');
            riverheng.setDepth(6);
            this.customImages.push(riverheng);
            
            // 贴图六：左上角坐标：【4，5】*64像素，名称'riverzong'
            const riverzong = this.add.image(4 * this.tile_Width + 32, 8 * this.tile_Height + 32, 'riverzong');
            riverzong.setDepth(4);
            
            // 贴图七：左上角坐标：【25，24】*64像素，名称'maybach'
            const maybach = this.add.image(26 * this.tile_Width, 24 * this.tile_Height + 32, 'maybach');
            maybach.setDepth(6);
            this.customImages.push(maybach);
            
            // 贴图八：左上角坐标：【4，5】*64像素，名称'qiaodong'
            const qiaodong = this.add.image(4 * this.tile_Width + 32, 5 * this.tile_Height + 32, 'qiaodong');
            qiaodong.setDepth(6);
            this.customImages.push(qiaodong);


        }
        // 为第二关添加特定贴图
        else if (this.level === 2) {
            // 创建一个数组来存储所有贴图
            this.customImages = [];
            
            // 贴图1：血色长桌
            const bloodTable = this.add.sprite(928, 928, '血色长桌');
            bloodTable.setDisplaySize(192, 64);
            this.customImages.push(bloodTable);
            
            // 贴图2：6个顺时针旋转90°的铁栅栏
            const verticalFences = [
                { x: 96, y: 224 },
                { x: 96, y: 416 },
                { x: 96, y: 608 },
                { x: 96, y: 1248 },
                { x: 96, y: 1440 },
                { x: 96, y: 1632 }
            ];
            
            verticalFences.forEach(pos => {
                const fence = this.add.sprite(pos.x, pos.y, '铁栅栏');
                // 贴图2：尺寸改为64（宽）*192（高）
                fence.setDisplaySize(192, 64);
                fence.setAngle(90); // 顺时针旋转90度
            });
            
            // 贴图4：莫提斯玩偶
            this.mortisDoll = this.add.sprite(1664, 1440, '莫提斯玩偶');
            this.mortisDoll.setDisplaySize(128, 196);
            this.customImages.push(this.mortisDoll);
            
            // 贴图5：俯视迈巴赫
            const maybachTopView = this.add.sprite(1440, 704, '俯视迈巴赫');
            maybachTopView.setDisplaySize(64, 128);
            this.customImages.push(maybachTopView);
            
            // 贴图6：maybach（2个）
            const maybachs = [
                { x: 768, y: 1248 },
                { x: 1088, y: 352 }
            ];
            maybachs.forEach(pos => {
                const maybach = this.add.sprite(pos.x, pos.y, 'maybach');
                maybach.setDisplaySize(128, 64);
                this.customImages.push(maybach);
            });
            
            // 贴图7：沙发（3个）
            const sofas = [
                { x: 1536, y: 128 },
                { x: 1664, y: 128 },
                { x: 1792, y: 128 }
            ];
            sofas.forEach(pos => {
                const sofa = this.add.sprite(pos.x, pos.y, '沙发');
                sofa.setDisplaySize(128, 128);
                this.customImages.push(sofa);
            });
            
            // 贴图8：睦头床
            const bed = this.add.sprite(11.5 * 64, 26 * 64, '睦头床');
            bed.setDisplaySize(192, 128);
            this.customImages.push(bed);
            
            // 贴图9：芭菲车
            const parfaitCart = this.add.sprite(28 * 64, 5 * 64, '芭菲车');
            parfaitCart.setDisplaySize(128, 128);
            this.customImages.push(parfaitCart);
            
            // 贴图3：2个水平放置的铁栅栏
            const horizontalFences = [
                { x: 160, y: 96 },
                { x: 160, y: 1760 }
            ];
            
            horizontalFences.forEach(pos => {
                const fence = this.add.sprite(pos.x, pos.y, '铁栅栏');
                fence.setDisplaySize(192, 64);
                this.customImages.push(fence);
            });
        }
        else if (this.level === 3) {
            // 创建一个数组来存储所有贴图
            this.customImages = [];
            
            // 新添加的贴图
            // 贴图1：舞台，位置X=15*64=960, Y=6.5*64=416，大小640x320
            const stage = this.add.sprite(15 * 64, 6.5 * 64, '舞台');
            stage.setDisplaySize(640, 320);
            stage.setDepth(5); // 设置适当的深度
            this.customImages.push(stage);
            
            // 贴图2：椅子堆，位置X=25.5*64=1632, Y=14.5*64=928，大小192x192
            const chairPile = this.add.sprite(25.5 * 64, 14.5 * 64, '椅子堆');
            chairPile.setDisplaySize(192, 192);
            chairPile.setDepth(5);
            this.customImages.push(chairPile);
            
            // 贴图3：人偶堆（2个），位置1: X=2.5*64=160, Y=2*64=128；位置2: X=7.5*64=480, Y=5*64=320
            const dollPiles = [
                { x: 2.5 * 64, y: 2 * 64 },
                { x: 7.5 * 64, y: 5 * 64 }
            ];
            dollPiles.forEach(pos => {
                const dollPile = this.add.sprite(pos.x, pos.y, '人偶堆');
                dollPile.setDisplaySize(192, 128);
                dollPile.setDepth(5);
                this.customImages.push(dollPile);
            });
            
            // 贴图4：厅内芭菲车，位置X=16*64=1024, Y=2*64=128，大小128x128
            const parfaitCartIndoor = this.add.sprite(16 * 64, 2 * 64, '厅内芭菲车');
            parfaitCartIndoor.setDisplaySize(128, 128);
            parfaitCartIndoor.setDepth(5);
            this.customImages.push(parfaitCartIndoor);
            
            // 贴图5：俯视迈巴赫，位置X=7.5*64=480, Y=8*64=512，大小64x128
            const maybachTopView = this.add.sprite(7.5 * 64, 8 * 64, '俯视迈巴赫');
            maybachTopView.setDisplaySize(64, 128);
            maybachTopView.setDepth(5);
            this.customImages.push(maybachTopView);
            
            // 贴图5：maybach（2个），位置1: X=3*64=192, Y=9.5*64=608；位置2: X=13*64=832, Y=26.5*64=1696
            const newMaybachs = [
                { x: 3 * 64, y: 9.5 * 64 },
                { x: 13 * 64, y: 26.5 * 64 }
            ];
            newMaybachs.forEach(pos => {
                const maybach = this.add.sprite(pos.x, pos.y, 'maybach');
                maybach.setDisplaySize(128, 64);
                maybach.setDepth(5);
                this.customImages.push(maybach);
            });
        }

        // 在特殊关卡添加贴图
        else if (this.level === 4) {
            // 创建一个数组来存储所有贴图
            this.customImages = [];
            
            // 添加工位贴图（数量为13个）
            const workstationPositions = [
                {x: 13.5, y: 3.5},  
                {x: 13.5, y: 7.5},  
                {x: 17.5, y: 3.5},  
                {x: 17.5, y: 7.5},  
                {x: 21.5, y: 3.5},  
                {x: 21.5, y: 7.5},  
                {x: 25.5, y: 3.5},  
                {x: 25.5, y: 7.5},  
                {x: 4.5, y: 23.5},
                {x: 8.5, y: 23.5},  // 额外添加的工位
                {x: 4.5, y: 27.5},  // 额外添加的工位
                {x: 8.5, y: 27.5},  // 额外添加的工位
                {x: 14.5, y: 23.5}   // 额外添加的工位
            ];
            
            workstationPositions.forEach((pos, index) => {
                const workstation = this.add.image(pos.x * this.tile_Width, pos.y * this.tile_Height, '工位');
                workstation.setDepth(6); // 设置深度在地图tile之上
                workstation.setDisplaySize(192, 192); // 大小缩放为192*192
                this.customImages.push(workstation);
            });
            
            // 添加荣誉板贴图
            const honorBoard = this.add.image(26 * this.tile_Width, 23.5 * this.tile_Height, '荣誉板');
            honorBoard.setDepth(6); // 设置深度在地图tile之上
            honorBoard.setDisplaySize(256, 192); // 大小缩放为256*192
            this.customImages.push(honorBoard);
            
            // 添加公司大门贴图
            const companyGate = this.add.image(19.5 * this.tile_Width, 28.5 * this.tile_Height, '公司大门');
            companyGate.setDepth(6); // 设置深度在地图tile之上
            companyGate.setDisplaySize(192, 192); // 大小缩放为192*192
            this.customImages.push(companyGate);
            
            // 添加会议桌贴图
            const meetingTable = this.add.image(8 * this.tile_Width, 5.5 * this.tile_Height, '会议桌');
            meetingTable.setDepth(6); // 设置深度在地图tile之上
            meetingTable.setDisplaySize(256, 192); // 大小缩放为256*192
            this.customImages.push(meetingTable);
            
            // 添加进门闸机贴图
            const gateMachine = this.add.image(20 * this.tile_Width, 24.5 * this.tile_Height, '进门闸机');
            gateMachine.setDepth(6); // 设置深度在地图tile之上
            gateMachine.setDisplaySize(128, 64); // 大小缩放为128*64
            this.customImages.push(gateMachine);
            
            // 添加领导办公桌贴图
            const leaderDesk = this.add.image(11.5 * this.tile_Width, 14 * this.tile_Height, '领导办公桌');
            leaderDesk.setDepth(6); // 设置深度在地图tile之上
            leaderDesk.setDisplaySize(192, 128); // 大小缩放为192*128
            this.customImages.push(leaderDesk);
            
            // 添加领导沙发贴图
            const leaderSofa = this.add.image(11 * this.tile_Width, 16.5 * this.tile_Height, '领导沙发');
            leaderSofa.setDepth(6); // 设置深度在地图tile之上
            leaderSofa.setDisplaySize(128, 64); // 大小缩放为128*64
            this.customImages.push(leaderSofa);
            
            // 添加投影屏幕贴图
            const projectorScreen = this.add.image(8 * this.tile_Width, 1.5 * this.tile_Height, '投影屏幕');
            projectorScreen.setDepth(6); // 设置深度在地图tile之上
            projectorScreen.setDisplaySize(256, 192); // 大小缩放为256*192
            this.customImages.push(projectorScreen);
            
            // 添加饮水机贴图（2个）
            const waterDispenserPositions = [
                {x: 2.5, y: 11.5},
                {x: 29.5, y: 13.5}
            ];
            
            waterDispenserPositions.forEach(pos => {
                const waterDispenser = this.add.image(pos.x * this.tile_Width, pos.y * this.tile_Height, '饮水机');
                waterDispenser.setDepth(6); // 设置深度在地图tile之上
                waterDispenser.setDisplaySize(64, 128); // 大小缩放为64*128
                this.customImages.push(waterDispenser);
            });


        }

    }
            
    // 初始化黄瓜（在地图上显示时缩放为64*64）
    initCucumbers() {
        if (this.cucumbers) {
            this.cucumbers.getChildren().forEach(cucumber => {
                cucumber.setDisplaySize(64, 64);
            });
        }
    }
    
    // 初始化假面（在地图上显示时缩放为64*64）
    initMask() {
        if (this.mask) {
            this.mask.setDisplaySize(64, 64);
        }
    }
    // 初始化游戏控制和UI的方法
    initializeControlsAndUI() {
        // 设备监视
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        // 全场地块亮度控制按键
        this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        // 初始化事件日志
        this.initEventLog();
        
        // 初始化物品栏
        this.initInventory();
        console.log('UI systems initialized successfully');
    }

    // ---------- 初始化 Canvas（确保父容器 position: relative） ----------
    initializeCarCanvas() {
        console.log('initializeCarCanvas start');
        initializeCarCanvas_Logic.call(this);
    }

    // ---------- 预加载工具函数 ----------
    _preloadImage(src) {
        console.log('preloadImage start');
        return _preloadImage_Logic.call(this,src);
    }

    // ---------- 启动车辆动画（使用requestAnimationFrame timestamp） ----------
    async startCarAnimation(direction) {
        await startCarAnimation_Logic.call(this,direction);
    }

    // 清理车辆动画资源
    cleanupCarAnimation() {
        console.log('cleanupCarAnimation start');
        cleanupCarAnimation_Logic.call(this);
    }

    // 初始化游戏系统的方法（修复缩进）
    initializeGameSystems() {

        this.computeLight();
        if (this.level == 3){
            this.computeSearchLight();
        }
        this.updateT13Visibility(); // 更新t13元素的显示
        this.updateVisibility();
        
        // 检查是否应该激活白月光形态
        this.checkAndActivateWhiteMoonlightForm();
    }
    

    
    // 更新t13元素的显示，确保它们在riverzong等元素之上
    updateT13Visibility() {
        // 清空之前的t13元素
        this.t13Layer.clear(true, true);
        
        const mapData = levelData['level' + this.level];
        const tiles = mapData.tiles;
        
        // 遍历所有地图tile
        for (let y = 0; y < mapData.height; y++) {
            for (let x = 0; x < mapData.width; x++) {
                // 检查是否是t13元素（索引为13）
                if (tiles[y][x] === 13) {
                    // 创建t13元素的sprite并添加到t13Layer
                    const t13Sprite = this.add.sprite(
                        x * this.tile_Width + this.tile_Width / 2,
                        y * this.tile_Height + this.tile_Height / 2,
                        't13'
                    );
                    
                    // 设置深度为5，确保在riverzong(4)之上，但在shadow(5)和其他自定义图片(6)之下
                    t13Sprite.setDepth(5);
                    
                    // 添加到t13Layer组
                    this.t13Layer.add(t13Sprite);
                    
                    // 根据光照状态设置明暗效果
                    if (!this.isBright(x, y)) {
                        t13Sprite.setTint(0x808080);
                    }
                }
            }
        }
    }

    // 全场地块亮度控制函数
    setAllTilesBright(enable) {
        const mapData = levelData['level' + this.level];
        const width = mapData.width;
        const height = mapData.height;
        
        if (enable) {
            // 将所有地块设置为明亮状态
            this.brightTiles = Array.from({ length: height }, () => Array(width).fill(true));
            // 清除所有阴影效果
            this.shadowGroup.clear(true, true);
            console.log('全场所有地块已设置为明亮状态');
        } else {
            // 恢复正常光照计算
            this.computeLight();
            console.log('已恢复正常光照计算');
        }
    }

    // 添加月光变化
    computeLight() {
        computeLight_Logic.call(this, levelData);
    }

    computeSearchLight(){
        computeSearchLight_Logic.call(this, levelData);
    }

    // 新增：获取角色视野中的tile
    getVisionTiles(entityTileX, entityTileY, direction) {
        const visionTiles = [];
        let dx = 0, dy = 0;
        switch (direction) {
            case 'up':
                dy = -1;
                break;
            case 'down':
                dy = 1;
                break;
            case 'left':
                dx = -1;
                break;
            case 'right':
                dx = 1;
                break;
        }

        // 定义可以阻挡月光的tile编号
        const lightBlockingTiles = this.lightBlockingTiles;
        
        // 检查玩家是否拥有天文望远镜
        const hasTelescope = this.inventoryItemTypes && this.inventoryItemTypes['天文望远镜'] && this.inventoryItemTypes['天文望远镜'].count > 0;

        if (hasTelescope) {
            // 拥有天文望远镜时的视野：前方三格，左边一格，左前方一格，右边一格，右前方一格
            
            // 前方三格 - 检查阻挡月光的格子
            let blocked = false;
            for (let i = 1; i <= 3 && !blocked; i++) {
                const frontX = entityTileX + dx * i;
                const frontY = entityTileY + dy * i;
                
                if (this.isValidTile(frontX, frontY)) {
                    // 检查该格子是否阻挡月光
                    const mapData = levelData['level' + this.level];
                    const tileType = mapData.tiles[frontY][frontX];
                    
                    // 如果不是阻挡月光的格子，则添加到视野中
                    if (!lightBlockingTiles.includes(tileType)) {
                        visionTiles.push({ x: frontX, y: frontY });
                    } else {
                        // 如果是阻挡月光的格子，则停止向前延伸视野
                        blocked = true;
                    }
                }
            }

            // 两旁各1格（垂直于前进方向）
            const sideDx = dy;
            const sideDy = -dx;
            
            // 左边一格
            const leftSideX = entityTileX + sideDx;
            const leftSideY = entityTileY + sideDy;
            if (this.isValidTile(leftSideX, leftSideY)) {
                visionTiles.push({ x: leftSideX, y: leftSideY });
            }
            
            // 右边一格
            const rightSideX = entityTileX - sideDx;
            const rightSideY = entityTileY - sideDy;
            if (this.isValidTile(rightSideX, rightSideY)) {
                visionTiles.push({ x: rightSideX, y: rightSideY });
            }
            
            // 左前方一格
            const leftFrontX = entityTileX + dx + sideDx;
            const leftFrontY = entityTileY + dy + sideDy;
            if (this.isValidTile(leftFrontX, leftFrontY)) {
                visionTiles.push({ x: leftFrontX, y: leftFrontY });
            }
            
            // 右前方一格
            const rightFrontX = entityTileX + dx - sideDx;
            const rightFrontY = entityTileY + dy - sideDy;
            if (this.isValidTile(rightFrontX, rightFrontY)) {
                visionTiles.push({ x: rightFrontX, y: rightFrontY });
            }
        } else {
            // 未拥有天文望远镜时的视野：前方一格，左右两边各一格
            
            // 前方1格
            const frontX = entityTileX + dx;
            const frontY = entityTileY + dy;
            if (this.isValidTile(frontX, frontY)) {
                visionTiles.push({ x: frontX, y: frontY });
            }

            // 两旁各1格（垂直于前进方向）
            const sideDx = dy;
            const sideDy = -dx;
            const leftSideX = entityTileX + sideDx;
            const leftSideY = entityTileY + sideDy;
            if (this.isValidTile(leftSideX, leftSideY)) {
                visionTiles.push({ x: leftSideX, y: leftSideY });
            }
            const rightSideX = entityTileX - sideDx;
            const rightSideY = entityTileY - sideDy;
            if (this.isValidTile(rightSideX, rightSideY)) {
                visionTiles.push({ x: rightSideX, y: rightSideY });
            }
        }

        return visionTiles;
    }

    // 新增：检查tile是否有效（是地板）
    isValidTile(x, y) {
        const mapData = levelData['level' + this.level];
        // 定义可通行的tile
        const validTiles = this.validTiles;
        return x >= 0 && x < mapData.width && y >= 0 && y < mapData.height && validTiles.includes(mapData.tiles[y][x]);
    }

    // 更新玩家视野的可视化
    updatePlayerVision() {
        this.visionGroup.clear(true, true); // 清空旧的视野效果
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        // 如果玩家在黑暗中，为前后左右不阻挡月光的tile添加稍亮显示
        if (!this.isBright(playerTileX, playerTileY)) {
            const visionTiles = this.getVisionTiles(playerTileX, playerTileY, this.lastDirection);
            
            // 定义可以阻挡月光的tile编号
            const lightBlockingTiles = this.lightBlockingTiles;
            
            visionTiles.forEach(tile => {
                const mapData = levelData['level' + this.level];
                const tileType = mapData.tiles[tile.y][tile.x];
                
                // 只对不阻挡月光的tile添加稍亮效果
                if (!lightBlockingTiles.includes(tileType)) {
                    // 根据实际tile类型创建对应的高亮精灵（使用t1到t16的纹理）
                    const visionSprite = this.add.sprite(
                        tile.x * this.tile_Width + this.tile_Width / 2, 
                        tile.y * this.tile_Height + this.tile_Height / 2, 
                        't' + tileType
                    );
                    visionSprite.alpha = 0.7; // 半透明表示高亮效果
                    visionSprite.setDepth(6); // 设置深度高于阴影精灵，确保不被阴影覆盖
                    this.visionGroup.add(visionSprite);
                }
            });
        }
    }

    // 新增：检查鬼是否在角色视野中
    isGhostInVision(entityTileX, entityTileY, direction, ghostTileX, ghostTileY) {
        const visionTiles = this.getVisionTiles(entityTileX, entityTileY, direction);

        return visionTiles.some(tile => tile.x === ghostTileX && tile.y === ghostTileY);
    }

    // 新增：将鬼随机移动到暗处地板
    relocateGhostToDark() {
        const mapData = levelData['level' + this.level];
        const usedPositions = []; // 不限制鬼与其他实体的重叠
        let ghostPos = this.getRandomPosition(mapData, usedPositions, true); // requireDark = true
        
        // 如果没有找到阴暗处，改为寻找明亮处
        if (!ghostPos) {
            ghostPos = this.getRandomPosition(mapData, usedPositions, false); // requireDark = false
            if (ghostPos) {
                this.ghost.setPosition(ghostPos.x * this.tile_Width + this.tile_Width / 2, ghostPos.y * this.tile_Height + this.tile_Height / 2);
                console.log('No dark area found, ghost relocated to bright area:', ghostPos);
            } else {
                console.warn('No area found for ghost relocation');
            }
        } else {
            this.ghost.setPosition(ghostPos.x * this.tile_Width + this.tile_Width / 2, ghostPos.y * this.tile_Height + this.tile_Height / 2);
            console.log('Ghost relocated to dark area:', ghostPos);
        }
    }

    updateVisibility() {
        
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        const ghostTileX = Math.floor(this.ghost.x / this.tile_Width);
        const ghostTileY = Math.floor(this.ghost.y / this.tile_Height);
        let ghostVisible = this.isBright(ghostTileX, ghostTileY);
        
        // 先更新玩家视野效果，确保它在NPC下面渲染
        this.updatePlayerVision();
        
        // 如果鬼在暗处，检查是否在玩家视野中
        if (!ghostVisible) {

            if (this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, ghostTileX, ghostTileY)) {
                ghostVisible = true;
            }
        }

        // 第二关特殊逻辑：当莫提丝进入地图tile编号为24的格子时，不渲染（无论在月光下还是玩家视野中）
        if (this.level === 2) {
            const ghostTileIndex = this.map.getTileAt(ghostTileX, ghostTileY)?.index;
            if (ghostTileIndex === 24) {
                ghostVisible = false;
            }
        }

        this.ghost.setVisible(ghostVisible);

        this.npcs.getChildren().forEach(npc => {
            const npcTileX = Math.floor(npc.x / this.tile_Width);
            const npcTileY = Math.floor(npc.y / this.tile_Height);
            let npcVisible = this.isBright(npcTileX, npcTileY);
            
            // 跟随的NPC在任何情况下都可见
            if (npc.follow) {
                npcVisible = true;
            }
            // 非跟随的NPC：如果在玩家视野中，也可见
            else if (!npcVisible) {
                const isInPlayerVision = this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, npcTileX, npcTileY);
                if (isInPlayerVision) {
                    npcVisible = true;
                    console.log('npc在视野中！')
                }
            }
            
            npc.setVisible(npcVisible);
            // 确保NPC在可见时保持完全不透明且在视野效果之上渲染
            if (npcVisible) {
                npc.alpha = 1;
                npc.setDepth(10); // 设置NPC深度值大于视野效果的深度值(5)
            } else {
                // 不在视野中时可以保持默认透明度
                npc.alpha = 1; // 强制所有NPC保持完全不透明
                npc.setDepth(10); // 无论是否可见都保持相同深度
            }
        });

        // 更新贴图的暗处效果
        if (this.customImages && this.customImages.length > 0) {
            this.customImages.forEach(image => {
                const tileX = Math.floor(image.x / this.tile_Width);
                const tileY = Math.floor(image.y / this.tile_Height);
                
                // 检查贴图所在的tile是否明亮
                if (this.isBright(tileX, tileY)) {
                    // 明亮处：移除暗色效果
                    image.clearTint();
                } else {
                    // 暗处：添加暗色效果（使用setTint而不是降低透明度）
                    // 稍微调高亮度，使用较亮的灰色调
                    image.setTint(0x808080);
                }
            });
        }
    }

    isBright(x, y) {
        // 保持与computeLight方法一致的索引顺序 [y][x]
        return this.brightTiles[y] && this.brightTiles[y][x] ? true : false;
    }

    // 移动实体（支持平滑移动和完成回调）
    moveEntity(entity, dx, dy, onComplete = null) {
        const currentX = Math.floor(entity.x / this.tile_Width);
        const currentY = Math.floor(entity.y / this.tile_Height);
        const newX = currentX + dx;
        const newY = currentY + dy;
        let validTiles = [];
        // 定义可通行的tile
        // 为mortis创建包含tile 24的临时可通行tile列表
        const mortisValidTiles = [...this.validTiles, 24];
        // 判断当前实体是否是ghost（mortis）
        const isGhost = entity === this.ghost;

        // 为丰川祥子创建包含tile 52的临时可通行tile列表
        const fengchuanValidTiles = [...this.validTiles, 52];
        // 判断当前实体是否是丰川祥子（ghost）
        const isFengchuan = entity === this.player;

        if (isGhost) {
            // 如果是ghost，使用扩展的可通行列表；否则使用原来的列表
            validTiles = mortisValidTiles;
        }
        else if (isFengchuan && this.level === 4) {
            // 如果是丰川祥子，使用扩展的可通行列表；否则使用原来的列表
            validTiles = fengchuanValidTiles;
        }
        else {
            // 其他情况，使用默认的可通行列表
            validTiles = this.validTiles;
        }

        // 获取目标tile的索引
        const targetTileIndex = this.map.getTileAt(newX, newY)?.index;
        
        // 检查是否是52号tile
        const isTile52 = targetTileIndex === 52;
        
        // 检查是否是向上移动
        const isMovingUp = dy === -1;
        
        // 检查目标位置是否与任何贴图重叠
        let isOverlappingAnyImage = false;
        let isOverlappingMaybach = false;
        if (this.customImages && this.customImages.length > 0) {
            const targetWorldX = newX * this.tile_Width + this.tile_Width / 2;
            const targetWorldY = newY * this.tile_Height + this.tile_Height / 2;
            
            for (const image of this.customImages) {
                if (image.texture.key === 'yuqiudamen') continue;
                // 计算贴图的边界
                const imageHalfWidth = image.displayWidth / 2;
                const imageHalfHeight = image.displayHeight / 2;
                const imageLeft = image.x - imageHalfWidth;
                const imageRight = image.x + imageHalfWidth;
                const imageTop = image.y - imageHalfHeight;
                const imageBottom = image.y + imageHalfHeight;
                
                // 检查目标位置是否在贴图范围内
                if (targetWorldX >= imageLeft && targetWorldX <= imageRight && targetWorldY >= imageTop && targetWorldY <= imageBottom) {
                    isOverlappingAnyImage = true;
                    console.log('目标位置：', targetWorldX, targetWorldY, '贴图尺寸：', imageLeft, imageRight, imageTop, imageBottom);
                    // 检查是否是maybach或俯视迈巴赫贴图
                    if (image.texture && (image.texture.key === 'maybach' || image.texture.key === '俯视迈巴赫')) {
                        isOverlappingMaybach = true;
                    }
                    break;
                }
            }
        }
        
        // 检查玩家是否持有迈巴赫钥匙
        const hasMaybachKey = this.inventoryItemTypes && this.inventoryItemTypes['迈巴赫钥匙'];
        // 检查玩家是否持有空啤酒罐
        const hasEmptyBeerCan = this.inventoryItemTypes && this.inventoryItemTypes['空啤酒罐'];
        
        // 检查是否是51号tile
        const isTile51 = targetTileIndex === 51;
        
        // 检查是否是从[tileX,tileY]=[18,13]向左移动到51号tile
        const isMovingToSecretRoom = currentX === 18 && currentY === 13 && dx === -1 && dy === 0 && isTile51 && this.level === 4;
        
        // 移动条件：
        // 1. 位置在地图范围内
        // 2. 目标tile在可通行列表中
        // 3. 如果与贴图重叠：
        //    a. 如果是maybach或俯视迈巴赫贴图，玩家必须持有迈巴赫钥匙
        //    b. 如果是其他贴图，无论是否持有钥匙都不能通行
        // 4. 如果不与任何贴图重叠，正常通行
        // 5. 特殊处理：51号tile（秘密房间），玩家持有空啤酒罐时可以通行
        let canMove = false;
        if (newX >= 0 && newX < levelData['level' + this.level].width && newY >= 0 && newY < levelData['level' + this.level].height) {
            // 特殊处理51号tile
            if (isTile51) {
                // 只有玩家持有空啤酒罐时才能通过51号tile
                canMove = hasEmptyBeerCan;
            } else if (validTiles.includes(this.map.getTileAt(newX, newY)?.index)||isOverlappingMaybach) {
                if (isOverlappingAnyImage) {
                    // 如果与贴图重叠
                    if (isOverlappingMaybach) {
                        // 如果是maybach或俯视迈巴赫贴图，需要持有迈巴赫钥匙
                        canMove = hasMaybachKey;
                    } else {
                        // 如果是其他贴图，不能通行
                        canMove = false;
                    }
                } else {
                    // 如果不与任何贴图重叠，正常通行
                    canMove = true;
                }
            }
        }
        
        if (canMove) {
            // 保存原始旋转角度
            const originalRotation = entity.rotation;
            
            // 移动动画持续时间
            const duration = 200;
            
            // 判断是否需要添加旋转动画（仅在横向移动时添加旋转效果）
            if (dx !== 0) {
                // 根据角色朝向确定旋转方向
                // 如果是玩家，使用flipX属性判断朝向
                // 如果是NPC或其他实体，同样使用flipX属性
                const isFacingLeft = (dx < 0) || (entity.flipX && (dx = 0))
                
                // 向左移动时（面朝左），逆时针旋转20°再回到0°
                // 向右移动时（面朝右），顺时针旋转20°再回到0°
                const rotationAngle = isFacingLeft ? -20 * Math.PI / 180 : 20 * Math.PI / 180;
                
                // 创建旋转动画序列
                this.tweens.timeline({
                    targets: entity,
                    tweens: [
                        // 第一部分：移动和旋转到最大角度
                        {
                            x: newX * this.tile_Width + this.tile_Width / 2,
                            y: newY * this.tile_Height + this.tile_Height / 2,
                            rotation: originalRotation + rotationAngle,
                            duration: duration / 2,
                            ease: 'Linear'
                        },
                        // 第二部分：继续移动并旋转回原始角度
                        {
                            rotation: originalRotation,
                            duration: duration / 2,
                            ease: 'Linear',
                            onComplete: () => {
                                // 检查是否是玩家从[tileX,tileY]=[18,13]向左移动到51号tile
                                if (isFengchuan && isMovingToSecretRoom) {
                                    if (hasEmptyBeerCan) {
                                        // 持有空啤酒罐，认证通过
                                        this.addEvent('用空啤酒罐通过了秘密房间的认证！');
                                    } else {
                                        // 未持有空啤酒罐，无权限
                                        this.addEvent('秘密房间：无权限，需要丰川清告的指纹');
                                    }
                                }
                                // 检查是否应该激活白月光形态
                                this.checkAndActivateWhiteMoonlightForm();
                                
                                // 调用原始的完成回调
                                if (onComplete) onComplete();
                            }
                        }
                    ]
                });
            } else {
                // 上下移动时，只进行位置移动，不添加旋转效果
                this.tweens.add({
                    targets: entity,
                    x: newX * this.tile_Width + this.tile_Width / 2,
                    y: newY * this.tile_Height + this.tile_Height / 2,
                    duration: duration,
                    ease: 'Linear',
                    onComplete: () => {
                        // 检查是否是玩家进入52号tile并且方向向上
                                if (isFengchuan && isTile52 && isMovingUp && this.level === 4) {
                                    // 在事件栏中输出信息
                                    this.addEvent('董事办公室：丰川祥子，认证通过');
                                }
                                // 检查是否是玩家从[tileX,tileY]=[18,13]向左移动到51号tile
                                if (isFengchuan && isMovingToSecretRoom) {
                                    if (hasEmptyBeerCan) {
                                        // 持有空啤酒罐，认证通过
                                        this.addEvent('使用空啤酒罐通过了秘密房间的认证！');
                                    } else {
                                        // 未持有空啤酒罐，无权限
                                        this.addEvent('秘密房间：无权限，需要丰川清告的指纹');
                                    }
                                }
                                // 检查是否应该激活白月光形态
                                this.checkAndActivateWhiteMoonlightForm();
                                
                                // 调用原始的完成回调
                                if (onComplete) onComplete();
                    }
                });
            }
            
            return true;
        } else {
            // 移动到不可通行地块，添加撞墙动画效果
            const originalX = entity.x;
            const originalY = entity.y;
            
            // 计算撞墙方向的小移动：向目标方向移动10像素
            const pushDistance = 10;
            const pushX = originalX + dx * pushDistance;
            const pushY = originalY + dy * pushDistance;
            
            // 创建撞墙动画序列：先前进10像素，再退回原位
            this.tweens.timeline({
                targets: entity,
                tweens: [
                    // 第一部分：向目标方向移动一小段距离
                    {
                        x: pushX,
                        y: pushY,
                        duration: 80,
                        ease: 'Linear'
                    },
                    // 第二部分：退回到原始位置
                    {
                        x: originalX,
                        y: originalY,
                        duration: 80,
                        ease: 'Linear',
                        onComplete: onComplete
                    }
                ]
            });
            
            return false;
        }
        
        return false;
    }
    
    // 直接设置实体位置（用于NPC队列跟随）
    setEntityPosition(entity, x, y, onComplete = null) {
        this.tweens.add({
            targets: entity,
            x: x,
            y: y,
            duration: 200,
            ease: 'Linear',
            onComplete: onComplete // 添加完成回调
        });
    }
    
    // 计算NPC在队列中的位置
    calculateNPCPosition(playerX, playerY, direction, index) {
        const tileWidth = this.tile_Width;
        const tileHeight = this.tile_Height;
        const halfTile = 32; // 半个格子的像素数
        console.log(playerX, playerY,'index:',index);
        
        // 根据玩家方向和NPC索引计算位置
        switch (direction) {
            case 'up':
                return {
                    x: playerX,
                    y: playerY + (index + 1) * halfTile // 玩家向上，NPC在下方跟随
                };
            case 'down':
                return {
                    x: playerX,
                    y: playerY - (index + 1) * halfTile // 玩家向下，NPC在上方跟随
                };
            case 'left':
                return {
                    x: playerX + (index + 1) * halfTile, // 玩家向左，NPC在右侧跟随
                    y: playerY
                };
            case 'right':
                return {
                    x: playerX - (index + 1) * halfTile, // 玩家向右，NPC在左侧跟随
                    y: playerY
                };
            default:
                return { x: playerX, y: playerY };
        }
        
    }
    
    // 移动跟随的NPC队列，支持完成回调
    moveNPCsInQueue(onComplete = null) {
        
        const followingNPCs = this.npcs.getChildren().filter(npc => npc.follow);
        const playerX = this.player.x;
        const playerY = this.player.y;
        // 设置玩家图层在最上方
        this.player.setDepth(20);
        
        if (followingNPCs.length === 0) {
            // 如果没有跟随的NPC，直接调用完成回调
            if (onComplete) onComplete();
            return;
        }
        
        let completedNPCs = 0;
        
        // 按照招募顺序移动NPC并设置图层深度
        followingNPCs.forEach((npc, index) => {
            const targetPos = this.calculateNPCPosition(playerX, playerY, this.lastDirection, index);
            console.log(npc.name,' Tarlocation:',targetPos.x,targetPos.y)
            
            // 在移动开始前立即设置NPC朝向，确保朝向正确
            if (this.lastDirection === 'left') {
                npc.flipX = true; // 向左移动时，镜像反转NPC
            } else if (this.lastDirection === 'right') {
                npc.flipX = false; // 向右移动时，不反转NPC
            }
            // 向上或向下移动时，保持当前朝向不变
            
            // 平滑移动NPC到目标位置
            // 使用回调函数在动画完成后获取最终位置
            this.setEntityPosition(npc, targetPos.x, targetPos.y, () => {
                console.log(npc.name,' Final location after animation:',npc.x,npc.y);
                
                // 再次确认NPC朝向，防止在移动过程中被其他操作覆盖
                if (this.lastDirection === 'left') {
                    npc.flipX = true;
                } else if (this.lastDirection === 'right') {
                    npc.flipX = false;
                }
                
                completedNPCs++;
                // 当所有NPC都完成移动后调用回调
                if (completedNPCs === followingNPCs.length && onComplete) {
                    onComplete();
                }
            });
            
            // 注意：这里立即打印的位置仍然是NPC的当前位置，而不是目标位置
            // 因为Phaser的tween动画是异步执行的
            console.log(npc.name,' Current location before animation:',npc.x,npc.y)
            
            // 设置图层深度：越早招募的NPC图层越靠上，但都在玩家下方
            npc.setDepth(19 - index);
        });
    }

    moveNPCsNotFollow(npc) {
        // 检查若叶睦是否站在黄瓜上
        if (npc.name === '若叶睦') {
            this.checkNpcCucumberCollision(npc);
        }
        
        // 三角初华自动追踪玩家（使用A*路径算法）
        if (npc.name === '三角初华') {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            const npcTileX = Math.floor(npc.x / this.tile_Width);
            const npcTileY = Math.floor(npc.y / this.tile_Height);
            
            let dx = 0;
            let dy = 0;
            
            // 使用A*路径算法寻找最佳路径
            let pathToPlayer = null;
            this.pathFinder.findPath(npcTileX, npcTileY, playerTileX, playerTileY, path => {
                pathToPlayer = path;
            });
            this.pathFinder.calculate();
            
            // 如果找到路径且路径长度足够
            if (pathToPlayer && pathToPlayer.length > 1) {
                // 获取下一步应该移动到的位置
                const nextStep = pathToPlayer[1]; // pathToPlayer[0]是当前位置
                
                // 计算移动方向
                if (npcTileX < nextStep.x) dx = 1;
                else if (npcTileX > nextStep.x) dx = -1;
                else if (npcTileY < nextStep.y) dy = 1;
                else if (npcTileY > nextStep.y) dy = -1;
                
                // 尝试移动
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            } else {
                console.log('No path found for 三角初华 to player');
                // 如果没有找到路径，仍然使用简单的追踪逻辑作为后备
                if (npcTileX < playerTileX) dx = 1;
                else if (npcTileX > playerTileX) dx = -1;
                else if (npcTileY < playerTileY) dy = 1;
                else if (npcTileY > playerTileY) dy = -1;
                
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            }
        }
        // 若叶睦在玩家持有素世的香水时自动追踪玩家（使用A*路径算法）
        else if (npc.name === '若叶睦' && this.inventoryItemTypes && this.inventoryItemTypes['素世的香水'] && this.inventoryItemTypes['素世的香水'].count > 0) {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            const npcTileX = Math.floor(npc.x / this.tile_Width);
            const npcTileY = Math.floor(npc.y / this.tile_Height);
            
            let dx = 0;
            let dy = 0;
            
            // 使用A*路径算法寻找最佳路径
            let pathToPlayer = null;
            this.pathFinder.findPath(npcTileX, npcTileY, playerTileX, playerTileY, path => {
                pathToPlayer = path;
            });
            this.pathFinder.calculate();
            
            // 如果找到路径且路径长度足够
            if (pathToPlayer && pathToPlayer.length > 1) {
                // 获取下一步应该移动到的位置
                const nextStep = pathToPlayer[1]; // pathToPlayer[0]是当前位置
                
                // 计算移动方向
                if (npcTileX < nextStep.x) dx = 1;
                else if (npcTileX > nextStep.x) dx = -1;
                else if (npcTileY < nextStep.y) dy = 1;
                else if (npcTileY > nextStep.y) dy = -1;
                
                // 尝试移动
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            } else {
                console.log('No path found for 若叶睦 to player');
                // 如果没有找到路径，仍然使用简单的追踪逻辑作为后备
                if (npcTileX < playerTileX) dx = 1;
                else if (npcTileX > playerTileX) dx = -1;
                else if (npcTileY < playerTileY) dy = 1;
                else if (npcTileY > playerTileY) dy = -1;
                
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            }
        }
        // 八幡海玲在玩家持有巧克力奶时自动追踪玩家（使用A*路径算法）
        else if (npc.name === '八幡海玲' && this.inventoryItemTypes && this.inventoryItemTypes['巧克力奶'] && this.inventoryItemTypes['巧克力奶'].count > 0) {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            const npcTileX = Math.floor(npc.x / this.tile_Width);
            const npcTileY = Math.floor(npc.y / this.tile_Height);
            
            let dx = 0;
            let dy = 0;
            
            // 使用A*路径算法寻找最佳路径
            let pathToPlayer = null;
            this.pathFinder.findPath(npcTileX, npcTileY, playerTileX, playerTileY, path => {
                pathToPlayer = path;
            });
            this.pathFinder.calculate();
            
            // 如果找到路径且路径长度足够
            if (pathToPlayer && pathToPlayer.length > 1) {
                // 获取下一步应该移动到的位置
                const nextStep = pathToPlayer[1]; // pathToPlayer[0]是当前位置
                
                // 计算移动方向
                if (npcTileX < nextStep.x) dx = 1;
                else if (npcTileX > nextStep.x) dx = -1;
                else if (npcTileY < nextStep.y) dy = 1;
                else if (npcTileY > nextStep.y) dy = -1;
                
                // 尝试移动
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            } else {
                console.log('No path found for 八幡海玲 to player');
                // 如果没有找到路径，仍然使用简单的追踪逻辑作为后备
                if (npcTileX < playerTileX) dx = 1;
                else if (npcTileX > playerTileX) dx = -1;
                else if (npcTileY < playerTileY) dy = 1;
                else if (npcTileY > playerTileY) dy = -1;
                
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            }
        }
        // 白月光形态下，若叶睦、八幡海玲、佑天寺若麦自动追踪玩家（使用A*路径算法）
        else if (this.whiteMoonlightFormActive && ['若叶睦', '八幡海玲', '佑天寺若麦'].includes(npc.name)) {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            const npcTileX = Math.floor(npc.x / this.tile_Width);
            const npcTileY = Math.floor(npc.y / this.tile_Height);
            
            let dx = 0;
            let dy = 0;
            
            // 使用A*路径算法寻找最佳路径
            let pathToPlayer = null;
            this.pathFinder.findPath(npcTileX, npcTileY, playerTileX, playerTileY, path => {
                pathToPlayer = path;
            });
            this.pathFinder.calculate();
            
            // 如果找到路径且路径长度足够
            if (pathToPlayer && pathToPlayer.length > 1) {
                // 获取下一步应该移动到的位置
                const nextStep = pathToPlayer[1]; // pathToPlayer[0]是当前位置
                
                // 计算移动方向
                if (npcTileX < nextStep.x) dx = 1;
                else if (npcTileX > nextStep.x) dx = -1;
                else if (npcTileY < nextStep.y) dy = 1;
                else if (npcTileY > nextStep.y) dy = -1;
                
                // 尝试移动
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            } else {
                console.log(`No path found for ${npc.name} to player`);
                // 如果没有找到路径，仍然使用简单的追踪逻辑作为后备
                if (npcTileX < playerTileX) dx = 1;
                else if (npcTileX > playerTileX) dx = -1;
                else if (npcTileY < playerTileY) dy = 1;
                else if (npcTileY > playerTileY) dy = -1;
                
                if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dy === 1) dirStr = 'down';
                    else if (dy === -1) dirStr = 'up';
                    else if (dx === 1) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
            }
        } else {
            // 其他NPC随机移动
            const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            const dirIndex = Math.floor(Math.random() * 4);
            const [dx, dy] = directions[dirIndex];
            if (this.moveEntity(npc, dx, dy)) {
                    let dirStr;
                    if (dirIndex === 0) dirStr = 'down';
                    else if (dirIndex === 1) dirStr = 'up';
                    else if (dirIndex === 2) {
                        dirStr = 'right';
                        npc.flipX = false; // 向右移动时，不反转NPC
                    } else {
                        dirStr = 'left';
                        npc.flipX = true; // 向左移动时，镜像反转NPC
                    }
                    this.npcDirections[npc.name] = dirStr;
                    // 向上或向下移动时，保持当前朝向不变
                }
        }
        
        // NPC移动后更新可视性
        this.updateVisibility();
    }

    moveGhost(){
        // 鬼移动
        let ghostTileX = Math.floor(this.ghost.x / this.tile_Width);
        let ghostTileY = Math.floor(this.ghost.y / this.tile_Height);
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        let minPathLength = Infinity;
        let closestPath = null;
        let closest = this.player;

        // 检查莫提丝是否站在黄瓜上（如果已经开始捡黄瓜）
        if (this.ghost.startsCollectingCucumbers) {
            this.checkGhostCucumberCollision();
        }

        //计算与鬼路径最近的角色的路径
        let playerPath = null;
        // 为mortis创建临时可通行tile列表，包含tile 24
        const mortisValidTiles = [...this.validTiles, 24];
        // 临时设置mortis的可通行tile
        this.pathFinder.setAcceptableTiles(mortisValidTiles);
        this.pathFinder.findPath(ghostTileX, ghostTileY, playerTileX, playerTileY, path => {
            playerPath = path;
        });
        this.pathFinder.calculate();
        // 恢复原来的可通行tile列表
        this.pathFinder.setAcceptableTiles(this.validTiles);
        if (playerPath && playerPath.length > 1) {
            minPathLength = playerPath.length - 1;
            closestPath = playerPath;
        } else {
            console.warn('No path to player');
        }
        this.npcs.getChildren().forEach(npc => {
            // 排除若叶睦、已经免疫的佑天寺若麦和新角色作为追踪目标
            const protectedNPCs = ['若叶睦', '高松灯', '千早爱音', '长崎素世', '要乐奈', '椎名立希', '纯田真奈'];
            if (npc.active && !npc.follow && !protectedNPCs.includes(npc.name) && !(npc.name === '佑天寺若麦' && npc.isAttackImmune)) {
                const npcTileX = Math.floor(npc.x / this.tile_Width);
                const npcTileY = Math.floor(npc.y / this.tile_Height);
                
                // 对于八幡海玲，只有当距离小于5格时才追踪（Δx<=5且Δy<=5）
                if (npc.name === '八幡海玲') {
                    const deltaX = Math.abs(npcTileX - ghostTileX);
                    const deltaY = Math.abs(npcTileY - ghostTileY);
                    // 如果距离大于5格，跳过这个NPC
                    if (deltaX > 5 || deltaY > 5) {
                        return;
                    }
                }
                
                let npcPath = null;
                // 为mortis创建临时可通行tile列表，包含tile 24
                const mortisValidTiles = [...this.validTiles, 24];
                // 临时设置mortis的可通行tile
                this.pathFinder.setAcceptableTiles(mortisValidTiles);
                this.pathFinder.findPath(ghostTileX, ghostTileY, npcTileX, npcTileY, path => {
                    npcPath = path;
                });
                this.pathFinder.calculate();
                // 恢复原来的可通行tile列表
                this.pathFinder.setAcceptableTiles(this.validTiles);
                if (npcPath && npcPath.length > 1 && (npcPath.length - 1) < minPathLength) {
                    minPathLength = npcPath.length - 1;
                    closestPath = npcPath;
                    closest = npc;
                }
            }
        });

        // 直接进入移动逻辑，不再在移动前检查视野
        if (closestPath && closestPath.length > 1) {
            // 调试信息：记录当前鬼的位置和亮度状态
            const isBrightValue = this.isBright(ghostTileX, ghostTileY);
            // 与computeLight方法一致的索引顺序 [y][x]
            const brightTilesValue = this.brightTiles[ghostTileY] && this.brightTiles[ghostTileY][ghostTileX] ? 'true' : 'false';
            console.log(`Ghost position: (${ghostTileX}, ${ghostTileY}), isBright: ${isBrightValue}, brightTiles[${ghostTileY}][${ghostTileX}] = ${brightTilesValue}`);
            
            // 计算Mortis的移动速度
            // 在白月光形态下，Mortis在明亮地块的移动速度保持为1
            let moves, maxMoves;
            if (this.whiteMoonlightFormActive && isBrightValue) {
                moves = 1;
                maxMoves = 1;
                console.log(`白月光形态激活，Mortis在明亮地块的移动速度为1`);
            } else {
                moves = isBrightValue ? 2 : 1;
                maxMoves = isBrightValue ? 2 : 1;
                console.log(`Calculated moves: ${moves}, path length: ${closestPath.length}`);
            }
            
            let successfulMoves = 0;
            let currentStep = 1;
            
            // 使用递归函数来确保移动是串行执行的
            const moveGhostStep = () => {
                if (currentStep > maxMoves || currentStep >= closestPath.length) {
                    // 所有步骤完成或路径长度不足
                    console.log(`Turn completed: Mortis moved ${successfulMoves}/${maxMoves} possible steps`);
                    
                    // 新增：检查Mortis是否在玩家或NPC视野中
                    const playerTileX = Math.floor(this.player.x / this.tile_Width);
                    const playerTileY = Math.floor(this.player.y / this.tile_Height);
                    const currentGhostTileX = Math.floor(this.ghost.x / this.tile_Width);
                    const currentGhostTileY = Math.floor(this.ghost.y / this.tile_Height);
                    
                    // 检查Mortis当前所在格子的ID
                    const ghostTileIndex = this.map.getTileAt(currentGhostTileX, currentGhostTileY)?.index;
                    
                    // 检查Mortis是否在明亮处
                    const isGhostInBright = this.isBright(currentGhostTileX, currentGhostTileY);
                    
                    // 特殊功能：当Mortis处于编号为24的格子上时，即使在视野中也不会被随机传送
                    const isOnTile24 = ghostTileIndex === 24;
                    
                    // 检查Mortis是否在第二关的指定范围内
                    const isInSecondLevelRestrictedArea = this.level === 2 && 
                                                      currentGhostTileX >= 23 && currentGhostTileX <= 29 && 
                                                      currentGhostTileY >= 9 && currentGhostTileY <= 16;
                    
                    // 检查Mortis是否在玩家或NPC视野中
                    let isInVision = false;
                    
                    // 检查是否在玩家视野中
                    if (this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, currentGhostTileX, currentGhostTileY)) {
                        isInVision = true;
                    }
                    
                    // 检查是否在NPC视野中（特别是三角初华、若叶睦、佑天寺若麦、八幡海玲）
                    this.npcs.getChildren().forEach(npc => {
                        if (npc.active && !npc.follow) {
                            const npcTileX = Math.floor(npc.x / this.tile_Width);
                            const npcTileY = Math.floor(npc.y / this.tile_Height);
                            const npcDirection = this.npcDirections[npc.name] || 'right';
                            if (this.isGhostInVision(npcTileX, npcTileY, npcDirection, currentGhostTileX, currentGhostTileY)) {
                                isInVision = true;
                            }
                        }
                    });
                    
                    // 如果Mortis在暗处、在视野中、不在24号格子上，且不在第二关的指定范围内，才随机转移到阴影处
                    // 当Mortis在明亮处、在24号格子上、或在第二关的指定范围内时，即使在视野中也不会传送
                    if (!isGhostInBright && 
                        isInVision && 
                        !isOnTile24 && 
                        !isInSecondLevelRestrictedArea) {
                        console.log('Mortis is in vision (player or NPC) and in dark area, relocating to dark area');
                        this.relocateGhostToDark();
                        
                        // 转移后使用较短的延时再允许玩家控制
                        this.time.delayedCall(200, () => {
                            this.turnInProgress = false; // 标记回合结束
                        });
                    } else {
                        // 如果在明亮处或在24号格子上，添加日志说明
                        if (isGhostInBright) {
                            console.log('Mortis is in bright area, will not relocate even if in vision');
                        } else if (isOnTile24) {
                            console.log('Mortis is on tile 24, will not relocate even if in vision');
                        } else if (isInSecondLevelRestrictedArea) {
                            console.log('Mortis is in second level restricted area (25<=x<=31, 9<=y<=16), will not relocate even if in vision');
                        } else if (!isInVision) {
                            console.log('Mortis is not in vision, will not relocate');
                        }
                        // 不在视野中，使用常规延时
                        // 使用Phaser的计时器功能添加0.5秒延时后再允许玩家控制
                        this.time.delayedCall(500, () => {
                            this.turnInProgress = false; // 标记回合结束
                        });
                    }
                    return;
                }
                
                console.log(`Mortis is attempting to move step: ${currentStep}/${maxMoves}`);
                // 计算从当前位置到路径上对应点的方向
                const nextPathPoint = closestPath[currentStep];
                let dx = 0;
                let dy = 0;
                
                // 根据当前位置和目标路径点计算移动方向
                if (ghostTileX < nextPathPoint.x) dx = 1;
                else if (ghostTileX > nextPathPoint.x) dx = -1;
                
                if (ghostTileY < nextPathPoint.y) dy = 1;
                else if (ghostTileY > nextPathPoint.y) dy = -1;
                
                // 如果已经到达路径点，尝试移动到下一个点
                if (dx === 0 && dy === 0 && currentStep + 1 < closestPath.length) {
                    const nextNextPoint = closestPath[currentStep + 1];
                    if (ghostTileX < nextNextPoint.x) dx = 1;
                    else if (ghostTileX > nextNextPoint.x) dx = -1;
                    
                    if (ghostTileY < nextNextPoint.y) dy = 1;
                    else if (ghostTileY > nextNextPoint.y) dy = -1;
                }
                
                console.log(`Moving from (${ghostTileX}, ${ghostTileY}) with direction: dx=${dx}, dy=${dy}`);
                
                // 使用回调函数确保移动完成后再进行下一步
                const moveComplete = () => {
                    ghostTileX += dx;
                    ghostTileY += dy;
                    successfulMoves++;
                    console.log(`Mortis has successfully moved to: (${ghostTileX}, ${ghostTileY}), total successful moves: ${successfulMoves}`);
                    currentStep++;
                    moveGhostStep(); // 递归执行下一步移动
                };
                
                // 根据移动方向设置Mortis的朝向
                if (dx < 0) {
                    this.ghost.flipX = true; // 向左移动时，镜像反转
                } else if (dx > 0) {
                    this.ghost.flipX = false; // 向右移动时，不反转
                }
                // 向上或向下移动时，保持当前朝向不变
                
                if (this.moveEntity(this.ghost, dx, dy, moveComplete)) {
                    // 移动已开始，将在回调中更新位置
                } else {
                    console.log(`Mortis failed to move in direction: dx=${dx}, dy=${dy}`);
                    // 移动失败，继续下一步
                    currentStep++;
                    moveGhostStep();
                }
            };
            
            // 功能2：仅限第二关，根据Mortis与玩家的距离切换贴图
                if (this.level === 2) {
                    const playerTileX = Math.floor(this.player.x / this.tile_Width);
                    const playerTileY = Math.floor(this.player.y / this.tile_Height);
                    const ghostTileX = Math.floor(this.ghost.x / this.tile_Width);
                    const ghostTileY = Math.floor(this.ghost.y / this.tile_Height);
                    
                    // 计算与玩家的距离（ΔTileX且ΔTileY <= 3）
                    const deltaX = Math.abs(ghostTileX - playerTileX);
                    const deltaY = Math.abs(ghostTileY - playerTileY);
                    
                    // 如果在三格范围内，使用笑脸贴图
                    if (deltaX <= 3 && deltaY <= 3) {
                        this.mortisDoll.setTexture('莫提斯玩偶笑');
                    } else {
                        // 否则使用普通贴图
                        this.mortisDoll.setTexture('莫提斯玩偶');
                    }
                }
                
                // 开始移动过程
            moveGhostStep();
        } else {
            console.warn('No closest path found, ghost stays');
            // 即使没有路径，也添加0.5秒延时后再允许玩家控制
            this.time.delayedCall(500, () => {
                this.turnInProgress = false; // 如果没有路径，确保回合结束
            });
        }
                // 检查鬼和黄瓜的碰撞（如果已经开始捡黄瓜）
        if (this.ghost.startsCollectingCucumbers) {
            this.checkGhostCucumberCollision();
        }
        
        // Mortis移动后更新可视性
        this.updateVisibility();

        // 确保回合结束时重置状态
            if (closestPath) {
                // 鬼移动逻辑会在完成后设置turnInProgress = false
            } else {
                // 即使没有路径，也添加0.5秒延时后再允许玩家控制
                this.time.delayedCall(500, () => {
                    this.turnInProgress = false;
                });
            }
            this.turn++;
            
            // 检查并更新交通灯状态
            if (this.level === 1){
            this.updateTrafficLightState();
            }
            
            // 回合数更新后重新计算光照，确保探照灯正确显示
            if (this.level == 3){
                this.computeSearchLight();
            }
    }
    
    // 根据回合数更新交通灯状态
    updateTrafficLightState() {
        const currentRound = this.turn;
        let lightState = '';
        
        // 根据当前回合数确定交通灯状态
        // 0-8回合：红灯亮
        // 第9回合：黄灯亮
        // 10-18回合：绿灯亮
        // 第19回合：黄灯亮
        // 以此类推
        const cyclePosition = currentRound % 20;

        if (cyclePosition >= 0 && cyclePosition <= 8) {
            lightState = '红灯亮';
        } else if (cyclePosition === 9 || cyclePosition === 19) {
            lightState = '黄灯亮';
        } else if (cyclePosition >= 10 && cyclePosition <= 18) {
            lightState = '绿灯亮';
        }
        
        
        // 更新交通灯贴图
        if (this.trafficLight && lightState) {
            this.trafficLight.setTexture(lightState);
            console.log(`回合 ${currentRound}，交通灯切换为: ${lightState}`);
        }
    }


    // 玩家与黄瓜的碰撞检测
    checkPlayerCucumberCollision() {
        let cucumberCollided = false;
        this.cucumbers.getChildren().forEach(cucumber => {
            const cucumberTileX = Math.floor(cucumber.x / this.tile_Width);
            const cucumberTileY = Math.floor(cucumber.y / this.tile_Height);
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            
            if (cucumberTileX === playerTileX && cucumberTileY === playerTileY) {
                cucumber.destroy();
                this.col_cucumbers++;
                this.total_cucumber++;
                cucumberCollided = true;
                console.log(`Player collected cucumber, total: ${this.col_cucumbers}, cumulative: ${this.total_cucumber}`);
                
                // 添加黄瓜到物品栏
                this.addInventoryItem('cucumber', 1);
            }
        });
        
        // 通关条件已修改为仅与收集假面相关，删除原有的通关逻辑
        
        return cucumberCollided;
    }
    
    // 玩家与假面的碰撞检测
    checkPlayerMaskCollision() {
        if (this.collectedMask || !this.mask) return false;
        
        const maskTileX = Math.floor(this.mask.x / this.tile_Width);
        const maskTileY = Math.floor(this.mask.y / this.tile_Height);
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        if (maskTileX === playerTileX && maskTileY === playerTileY) {
            this.mask.destroy();
            this.collectedMask = true;
            console.log(`Player collected the mask!`);
            
            // 添加mask到物品栏，这样会自动更新收集记录
            this.addInventoryItem('mask', 1);
            
            // 添加收集假面的事件到事件日志
            const eventText = `找到了难绷的假面！现在可以前往下一关了！`;
            this.addEvent(eventText);
            
            // 捡到假面后，分数增加当前拥有的黄瓜数量
            const cucumberCount = this.col_cucumbers || 0;
            if (cucumberCount > 0) {
                this.score += cucumberCount;
                this.addEvent(`捡到${cucumberCount}根黄瓜，+${cucumberCount}分！`);
            }

            // 显示通关对话框
            localStorage.setItem(`level${this.level + 1}`, true);
            this.showCompleteDialog();
            
            return true;
        }
        
        return false;
    }
    
    // 更新假面可见性
    updateMaskVisibility() {
        if (!this.mask || this.collectedMask) return;
        
        const maskTileX = this.maskTileX;
        const maskTileY = this.maskTileY;
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        // 检查假面是否在明亮处
        const isMaskInBright = this.isBright(maskTileX, maskTileY);
        
        // 检查假面是否在玩家视野中
        const isMaskInPlayerVision = this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, maskTileX, maskTileY);
        
        // 只有在明亮处或者在玩家视野中才显示假面
        this.mask.visible = isMaskInBright || isMaskInPlayerVision;
    }
    
    // 更新空啤酒罐可见性
    updateBeerCanVisibility() {
        if (!this.emptyBeerCan) return;
        
        const beerCanTileX = Math.floor(this.emptyBeerCan.x / this.tile_Width);
        const beerCanTileY = Math.floor(this.emptyBeerCan.y / this.tile_Height);
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        // 检查空啤酒罐是否在明亮处
        const isBeerCanInBright = this.isBright(beerCanTileX, beerCanTileY);
        
        // 检查空啤酒罐是否在玩家视野中
        const isBeerCanInPlayerVision = this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, beerCanTileX, beerCanTileY);
        
        // 只有在明亮处或者在玩家视野中才显示空啤酒罐
        this.emptyBeerCan.visible = isBeerCanInBright || isBeerCanInPlayerVision;
    }
    
    // 检查玩家是否收集了所有5个必需物品以进入白月光形态
    checkForWhiteMoonlightForm() {
        // 定义必需的物品列表
        const requiredItems = ['神秘的玩偶', '芭蕾舞鞋', '素世的香水', '巧克力奶', '天文望远镜'];
        
        // 检查玩家物品栏中是否有所有必需的物品
        const hasAllItems = requiredItems.every(item => {
            return this.inventoryItemTypes && this.inventoryItemTypes[item] && this.inventoryItemTypes[item].count > 0;
        });
        
        return hasAllItems;
    }
    
    // 激活白月光形态
    activateWhiteMoonlightForm() {
        console.log('激活白月光形态！');
        
        // 设置白月光形态状态
        this.whiteMoonlightFormActive = true;
        
        // 更改玩家精灵为'丰川祥子Smile'
        this.player.setTexture('丰川祥子Smile');
        this.player.setDisplaySize(64, 64);
        // 使全图变亮
        this.setAllTilesBright(true);
        
        // 切换背景音乐为'ImprisonedII'
        this.switchBackgroundMusic('imprisonedII');
        
        // 添加事件到事件日志
        this.addEvent('已经集齐所有道具，丰川祥子进入了白月光形态！');
        
        // 点亮白月光形态成就
        const achievements = JSON.parse(localStorage.getItem('gameAchievements') || '{}');
        achievements[9] = true; // 我要成为卡密（开启白月光形态）
        localStorage.setItem('gameAchievements', JSON.stringify(achievements));
        console.log('白月光形态成就已点亮');
    }
    
    // 检查并激活白月光形态
    checkAndActivateWhiteMoonlightForm() {
        if (!this.whiteMoonlightFormActive && this.checkForWhiteMoonlightForm()) {
            this.activateWhiteMoonlightForm();
        }
    }
    
    // 更新芭蕾舞鞋可见性
    updateBalletShoesVisibility() {
        if (!this.balletShoes) return;
        
        const balletShoesTileX = Math.floor(this.balletShoes.x / this.tile_Width);
        const balletShoesTileY = Math.floor(this.balletShoes.y / this.tile_Height);
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        // 检查芭蕾舞鞋是否在明亮处
        const isBalletShoesInBright = this.isBright(balletShoesTileX, balletShoesTileY);
        
        // 检查芭蕾舞鞋是否在玩家视野中
        const isBalletShoesInPlayerVision = this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, balletShoesTileX, balletShoesTileY);
        
        // 只有在明亮处或者在玩家视野中才显示芭蕾舞鞋
        this.balletShoes.visible = isBalletShoesInBright || isBalletShoesInPlayerVision;
    }
    
    // 更新Mygo联合演出邀请函可见性
    updateMygoInvitationVisibility() {
        if (!this.mygoInvitation) return;
        
        const invitationTileX = Math.floor(this.mygoInvitation.x / this.tile_Width);
        const invitationTileY = Math.floor(this.mygoInvitation.y / this.tile_Height);
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        // 检查Mygo联合演出邀请函是否在明亮处
        const isInvitationInBright = this.isBright(invitationTileX, invitationTileY);
        
        // 检查Mygo联合演出邀请函是否在玩家视野中
        const isInvitationInPlayerVision = this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, invitationTileX, invitationTileY);
        
        // 只有在明亮处或者在玩家视野中才显示Mygo联合演出邀请函
        this.mygoInvitation.visible = isInvitationInBright || isInvitationInPlayerVision;
    }
    
    // 更新神秘的玩偶可见性
    updateMysteriousDollVisibility() {
        if (!this.mysteriousDoll) return;
        
        const dollTileX = Math.floor(this.mysteriousDoll.x / this.tile_Width);
        const dollTileY = Math.floor(this.mysteriousDoll.y / this.tile_Height);
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        // 检查神秘的玩偶是否在明亮处
        const isDollInBright = this.isBright(dollTileX, dollTileY);
        
        // 检查神秘的玩偶是否在玩家视野中
        const isDollInPlayerVision = this.isGhostInVision(playerTileX, playerTileY, this.lastDirection, dollTileX, dollTileY);
        
        // 只有在明亮处或者在玩家视野中才显示神秘的玩偶
        this.mysteriousDoll.visible = isDollInBright || isDollInPlayerVision;
    }

    // 玩家与NPC的碰撞检测
    checkPlayerNpcCollision() {
        let npcCollided = false;
        const currentTime = this.time.now;
        
        // 检查玩家是否走到空啤酒罐所在格子
        if (this.level === 1) {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            
            // 检查玩家是否走到空啤酒罐所在的格子（tileX=26, tileY=23）
            if (playerTileX === 26 && playerTileY === 22 && this.emptyBeerCan) {
                // 销毁空啤酒罐贴图
                this.emptyBeerCan.destroy();
                this.emptyBeerCan = null;
                // 在玩家物品栏中添加道具'空啤酒罐'
                if (!this.inventoryItemTypes['空啤酒罐']) this.addInventoryItem('空啤酒罐', 1);
                console.log('玩家拾取了空啤酒罐');
            }
        }
        
        // 检查玩家是否走到芭蕾舞鞋所在格子
        if (this.level === 2) {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            
            // 检查玩家是否走到芭蕾舞鞋所在的格子（tileX=18, tileY=2）
            if (playerTileX === 18 && playerTileY === 2 && this.balletShoes) {
                // 销毁芭蕾舞鞋贴图
                this.balletShoes.destroy();
                this.balletShoes = null;
                // 在玩家物品栏中添加道具'芭蕾舞鞋'
                if (!this.inventoryItemTypes['芭蕾舞鞋']) this.addInventoryItem('芭蕾舞鞋', 1);
                console.log('玩家拾取了芭蕾舞鞋');
            }
        }
        
        // 检查玩家是否走到Mygo联合演出邀请函所在格子
        if (this.level === 3) {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            
            // 检查玩家是否走到Mygo联合演出邀请函所在的格子（tileX=9, tileY=7）
            if (playerTileX === 9 && playerTileY === 7 && this.mygoInvitation) {
                // 销毁Mygo联合演出邀请函贴图
                this.mygoInvitation.destroy();
                this.mygoInvitation = null;
                // 在玩家物品栏中添加道具'Mygo联合演出邀请函'
                if (!this.inventoryItemTypes['Mygo联合演出邀请函']) this.addInventoryItem('Mygo联合演出邀请函', 1);
                console.log('玩家拾取了Mygo联合演出邀请函');
            }
        }
        
        // 检查玩家是否走到神秘的玩偶所在格子
        if (this.level === 4) {
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            
            // 检查玩家是否走到神秘的玩偶所在的格子（tileX=16, tileY=16）
            if (playerTileX === 16 && playerTileY === 15 && this.mysteriousDoll) {
                // 销毁神秘的玩偶贴图
                this.mysteriousDoll.destroy();
                this.mysteriousDoll = null;
                // 在玩家物品栏中添加道具'神秘的玩偶'
                if (!this.inventoryItemTypes['神秘的玩偶']) this.addInventoryItem('神秘的玩偶', 1);
                console.log('玩家拾取了神秘的玩偶');
            }
        }
        
        // 添加冷却机制：如果距离上一次对话框显示时间不到5000毫秒，则不触发新的对话框
        const cooldownPeriod = 5000;
        if (!this.dialogVisible && (currentTime - this.lastNpcDialogTime > cooldownPeriod)) {
            this.npcs.getChildren().forEach(npc => {
                const npcTileX = Math.floor(npc.x / this.tile_Width);
                const npcTileY = Math.floor(npc.y / this.tile_Height);
                const playerTileX = Math.floor(this.player.x / this.tile_Width);
                const playerTileY = Math.floor(this.player.y / this.tile_Height);
                
                // 如果NPC不在本回合已选择离开的列表中，并且玩家与NPC在同一格且NPC未跟随
                if (npcTileX === playerTileX && npcTileY === playerTileY && !npc.follow && !this.leftNpcsThisTurn.includes(npc)) {
                    // 对于特定NPC（长崎素世、千早爱音、椎名立希、要乐奈），如果对话阶段已为1（第二阶段）
                    // 在触发一次对话后，将其添加到leftNpcsThisTurn数组中，避免一回合内重复触发
                    if (['长崎素世', '千早爱音', '椎名立希', '要乐奈'].includes(npc.name) && npc.dialogStage === 1 && !this.leftNpcsThisTurn.includes(npc)) {
                        // 将NPC预先添加到leftNpcsThisTurn数组中
                        this.leftNpcsThisTurn.push(npc);
                        console.log(`NPC ${npc.name} 已在第二阶段，添加到本回合已离开列表中`);
                    }
                    this.currentNpc = npc;
                    npcCollided = true;
                }
            });
        }
        
        // 检测到碰撞时立即显示对话框，并更新冷却时间戳
        if (npcCollided && !this.dialogVisible) {
            this.showNPCDialog();
            this.lastNpcDialogTime = currentTime;
            // 将触发对话的NPC添加到leftNpcsThisTurn数组中，避免一回合内重复触发
            if (this.currentNpc && !this.leftNpcsThisTurn.includes(this.currentNpc)) {
                this.leftNpcsThisTurn.push(this.currentNpc);
                console.log(`NPC ${this.currentNpc.name} 触发对话后，添加到本回合已离开列表中`);
            }
        }
        
        return npcCollided;
    }
    findDialogText(){
        findDialogText_Logic.call(this);
    }
    
    creatNPCDialogButton(centerdiaX, centerdiaY){
        creatNPCDialogButton_Logic.call(this, centerdiaX, centerdiaY);
    }
    
    // 显示NPC对话对话框
    showNPCDialog() {
        showNPCDialog_Logic.call(this);
    }
    
    // 文字逐字显示方法 - 实现从左到右依次出现并在超过宽度时换行，字间距10像素
    typeText(text, textObject) {
        typeText_Logic.call(this, text, textObject);
    }
    
    // 显示通关对话框
    showCompleteDialog() {
        showCompleteDialog_Logic.call(this);
    }
    
    // 关闭对话框
    closeDialog() {
        closeDialog_Logic.call(this);
    }

    // 检查NPC和黄瓜的碰撞
    checkNpcCucumberCollision(npc) {
        const npcTileX = Math.floor(npc.x / this.tile_Width);
        const npcTileY = Math.floor(npc.y / this.tile_Height);
        
        let cucumberToRemove = null;
        this.cucumbers.getChildren().forEach(cucumber => {
            const cucumberTileX = Math.floor(cucumber.x / this.tile_Width);
            const cucumberTileY = Math.floor(cucumber.y / this.tile_Height);
            
            if (npcTileX === cucumberTileX && npcTileY === cucumberTileY) {
                cucumberToRemove = cucumber;
            }
        });
        
        if (cucumberToRemove) {
            cucumberToRemove.destroy();
            // 为若叶睦添加黄瓜计数
            if (!npc.cucumberCount) {
                npc.cucumberCount = 0;
            }
            npc.cucumberCount++;
            // 添加事件日志
            this.addEvent('若叶睦：......（捡起了一根黄瓜）');
        }
    }
    
    // 鬼与玩家的碰撞检测
    checkGhostPlayerCollision() {
        const ghostTileX = Math.floor(this.ghost.x / this.tile_Width);
        const ghostTileY = Math.floor(this.ghost.y / this.tile_Height);
        const playerTileX = Math.floor(this.player.x / this.tile_Width);
        const playerTileY = Math.floor(this.player.y / this.tile_Height);
        
        if (ghostTileX === playerTileX && ghostTileY === playerTileY) {
            console.log(['玩家位置：', this.player.x, this.player.y, 'Mortis位置：', this.ghost.x, this.ghost.y]);
            
            // 检查是否有三角初华在跟随队列中
            const followingNPCs = this.npcs.getChildren().filter(npc => npc.follow);
            const hasHatsuka = followingNPCs.some(npc => npc.name === '三角初华');
            
            if (hasHatsuka) {
                // 检查玩家是否拥有甜甜圈且数量>=1
                const hasDonut = this.inventoryItemTypes && this.inventoryItemTypes['甜甜圈'] && this.inventoryItemTypes['甜甜圈'].count >= 1;
                
                // 1. 鬼被随机传送到暗处一个格子
                this.relocateGhostToDark();
                
                // 2. 找到三角初华在队列中的索引
                const hatsukaIndex = followingNPCs.findIndex(npc => npc.name === '三角初华');
                const hatsuka = followingNPCs[hatsukaIndex];
                
                // 3. 修改三角初华的头像和深度
                hatsuka.setTexture('初华炸毛');
                hatsuka.setDepth(21);
                
                // 4. 锁定键盘输入
                this.keyboardLocked = true;
                
                // 5. 播放音声
                this.sound.play('不要把小祥从我身边抢走');
                
                // 6. 添加事件日志
                this.addEvent('三角初华：不要把小祥从我身边抢走！');
                
                if (hasDonut) {
                    // 玩家拥有甜甜圈，三角初华不会消失，但甜甜圈数量-1
                    this.time.delayedCall(2120, () => {
                        // 解除键盘锁定
                        this.keyboardLocked = false;
                        
                        // 甜甜圈数量-1
                        this.useInventoryItem('甜甜圈', 1);
                        
                        // 三角初华恢复正常状态
                        hatsuka.setTexture('三角初华');
                        hatsuka.setDepth(20);
                        
                        // 添加事件日志
                        this.addEvent('三角初华：小祥，我会保护你的！（甜甜圈-1）');
                        
                        // 确保回合状态正确
                        this.turnInProgress = false;
                    });
                } else {
                    // 玩家没有甜甜圈，三角初华会消失
                    this.total_friend--;
                    
                    // 延迟2120ms后解除锁定并消灭三角初华
                    this.time.delayedCall(2120, () => {
                        // 解除键盘锁定
                        this.keyboardLocked = false;
                        
                        // 添加消灭动画效果
                        // 创建一个闪烁动画
                        let flashCount = 0;
                        const flashInterval = setInterval(() => {
                            hatsuka.visible = !hatsuka.visible;
                            flashCount++;
                            if (flashCount >= 6) { // 闪烁3次后彻底消灭
                                clearInterval(flashInterval);
                                // 使用destroy方法彻底从地图上移除三角初华
                                hatsuka.destroy();
                            }
                        }, 100); // 每100毫秒闪烁一次
                        
                        // 跟随队列中所有位于三角初华后面的角色统一向主角移动半个格子以弥补空缺
                        const playersHalfWidth = this.tile_Width / 2;
                        const playersHalfHeight = this.tile_Height / 2;
                        
                        // 获取所有在三角初华后面的NPC
                        const npcsBehindHatsuka = followingNPCs.slice(hatsukaIndex + 1);
                        
                        // 向主角移动半个格子
                        npcsBehindHatsuka.forEach(npc => {
                            // 计算到玩家的方向
                            const directionX = Math.sign(this.player.x - npc.x);
                            const directionY = Math.sign(this.player.y - npc.y);
                            
                            // 移动半个格子
                            const targetX = npc.x + directionX * playersHalfWidth;
                            const targetY = npc.y + directionY * playersHalfHeight;
                            
                            // 平滑移动到目标位置
                            this.setEntityPosition(npc, targetX, targetY);
                        });
                        
                        // 分数-1
                        this.score = Math.max(0, this.score - 1);
                        
                        // 添加事件日志
                        this.addEvent('三角初华扔飞了莫提丝，但自己消失了...');
                        
                        // 确保回合状态正确
                        this.turnInProgress = false;
                    });
                }
                
                return true; // 返回true表示发生了碰撞但游戏没有结束
            } else {
                // 三角初华不在跟随队列中，正常结束游戏
                // 设置游戏结束标志和对话框状态
                this.gameOver = true;
                this.dialogVisible = true;
                this.isCompleteDialog = true; // 使用通关对话框的处理逻辑
                this.physics.pause();
                
                const centerX = this.game.config.width / 2;
                const centerY = this.game.config.height / 2;
                
                // 创建半透明背景覆盖层
                this.dialogOverlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.8);
                this.dialogOverlay.setOrigin(0, 0);
                this.dialogOverlay.setDepth(28); // 增加深度，确保高于所有其他UI元素
                
                // 创建对话框（使用用户提供的素材）
                this.dialogBox = this.add.image(centerX, centerY, 'gameOverDialogBox');
                this.dialogBox.setDepth(29); // 增加深度，确保高于所有其他UI元素
                
                // 根据素材调整对话框大小
                this.dialogBox.setScale(0.7); // 游戏结束对话框缩放0.7倍
                
                // 添加游戏结束文本
                this.dialogContent = this.add.text(centerX + 40, centerY - 230, '游戏结束！', {
                    fontSize: '96px',
                    color: '#ff0000',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    align: 'center'
                });
                this.dialogContent.setOrigin(0.5);
                this.dialogContent.setDepth(30); // 增加深度，确保高于对话框
                
                // 添加返回主界面按钮（使用图片）
                this.returnButton = this.add.image(centerX, centerY + 230, 'passSelect1');
                this.returnButton.setOrigin(0.5);
                this.returnButton.setDepth(31); // 增加深度，确保显示在对话框之上
                this.returnButton.setInteractive();
                this.returnButton.on('pointerdown', () => {
                    this.choice = 'returnMain';
                    this.closeDialog();
                });
                
                // 在passSelect1按钮上添加'返回主界面'文本
                this.returnMainText = this.add.text(centerX, centerY + 230, '返回主界面', {
                    fontSize: '48px',
                    color: '#1e1e1eff',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold'
                });
                this.returnMainText.setOrigin(0.5);
                this.returnMainText.setDepth(32); // 确保文本显示在按钮之上
                
                // 添加提示文本
                this.dialogHint = this.add.text(centerX, centerY + 80, '按2选返回主界面', {
                    fontSize: '16px',
                    color: '#ffffff',
                    fontFamily: 'Arial, sans-serif'
                });
                this.dialogHint.setOrigin(0.5);
                this.dialogHint.setDepth(30); // 增加深度，确保显示在对话框之上
                
                // 添加丰川祥子哭脸图片
                this.祥子哭脸 = this.add.image(centerX + 542, centerY + 557, '丰川祥子CryCircle');
                this.祥子哭脸.setOrigin(0.5);
                this.祥子哭脸.setScale(0); // 初始缩放为0，用于动画
                this.祥子哭脸.setDepth(32); // 确保显示在对话框之上
                
                // 添加从中间弹出的动画效果
                this.dialogContent.setScale(0);
                this.returnButton.setScale(0);
                this.returnMainText.setScale(0);
                this.dialogHint.setScale(0);
                
                // 对话框保持0.7的缩放
                this.dialogBox.setScale(0);
                this.tweens.add({
                    targets: [this.dialogBox],
                    scale: 0.7,
                    duration: 500,
                    ease: 'Back.easeOut'
                });
                
                // 其他UI元素动画
                this.tweens.add({
                    targets: [this.dialogContent, this.returnButton, this.returnMainText, this.dialogHint],
                    scale: 1,
                    duration: 500,
                    ease: 'Back.easeOut'
                });
                
                // 为祥子哭脸图片设置动画，在对话框弹出完毕后开始弹出（延迟500ms）
                this.tweens.add({
                    targets: [this.祥子哭脸],
                    scale: 0.25,
                    duration: 1000,
                    delay: 500,
                    ease: 'Back.easeOut'
                });
            }
            
            return true;
        }
        
        return false;
    }

    // 鬼与NPC的碰撞检测
    checkGhostNpcCollision() {
        let npcCollided = false;
        const ghostTileX = Math.floor(this.ghost.x / this.tile_Width);
        const ghostTileY = Math.floor(this.ghost.y / this.tile_Height);
        
        this.npcs.getChildren().forEach(npc => {
            const npcTileX = Math.floor(npc.x / this.tile_Width);
            const npcTileY = Math.floor(npc.y / this.tile_Height);
            
            if (npcTileX === ghostTileX && npcTileY === ghostTileY && npc.active && !npc.follow) {
                // 保护新角色：高松灯、千早爱音、长崎素世、要乐奈、椎名立希、纯田真奈不会被莫提丝干掉
                if (['高松灯', '千早爱音', '长崎素世', '要乐奈', '椎名立希', '纯田真奈'].includes(npc.name)) {
                    this.addEvent(`${npc.name}巧妙地避开了莫提丝的攻击！`);
                    return;
                }
                // 检查佑天寺若麦的Amoris力场
                if (npc.name === '佑天寺若麦') {
                    // 检查是否已经是攻击免疫状态
                    if (!npc.isAttackImmune) {
                        // 设置为攻击免疫状态
                        npc.isAttackImmune = true;
                        this.addEvent('佑天寺若麦展开了Amoris力场！现在她不是Mortis攻击对象了！');
                    } else {
                        // 已经是免疫状态，显示化解攻击的信息
                        this.addEvent('佑天寺若麦展开了Amoris力场化解了攻击！');
                    }
                    // 无论哪种情况，都不消灭NPC
                    return;
                }
                
                // 处理若叶睦的特殊情况
                if (npc.name === '若叶睦') {
                    // 检查玩家是否持有芭蕾舞鞋
                    const hasBalletShoes = this.inventoryItemTypes && this.inventoryItemTypes['芭蕾舞鞋'];
                    
                    if (hasBalletShoes) {
                        // 玩家持有芭蕾舞鞋，若叶睦不会被Mortis干掉
                        this.addEvent('若叶睦：不要抢走我的角色！');
                        return;
                    }
                    
                    console.log(`Ghost caught NPC: ${npc.name}`);
                    
                    // 添加特殊的事件日志
                    this.addEvent('莫提丝：小睦......死掉了');
                    this.addEvent('莫提丝：那么，就由我来扮演睦！');
                    this.addEvent('莫提丝也开始捡黄瓜了！');
                    
                    // 标记莫提丝开始捡黄瓜
                    this.ghost.startsCollectingCucumbers = true;
                    
                    // 在NPC被干掉的原地创建一根新黄瓜
                    const cucumber = this.cucumbers.create(
                        npc.x, // 使用NPC当前的x坐标
                        npc.y, // 使用NPC当前的y坐标
                        'cucumber'
                    );
                    cucumber.setDepth(18); // 设置深度低于NPC但高于视野高亮效果
                    cucumber.setDisplaySize(64, 64); // 黄瓜在地图上显示时一律缩放为64*64
                    
                    npc.destroy();
                    npc.active = false;
                    npcCollided = true;
                } else {
                    // 其他NPC的标准处理
                    console.log(`Ghost caught NPC: ${npc.name}`);
                    
                    // 添加NPC被抓事件到事件日志
                    const eventText = `${npc.name}被莫提斯干掉了！掉落了一根黄瓜！`;
                    this.addEvent(eventText);
                    
                    // 在NPC被干掉的原地创建一根新黄瓜
                    const cucumber = this.cucumbers.create(
                        npc.x, // 使用NPC当前的x坐标
                        npc.y, // 使用NPC当前的y坐标
                        'cucumber'
                    );
                    cucumber.setDepth(18); // 设置深度低于NPC但高于视野高亮效果
                    cucumber.setDisplaySize(64, 64); // 黄瓜在地图上显示时一律缩放为64*64
                    
                    npc.destroy();
                    npc.active = false;
                    npcCollided = true;
                }
            }
        });
        
        return npcCollided;
    }
    
    // 检查莫提丝和黄瓜的碰撞
    checkGhostCucumberCollision() {
        const ghostTileX = Math.floor(this.ghost.x / this.tile_Width);
        const ghostTileY = Math.floor(this.ghost.y / this.tile_Height);
        
        let cucumberToRemove = null;
        this.cucumbers.getChildren().forEach(cucumber => {
            const cucumberTileX = Math.floor(cucumber.x / this.tile_Width);
            const cucumberTileY = Math.floor(cucumber.y / this.tile_Height);
            
            if (ghostTileX === cucumberTileX && ghostTileY === cucumberTileY) {
                cucumberToRemove = cucumber;
            }
        });
        
        if (cucumberToRemove) {
            cucumberToRemove.destroy();
            // 添加事件日志
            this.addEvent('莫提丝：......（捡起了一根黄瓜）');
        }
    }
      
      // 显示评级图标
    showRatingIcon() {
        showRatingIcon_Logic.call(this);
    }
      
    // 显示单个物品并处理弹出动画
    showInventoryItem(index) {
        showInventoryItem_Logic.call(this, index);
    }
    
    // 显示结算界面
    showSettlementScene() {
        showSettlementScene_Logic.call(this);
    }


    update() {
        // 保留previousPermanentDoubleMove状态更新，但移除音乐切换逻辑
        // 音乐切换现在在与要乐奈对话选择第一个选项时触发
        this.previousPermanentDoubleMove = this.permanentDoubleMove;
        
        // 如果游戏已结束、回合正在进行中或车辆动画正在进行中，不处理任何输入
        if (this.gameOver || this.turnInProgress || this.carAnimationActive) {
            return;
        }
        
        // 测试用：按L键设置全场地块明亮，按K键恢复正常光照
        if (Phaser.Input.Keyboard.JustDown(this.keyL)) {
            this.setAllTilesBright(true);
        } else if (Phaser.Input.Keyboard.JustDown(this.keyK)) {
            this.setAllTilesBright(false);
        }
        
        
        
        // 如果对话框可见，处理对话框相关输入
        if (this.dialogVisible) {
            if (this.isCompleteDialog) {
                // 通关对话框的键盘输入
                const isFinalLevel = this.level === 3;
                if (!isFinalLevel) {
                    if (Phaser.Input.Keyboard.JustDown(this.key1)) {
                        this.choice = 'nextLevel';
                        this.closeDialog();
                    } else if (Phaser.Input.Keyboard.JustDown(this.key2)) {
                        this.choice = 'returnMain';
                        this.closeDialog();
                    }
                } else {
                    if (Phaser.Input.Keyboard.JustDown(this.key1)) {
                        this.choice = 'returnMain';
                        this.closeDialog();
                    }
                }
            } else {
                // NPC对话框的键盘输入
                // 第二阶段对话：禁用1和2键，只允许空格键
                if (this.currentNpc && this.currentNpc.dialogStage === 1) {
                    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                        this.choice = 'select3';
                        this.closeDialog();
                    }
                } else {
                    // 第一阶段对话：根据角色和道具数量检查是否允许键盘1选择
                    if (Phaser.Input.Keyboard.JustDown(this.key1)) {
                        // 检查是否满足选择条件
                        const isSpecialCharacter = this.currentNpc && ['高松灯', '长崎素世', '千早爱音', '椎名立希', 'Ring', '丰川定治'].includes(this.currentNpc.name);
                        const isYorunai = this.currentNpc && this.currentNpc.name === '要乐奈';
                        const hasPhoneAndNekomu = this.currentNpc && this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0 && this.currentNpc.name === '佑天寺若麦';
                        const hasPerfumeAndMuzumi = this.currentNpc && this.inventoryItemTypes && this.inventoryItemTypes['素世的香水'] && this.inventoryItemTypes['素世的香水'].count > 0 && this.currentNpc.name === '若叶睦';
                        const hasCocomilkAndUmilin = this.currentNpc && this.inventoryItemTypes && this.inventoryItemTypes['巧克力奶'] && this.inventoryItemTypes['巧克力奶'].count > 0 && this.currentNpc.name === '八幡海玲';
                        const hasUikaAndMana = this.currentNpc && this.team.some(member => member.texture && member.texture.key === '三角初华') &&this.currentNpc.name === '纯田真奈';
                        // 对于佑天寺若麦且持有爱音的手机的情况，直接允许选择
                        if (isSpecialCharacter && this.col_cucumbers >= 1) {
                            this.choice = 'select1';
                            this.closeDialog();
                        } else if (isYorunai && this.Parfait >= 1) {
                            this.choice = 'select1';
                            this.closeDialog();
                        } else if (hasUikaAndMana) {
                            this.choice = 'select1';
                            this.closeDialog();
                        } else if (isSpecialCharacter && this.currentNpc.name === '丰川定治') {
                            this.choice = 'select1';
                            this.closeDialog();
                        } else {
                            // 优化招募条件结构
                            const hasRecruitCondition = 
                                this.currentNpc.name === '三角初华' || 
                                this.col_cucumbers >= 1 || 
                                hasPhoneAndNekomu || hasPerfumeAndMuzumi || hasCocomilkAndUmilin  // 加入佑天寺若麦和爱音的手机条件
                                
                            if (hasRecruitCondition) {
                              this.choice = 'recruit';
                              this.closeDialog();
                            }
                        }
                        // 否则不执行任何操作，即选项1不可用
                    } else if (Phaser.Input.Keyboard.JustDown(this.key2)) {
                        this.choice = 'leave';
                        this.closeDialog();
                    }
                }
            }
            return;
        }
        
        // 检查键盘是否被锁定（车辆动画进行中）
        if (this.keyboardLocked) {
            return;
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            // 检查玩家是否在(x=8,y=27)位置，如果是，则显示NPC对话框
            if ((playerTileX === 7 && playerTileY === 26 && !this.dialogVisible && this.level === 1)
                || (playerTileX === 27 && playerTileY === 6 && !this.dialogVisible && this.level === 2)
                || (playerTileX === 28 && playerTileY === 6 && !this.dialogVisible && this.level === 2)
                || (playerTileX === 15 && playerTileY === 3 && !this.dialogVisible && this.level === 3)
                || (playerTileX === 16 && playerTileY === 3 && !this.dialogVisible && this.level === 3)) {
                // 创建一个临时NPC对象来模拟对话
                this.currentNpc = {
                    name: 'Ring',
                    dialogStage: 0
                };
                // 显示NPC对话框
                this.showNPCDialog();
                return;
            }
            
            // 在移动前就设置回合开始，防止连续按键
            this.turnInProgress = true;
            if (this.moveEntity(this.player, 0, -1, () => {
                // 检查碰撞
            this.checkPlayerCucumberCollision();
            this.checkPlayerMaskCollision();
            const npcCollided = this.checkPlayerNpcCollision();
            const ghostCollided = this.checkGhostPlayerCollision();
                
                if (!ghostCollided && !npcCollided) {
                    // 玩家移动动画完成后，检查是否可以进行第二次移动
                    this.moveCount++;
                    
                    if ((this.canMoveTwice || this.permanentDoubleMove) && this.moveCount < 2) {
                        // 如果可以进行第二次移动，重置回合进行状态，允许玩家再次输入
                        this.turnInProgress = false;
                    } else {
                        // 正常结束回合
                        if (!this.permanentDoubleMove) {
                            this.canMoveTwice = false; // 只有非永久双倍移动才重置标记
                        }
                        this.moveCount = 0; // 重置移动计数
                        
                        // 玩家移动动画完成后，让NPC队列跟随移动，NPC全部移动完成后再让鬼移动
                        this.moveNPCsInQueue(() => {
                            // NPC移动全部完成后，才开始鬼的移动
                            this.endTurn();
                        });
                    }
                } else {
                    // 如果发生碰撞，确保回合状态重置
                    this.turnInProgress = false;
                }
            })) {
                this.lastDirection = 'up';
                // 向上移动时，保持当前朝向不变
            } else {
                // 如果移动失败（无法移动），也需要重置状态
                this.turnInProgress = false;
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            // 在移动前就设置回合开始，防止连续按键
            this.turnInProgress = true;
            if (this.moveEntity(this.player, 0, 1, () => {
                // 检查碰撞
                this.checkPlayerCucumberCollision();
                this.checkPlayerMaskCollision();
                const npcCollided = this.checkPlayerNpcCollision();
                const ghostCollided = this.checkGhostPlayerCollision();
                
                if (!ghostCollided && !npcCollided) {
                    // 玩家移动动画完成后，检查是否可以进行第二次移动
                    this.moveCount++;
                    
                    if ((this.canMoveTwice || this.permanentDoubleMove) && this.moveCount < 2) {
                        // 如果可以进行第二次移动，重置回合进行状态，允许玩家再次输入
                        this.turnInProgress = false;
                    } else {
                        // 正常结束回合
                        if (!this.permanentDoubleMove) {
                            this.canMoveTwice = false; // 只有非永久双倍移动才重置标记
                        }
                        this.moveCount = 0; // 重置移动计数
                        
                        // 玩家移动动画完成后，让NPC队列跟随移动，NPC全部移动完成后再让鬼移动
                        this.moveNPCsInQueue(() => {
                            // NPC移动全部完成后，才开始鬼的移动
                            this.endTurn();
                        });
                    }
                } else {
                    // 如果发生碰撞，确保回合状态重置
                    this.turnInProgress = false;
                }
            })) {
                this.lastDirection = 'down';
                // 向下移动时，保持当前朝向不变
            } else {
                // 如果移动失败（无法移动），也需要重置状态
                this.turnInProgress = false;
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            // 在移动前就设置回合开始，防止连续按键
            this.turnInProgress = true;
            if (this.moveEntity(this.player, -1, 0, () => {
                // 检查碰撞
                this.checkPlayerCucumberCollision();
                this.checkPlayerMaskCollision();
                const npcCollided = this.checkPlayerNpcCollision();
                const ghostCollided = this.checkGhostPlayerCollision();
                
                if (!ghostCollided && !npcCollided) {
                    // 玩家移动动画完成后，检查是否可以进行第二次移动
                    this.moveCount++;
                    
                    if ((this.canMoveTwice || this.permanentDoubleMove) && this.moveCount < 2) {
                        // 如果可以进行第二次移动，重置回合进行状态，允许玩家再次输入
                        this.turnInProgress = false;
                    } else {
                        // 正常结束回合
                        if (!this.permanentDoubleMove) {
                            this.canMoveTwice = false; // 只有非永久双倍移动才重置标记
                        }
                        this.moveCount = 0; // 重置移动计数
                        
                        // 玩家移动动画完成后，让NPC队列跟随移动，NPC全部移动完成后再让鬼移动
                        this.moveNPCsInQueue(() => {
                            // NPC移动全部完成后，才开始鬼的移动
                            this.endTurn();
                        });
                    }
                } else {
                    // 如果发生碰撞，确保回合状态重置
                    this.turnInProgress = false;
                }
            })) {
                this.lastDirection = 'left';
                // 向左移动时，镜像反转角色
                this.player.flipX = true;
            } else {
                // 如果移动失败（无法移动），也需要重置状态
                this.turnInProgress = false;
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            // 在移动前就设置回合开始，防止连续按键
            this.turnInProgress = true;
            if (this.moveEntity(this.player, 1, 0, () => {
                // 检查碰撞
                this.checkPlayerCucumberCollision();
                this.checkPlayerMaskCollision();
                const npcCollided = this.checkPlayerNpcCollision();
                const ghostCollided = this.checkGhostPlayerCollision();
                
                if (!ghostCollided && !npcCollided) {
                    // 玩家移动动画完成后，检查是否可以进行第二次移动
                    this.moveCount++;
                    
                    if ((this.canMoveTwice || this.permanentDoubleMove) && this.moveCount < 2) {
                        // 如果可以进行第二次移动，重置回合进行状态，允许玩家再次输入
                        this.turnInProgress = false;
                    } else {
                        // 正常结束回合
                        if (!this.permanentDoubleMove) {
                            this.canMoveTwice = false; // 只有非永久双倍移动才重置标记
                        }
                        this.moveCount = 0; // 重置移动计数
                        
                        // 玩家移动动画完成后，让NPC队列跟随移动，NPC全部移动完成后再让鬼移动
                        this.moveNPCsInQueue(() => {
                            // NPC移动全部完成后，才开始鬼的移动
                            this.endTurn();
                        });
                    }
                } else {
                    // 如果发生碰撞，确保回合状态重置
                    this.turnInProgress = false;
                }
            })) {
                this.lastDirection = 'right';
                // 向右移动时，不反转角色
                this.player.flipX = false;
            } else {
                // 如果移动失败（无法移动），也需要重置状态
                this.turnInProgress = false;
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            // 在操作开始前就设置回合开始，防止连续按键
            this.turnInProgress = true;
            // 检查碰撞
            this.checkPlayerCucumberCollision();
            this.checkPlayerMaskCollision();
            const npcCollided = this.checkPlayerNpcCollision();
            const ghostCollided = this.checkGhostPlayerCollision();
            
            if (!ghostCollided && !npcCollided) {
                // 检查是否可以进行第二次移动
                this.moveCount++;
                
                if (this.canMoveTwice && this.moveCount < 2) {
                    // 如果可以进行第二次移动，重置回合进行状态，允许玩家再次输入
                    this.turnInProgress = false;
                } else {
                    // 正常结束回合
                    this.canMoveTwice = false; // 重置双倍移动标记
                    this.moveCount = 0; // 重置移动计数
                    
                    // 先让NPC队列移动，NPC全部移动完成后再让鬼移动
                    this.moveNPCsInQueue(() => {
                        // NPC移动全部完成后，才开始鬼的移动
                        this.endTurn();
                    });
                }
            } else {
                // 如果发生碰撞，确保回合状态重置
                this.turnInProgress = false;
            }
        }
        
        // 在每一帧都检查碰撞，确保游戏结束提示和NPC对话框能够立即显示
        if (!this.dialogVisible) {
            this.checkGhostPlayerCollision();
            this.checkPlayerNpcCollision();
            this.updateMaskVisibility(); // 每一帧都更新假面可见性
            this.updateBeerCanVisibility(); // 每一帧都更新空啤酒罐可见性
            this.updateBalletShoesVisibility(); // 每一帧都更新芭蕾舞鞋可见性
            this.updateMygoInvitationVisibility(); // 每一帧都更新Mygo联合演出邀请函可见性
            this.updateMysteriousDollVisibility(); // 每一帧都更新神秘的玩偶可见性
            // this.updateVisibility(); // 每一帧都更新NPC可见性，确保视野随角色移动实时更新
        }
    }

    endTurn() {
        console.log('Remaining cucumbers:', this.cucumbers.getChildren().length);
        // 输出千早爱音的坐标
        this.npcs.getChildren().forEach(npc => {
            if (npc.name === '千早爱音') {
                console.log('千早爱音坐标:', { x: npc.x, y: npc.y, tileX: Math.floor(npc.x / this.tile_Width), tileY: Math.floor(npc.y / this.tile_Height) });
            }
        });
        this.updateT13Visibility(); // 确保回合结束时t13元素正确显示在riverzong之上
        
        // 获取所有未招募的NPC
        const nonFollowingNpcs = this.npcs.getChildren().filter(npc => !npc.follow);
        
        if (nonFollowingNpcs.length === 0) {
            // 如果没有未招募的NPC，直接移动鬼
            this.moveGhost();
        } else {
            // 跟踪未招募NPC移动完成的数量
            let completedMoves = 0;
            
            // 定义NPC移动完成的回调函数
            const onNpcMoveComplete = () => {
                completedMoves++;
                // 当所有未招募NPC都完成移动后，再移动鬼
                if (completedMoves === nonFollowingNpcs.length) {
                    this.moveGhost();
                }
            };
            
            // 修改moveNPCsNotFollow方法，添加完成回调
            // 由于我们不能直接修改moveNPCsNotFollow方法的调用方式，这里使用一个临时变量来跟踪完成状态
            // 同时在调用完所有NPC移动后，检查是否都已完成（如果移动不需要动画）
            let allMovesImmediate = true;
            
            // 移动不跟随的NPC
            nonFollowingNpcs.forEach(npc => {
                // 保存原始的moveEntity方法
                const originalMoveEntity = this.moveEntity;
                
                // 临时覆盖moveEntity方法，添加完成回调
                this.moveEntity = (entity, dx, dy, onComplete = null) => {
                    // 调用原始方法，但添加我们的回调
                    const result = originalMoveEntity.call(this, entity, dx, dy, () => {
                        if (onComplete) onComplete();
                        onNpcMoveComplete();
                    });
                    return result;
                };
                
                // 移动NPC
                this.moveNPCsNotFollow(npc);
                
                // 恢复原始的moveEntity方法
                this.moveEntity = originalMoveEntity;
            });
            

        }
        
        // 回合结束时，重置本回合已选择离开的NPC列表
        this.leftNpcsThisTurn = [];
        
        // 重置所有角色的collided属性为0
        if (this.player) {
            this.player.collided = 0;
        }
        if (this.ghost) {
            this.ghost.collided = 0;
        }
        this.npcs.getChildren().forEach(npc => {
            npc.collided = 0;
        });
        
        // NPC和鬼移动后检查碰撞
        this.checkGhostPlayerCollision();
        this.checkGhostNpcCollision();
        this.checkPlayerMaskCollision();
        
        // 更新假面可见性
        this.updateMaskVisibility();
        // 更新空啤酒罐可见性
        this.updateBeerCanVisibility();
        // 更新芭蕾舞鞋可见性
        this.updateBalletShoesVisibility();
        // 更新Mygo联合演出邀请函可见性
        this.updateMygoInvitationVisibility();
        // 更新神秘的玩偶可见性
        this.updateMysteriousDollVisibility();
                
        // 检查是否应该触发车辆动画（仅在第一关且非车辆动画进行中时）
        if (this.level === 1 && !this.carAnimationInProgress) {
            // 确保canvas已初始化
            if (!this.carCanvas) {
                console.log('初始化车辆动画canvas...');
                this.initializeCarCanvas();
            }
            
            // 检查回合数是否在指定范围内：1~10, 21~30, 41~50等（10*n+1~10*(n+1)，n为偶数）
            const cycle = Math.floor(this.turn / 10); // 计算当前在哪个10回合周期
            if (cycle % 2 === 0) { // n为偶数


                // 30%的概率触发动画
                if (Math.random() < 0.3) { // 调试用：总是触发
                    // 随机选择车辆方向
                    const direction = Math.random() < 0.5 ? 'left' : 'right';
                    console.log('触发车辆动画，方向:', direction);
                    console.log('游戏配置尺寸:', this.game.config.width, this.game.config.height);
                    if (this.carCanvas) {
                        console.log('Canvas尺寸:', this.carCanvas.width, this.carCanvas.height);
                        console.log('缩放比例:', this.canvasScaleX, this.canvasScaleY);
                    }
                    this.startCarAnimation(direction);
                }
            }
        }
        // 当持有爱音的手机且每过五回合时，显示喵梦直播事件
        if (this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0 && this.turn % 5 === 0) {
            // 查找佑天寺若麦的位置
            this.npcs.getChildren().forEach(npc => {
                if (npc.name === '佑天寺若麦') {
                    const tileX = Math.floor(npc.x / this.tile_Width) + 1; // 第一列为1
                    const tileY = Math.floor(npc.y / this.tile_Height) + 1; // 第一行为1
                    this.addEvent(`喵梦开始直播了！通过背景你看到她的位置在（X=${tileX},Y=${tileY}）`);
                }
            });
        }
        if (this.turn % 15 === 0) {
            const directions = ['up', 'right', 'down', 'left'];
            const currentIndex = directions.indexOf(this.moonlightDirection);
            this.moonlightDirection = directions[(currentIndex + 1) % 4];
            this.computeLight();
            this.updateT13Visibility(); // 月光方向转换后，同时更新t13元素的光照状态
            this.updateMaskVisibility(); // 同时更新假面可见性
            this.updateBeerCanVisibility(); // 同时更新空啤酒罐可见性
            this.updateBalletShoesVisibility(); // 同时更新芭蕾舞鞋可见性
            this.updateMygoInvitationVisibility(); // 同时更新Mygo联合演出邀请函可见性
            this.updateMysteriousDollVisibility(); // 同时更新神秘的玩偶可见性
        }

        // updateVisibility一定要在computeLight之后运行！否则视野会消失
        this.updateVisibility();
    }
}

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        // 存储按钮引用
        this.mainMenuButtons = [];
        this.levelButtons = [];
        this.isLevelSelectMode = false;
    }

    create() {
        // allowAccessToTheNextLevel默认为false，当从主界面开始游戏时将通过其他方式设置为true
        this.allowAccessToTheNextLevel = false;
        const canvasWidth = this.game.config.width;
        const canvasHeight = this.game.config.height;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        
        // 添加背景图片
        this.add.image(0, 0, '主界面红幕布').setOrigin(0, 0).setDepth(-10);
        this.add.image(0, 0, '菜单栏背景').setOrigin(0, 0).setDepth(-9);

        // 添加"逃离莫提丝字体"图片
        this.titleImage = this.add.image(960, 340 - 1000, '逃离莫提丝字体').setOrigin(0.5).setScale(1);
        this.titleImage.setDepth(1);
        
        // 添加"悬挂木牌"图片
        this.woodenSign = this.add.image(960, 187 - 1000, '悬挂木牌').setOrigin(0.5).setScale(1);
        this.woodenSign.setDepth(0);
        
        // 创建字体图片动画
        // 第一阶段：从上往下移动1000像素，0.4秒
        this.tweens.add({
            targets: this.titleImage,
            y: 340 + 50, // 先移动到目标位置下方50像素
            duration: 400,
            ease: 'Linear',
            onComplete: () => {
                // 第二阶段：从下往上移动50像素，0.3秒
                this.tweens.add({
                    targets: this.titleImage,
                    y: 340,
                    duration: 300,
                    ease: 'Linear'
                });
            }
        });
        
        // 创建木牌图片动画（与字体动画同步）
        // 第一阶段：从上往下移动1000像素，0.4秒
        this.tweens.add({
            targets: this.woodenSign,
            y: 187 + 50, // 先移动到目标位置下方50像素
            duration: 400,
            ease: 'Linear',
            onComplete: () => {
                // 第二阶段：从下往上移动50像素，0.3秒
                this.tweens.add({
                    targets: this.woodenSign,
                    y: 187,
                    duration: 300,
                    ease: 'Linear'
                });
            }
        });
        
        // 添加莫提丝木牌 - 围绕指定中心点(318, 1920)旋转，初始旋转180°
        this.mortisSign = this.add.image(318, 2310, '莫提丝木牌').setScale(1);
        this.mortisSign.setRotation(Phaser.Math.DegToRad(180)); // 初始旋转180°
        this.mortisSign.setDepth(0);
        
        // 添加祥子木牌 - 围绕指定中心点(800, 1920)旋转，初始旋转180°
        this.shoukoSign = this.add.image(800, 2300, '祥子木牌').setScale(1);
        this.shoukoSign.setRotation(Phaser.Math.DegToRad(180)); // 初始旋转180°
        this.shoukoSign.setDepth(0);
        
        // 计算相对于中心点的偏移量
        const mortisOffsetX = this.mortisSign.x - 318;
        const mortisOffsetY = this.mortisSign.y - 1920;
        const shoukoOffsetX = this.shoukoSign.x - 800;
        const shoukoOffsetY = this.shoukoSign.y - 1920;
        
        // 创建莫提丝木牌围绕(318, 1920)顺时针旋转170°的动画
        let mortisRotation = 0;
        this.tweens.add({
            targets: { value: 0 },
            value: 170,
            duration: 300,
            ease: 'Linear',
            onUpdate: (tween, target) => {
                mortisRotation = target.value;
                const radians = Phaser.Math.DegToRad(mortisRotation);
                // 计算新位置 - 围绕中心点旋转
                this.mortisSign.x = 318 + mortisOffsetX * Math.cos(radians) - mortisOffsetY * Math.sin(radians);
                this.mortisSign.y = 1920 + mortisOffsetX * Math.sin(radians) + mortisOffsetY * Math.cos(radians);
                // 设置图片旋转角度
                this.mortisSign.rotation = radians;
            }
        });
        
        // 创建祥子木牌围绕(800, 1920)逆时针旋转173°的动画
        this.tweens.add({
            targets: { value: 0 },
            value: 173,
            duration: 300,
            ease: 'Linear',
            onUpdate: (tween, target) => {
                const radians = -Phaser.Math.DegToRad(target.value); // 负号表示逆时针
                // 计算新位置 - 围绕中心点旋转
                this.shoukoSign.x = 800 + shoukoOffsetX * Math.cos(radians) - shoukoOffsetY * Math.sin(radians);
                this.shoukoSign.y = 1920 + shoukoOffsetX * Math.sin(radians) + shoukoOffsetY * Math.cos(radians);
                // 设置图片旋转角度
                this.shoukoSign.rotation = radians;
            }
        });

        // 初始创建主菜单按钮
        this.createMainMenuButtons();
    }

    // 创建主菜单按钮
    createMainMenuButtons() {
        // 创建规则按钮 - 使用图片
        const ruleButton = this.add.image(50, 50, '规则');
        ruleButton.setScale(1);
        ruleButton.setOrigin(0, 0); // 设置左上角为原点
        ruleButton.setInteractive();

        // 添加按钮交互事件
        ruleButton.on('pointerover', () => {
            ruleButton.setTexture('规则鼠标悬置');
        });

        ruleButton.on('pointerout', () => {
            ruleButton.setTexture('规则');
        });

        ruleButton.on('pointerdown', () => {
            // 规则按钮功能实现
            console.log('点击了规则按钮');
            
            // 禁用所有主界面按钮
            this.mainMenuButtons.forEach(button => {
                button.disableInteractive();
            });
            
            // 禁用规则按钮
            ruleButton.disableInteractive();
            
            // 创建规则背景纸
            const ruleBackground = this.add.image(this.game.config.width / 2, this.game.config.height / 2, '规则背景纸');
            ruleBackground.setDisplaySize(1650, 1650);
            ruleBackground.setDepth(50); // 设置深度，确保显示在前面
            
            // 在右上角添加关闭按钮（×）
            const closeButton = this.add.text(
                ruleBackground.x + ruleBackground.displayWidth / 2 - 50,
                ruleBackground.y - ruleBackground.displayHeight / 2 + 50,
                '×',
                {
                    fontSize: '64px',
                    color: '#000',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold'
                }
            );
            closeButton.setOrigin(0.5);
            closeButton.setDepth(51); // 设置深度，确保显示在背景纸上面
            closeButton.setInteractive();
            
            // 当前页码
            let currentPage = 1;
            
            // 规则内容数据
            const ruleData = {
                page1: [
                    {
                        title: '基本操作',
                        content: '通过↑↓←→控制丰川祥子' + '\u00A0'.repeat(10) + '的方向，每回合移动一次，空格可以在原地等待一次。',
                        images: [
                            { name: '丰川祥子Normal', x: -243, y: 40 }
                        ]
                    },
                    {
                        title: '基本规则',
                        content: '在不被莫提斯' + '\u00A0'.repeat(10) + '抓到的情况下找到难绷的假面即可过关。',
                        images: [
                            { name: 'Mortis', x: -332, y: 40 }
                        ]
                    },
                    {
                        title: '光照',
                        content: '场景中存在月光光照，障碍物可以阻挡月光，除了玩家以外的所有人物，以及除了闪亮黄瓜以外的所有道具在没有被月光照射的阴影中都无法被玩家看到。如果莫提斯在明亮处，则莫提斯一回合移动两格。'
                    },
                    {
                        title: '视野',
                        content: '玩家的视野包括左，右，前三格，视野范围内可以看到阴暗中的道具与角色。所有乐队成员都有自己的视野，如果莫提斯在移动后主动进入了视野范围内，则会逃跑到地图上随机阴暗格子（如果在移动前就在视野内则不会逃跑）。'
                    },
                    {
                        title: '伙伴与分数',
                        content: '玩家可以通过收集道具“闪亮黄瓜”增加分数，如果玩家与可招募的伙伴在同一个格子，则可以消耗一根“闪亮黄瓜”招募该伙伴。一根闪亮黄瓜使分数+1，招募伙伴可获得该伙伴对应的分数。'
                    }
                ],
                page2: [
                    {
                        title: '莫提斯',
                        content: '会主动跟踪丰川祥子，三角初华，八幡海玲，佑天寺若麦',
                        images: [
                            { name: 'Mortis', x: -390, y: 0 },

                        ]
                    },
                    {
                        title: '三角初华',
                        content: '会自动跟踪玩家，招募该伙伴不需要消耗“闪亮黄瓜”，当被mortis抓到时，如果该伙伴在当前乐队中，则游戏不会结束，该伙伴消失并将mortis随机传送到地图上的阴暗格子。招募该伙伴增加的分数为1。',
                        images: [
                            { name: '三角初华', x: -360, y: 0 }
                        ]
                    },
                    {
                        title: '若叶睦',
                        content: '当若叶睦与“闪亮黄瓜”重合时，会捡起该格子上的黄瓜。莫提斯不会将若叶睦作为跟踪目标，但是当莫提斯不小心与若叶睦处在相同的格子上时依然会干掉若叶睦，并在之后由莫提斯捡黄瓜。招募该伙伴增加的分数为2+（若叶睦此时捡到的黄瓜数量）。',
                        images: [
                            { name: '若叶睦', x: -390, y: 0 }
                        ]
                    },
                    {
                        title: '八幡海玲',
                        content: '拥有贝斯手特有的隐身天赋，当莫提斯在该角色五格范围以外时不会追踪该角色。招募该伙伴增加的分数为2。',
                        images: [
                            { name: '八幡海玲', x: -360, y: +10 }
                        ]
                    },
                    {
                        title: '佑天寺若麦',
                        content: '不会被莫提斯干掉，但在第一次被莫提斯抓到之后会解除对莫提斯的嘲讽。招募该伙伴增加的分数为2。',
                        images: [
                            { name: '佑天寺若麦', x: -330, y: 0 }
                        ]
                    }
                ]
            };
            
            // 创建规则显示函数
            function createRules(page) {
                const rules = ruleData[`page${page}`];
                const ruleElements = [];
                
                let yOffset = -250;
                rules.forEach(rule => {
                    // 添加规则标题
                    const titleText = this.add.text(ruleBackground.x - 500, ruleBackground.y + yOffset, rule.title, {
                        fontSize: '26px',
                        color: '#000',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold'
                    });
                    titleText.setDepth(51);
                    ruleElements.push(titleText);
                    
                    // 添加规则内容
                    const contentText = this.add.text(ruleBackground.x - 500, ruleBackground.y + yOffset + 40, rule.content, {
                        fontSize: '22px',
                        color: '#000',
                        fontFamily: 'Arial, sans-serif',
                        wordWrap: {
                            width: 1000,
                            useAdvancedWrap: true
                        },
                    });
                    contentText.setDepth(51);
                    ruleElements.push(contentText);
                    
                    // 添加角色图片
                    if (rule.images) {
                        rule.images.forEach(image => {
                            const img = this.add.image(ruleBackground.x + image.x, ruleBackground.y + yOffset + image.y, image.name);
                            img.setDisplaySize(64, 64);
                            img.setDepth(51);
                            ruleElements.push(img);
                        });
                    }
                    
                    // 调整下一条规则的y偏移
                    yOffset += 120;
                }, this);
                
                return ruleElements;
            }
            
            // 初始显示第一页规则
            let currentRuleElements = createRules.call(this, currentPage);
            
            // 添加页码显示
            const pageText = this.add.text(ruleBackground.x, ruleBackground.y + 450, `第 ${currentPage} / 2 页`, {
                fontSize: '32px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            pageText.setOrigin(0.5);
            pageText.setDepth(51);
            
            // 添加翻页按钮
            const prevButton = this.add.text(ruleBackground.x - 200, ruleBackground.y + 450, '上一页', {
                fontSize: '24px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            prevButton.setOrigin(0.5);
            prevButton.setDepth(51);
            prevButton.setInteractive();
            
            const nextButton = this.add.text(ruleBackground.x + 200, ruleBackground.y + 450, '下一页', {
                fontSize: '24px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            nextButton.setOrigin(0.5);
            nextButton.setDepth(51);
            nextButton.setInteractive();
            
            // 翻页函数
            function changePage(page) {
                // 销毁当前规则元素
                currentRuleElements.forEach(element => {
                    element.destroy();
                });
                
                // 更新页码
                currentPage = page;
                pageText.setText(`第 ${currentPage} / 2 页`);
                
                // 创建新页规则
                currentRuleElements = createRules.call(this, currentPage);
            }
            
            // 上一页按钮点击事件
            prevButton.on('pointerdown', () => {
                if (currentPage > 1) {
                    changePage.call(this, currentPage - 1);
                }
            });
            
            // 下一页按钮点击事件
            nextButton.on('pointerdown', () => {
                if (currentPage < 2) {
                    changePage.call(this, currentPage + 1);
                }
            });
            
            // 点击关闭按钮，销毁所有元素
            closeButton.on('pointerdown', () => {
                // 销毁规则元素
                currentRuleElements.forEach(element => {
                    element.destroy();
                });
                
                // 销毁页码显示和翻页按钮
                pageText.destroy();
                prevButton.destroy();
                nextButton.destroy();
                
                // 销毁关闭按钮和背景纸
                closeButton.destroy();
                ruleBackground.destroy();
                
                // 重新启用所有主界面按钮
                this.mainMenuButtons.forEach(button => {
                    button.setInteractive();
                });
                
                // 重新启用规则按钮
                ruleButton.setInteractive();
                
                console.log('关闭了规则');
            });
        });

        // 创建开始游戏按钮 - 使用图片
        const startGameButton = this.add.image(1190, 710, '主界面菜单按钮');
        startGameButton.setScale(1);
        startGameButton.setOrigin(0, 0); // 设置左上角为原点
        startGameButton.setInteractive();

        // 开始游戏按钮文本
        const startGameText = this.add.text(1190 + startGameButton.width / 2, 710 + startGameButton.height / 2, '开始游戏', {
            fontSize: '32px',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        // 保存文本引用
        startGameButton.textObject = startGameText;

        // 添加按钮交互事件
        startGameButton.on('pointerover', () => {
            startGameButton.setTexture('主界面鼠标悬停时菜单按钮');
        });

        startGameButton.on('pointerout', () => {
            startGameButton.setTexture('主界面菜单按钮');
        });

        startGameButton.on('pointerdown', () => {
            // 存储所有需要动画和销毁的元素引用
            const menuElements = {
                achievement: { button: achievementButton, text: achievementText },
                gallery: { button: galleryButton, text: galleryText },
                selectLevel: { button: selectLevelButton, text: selectLevelText },
                startGame: { button: startGameButton, text: startGameText },
                mortisSign: this.mortisSign,
                shoukoSign: this.shoukoSign,
                titleImage: this.titleImage,
                woodenSign: this.woodenSign
            };
            
            // 直接引用menuBackground或在create方法中保存引用
            
            // 动画序列函数
            const runAnimationSequence = () => {
                // 1. "成就"按钮及文本向右移动1000像素（0.1s）
                this.tweens.add({
                    targets: [menuElements.achievement.button, menuElements.achievement.text],
                    x: '+=' + 1000,
                    duration: 100,
                    ease: 'Linear',
                    onComplete: () => {
                        // 2. "图鉴"按钮及文本向右移动1000像素（0.1s）
                        this.tweens.add({
                            targets: [menuElements.gallery.button, menuElements.gallery.text],
                            x: '+=' + 1000,
                            duration: 100,
                            ease: 'Linear',
                            onComplete: () => {
                                // 3. "选择关卡"按钮及文本向右移动1000像素（0.1s）
                                this.tweens.add({
                                    targets: [menuElements.selectLevel.button, menuElements.selectLevel.text],
                                    x: '+=' + 1000,
                                    duration: 100,
                                    ease: 'Linear',
                                    onComplete: () => {
                                        // 4. "开始游戏"按钮及文本向右移动1000像素（0.1s）
                                        this.tweens.add({
                                            targets: [menuElements.startGame.button, menuElements.startGame.text],
                                            x: '+=' + 1000,
                                            duration: 100,
                                            ease: 'Linear',
                                            onComplete: () => {
                                                // 5. '菜单栏背景'向右移动1000像素(0.1s)
                                                // 找到菜单栏背景元素
                                                const menuBackground = this.children.getAll().find(child => child.texture && child.texture.key === '菜单栏背景');
                                                this.tweens.add({
                                                    targets: menuBackground,
                                                    x: '+=' + 1200,
                                                    duration: 100,
                                                    ease: 'Linear',
                                                    onComplete: () => {
                                                        // 6. '莫提丝木牌'顺时针旋转10°（0.1s）
                                                        this.tweens.add({
                                                            targets: menuElements.mortisSign,
                                                            rotation: menuElements.mortisSign.rotation + Phaser.Math.DegToRad(20),
                                                            duration: 100,
                                                            ease: 'Linear',
                                                            onComplete: () => {
                                                                // 添加顺时针旋转7°后的祥子哭木牌
                                                                this.shoukoCrySign = this.add.image(846.31, 1542.83, '祥子哭木牌');
                                                                this.shoukoCrySign.rotation = Phaser.Math.DegToRad(7);
                                                                this.shoukoCrySign.setDepth(5);
                                                                                                
                                                                // 销毁祥子木牌
                                                                if (menuElements.shoukoSign) {
                                                                    menuElements.shoukoSign.destroy();
                                                                }
                                                                
                                                                // 更新menuElements对象，让祥子哭木牌替代祥子木牌
                                                                menuElements.shoukoSign = this.shoukoCrySign;
                                                                // 7. '祥子木牌'向左上方15°移动20像素再向左下方15°移动600像素（0.6s）
                                                                // 先向左上方15°移动20像素
                                                                const initialX = menuElements.shoukoSign.x;
                                                                const initialY = menuElements.shoukoSign.y;
                                                                const firstMoveDuration = 100;
                                                                const secondMoveDuration = 500;
                                                                
                                                                this.tweens.add({
                                                                    targets: menuElements.shoukoSign,
                                                                    x: initialX + Math.cos(Phaser.Math.DegToRad(75)) * 20,
                                                                    y: initialY - Math.sin(Phaser.Math.DegToRad(75)) * 20,
                                                                    duration: firstMoveDuration,
                                                                    ease: 'Linear',
                                                                    onComplete: () => {
                                                                        // 再向左下方15°移动600像素
                                                                        this.tweens.add({
                                                                            targets: menuElements.shoukoSign,
                                                                            x: initialX + Math.cos(Phaser.Math.DegToRad(75)) * 20 + Math.cos(Phaser.Math.DegToRad(75)) * 1000,
                                                                            y: initialY - Math.sin(Phaser.Math.DegToRad(75)) * 20 + Math.sin(Phaser.Math.DegToRad(75)) * 1000,
                                                                            duration: secondMoveDuration,
                                                                            ease: 'Linear',
                                                                            onComplete: () => {
                                                                                // 8. 间歇1s
                                                                                setTimeout(() => {
                                                                                    // 9. '莫提丝木牌'向下移动600像素，同时'逃离莫提丝字体'和'悬挂木牌'共同向上移动1000像素（0.2s）
                                                                                    const tweensConfig = [
                                                                                        {
                                                                                            targets: menuElements.mortisSign,
                                                                                            y: '+=' + 600,
                                                                                            duration: 200,
                                                                                            ease: 'Linear'
                                                                                        },
                                                                                        {
                                                                                            targets: [menuElements.titleImage, menuElements.woodenSign],
                                                                                            y: '-=' + 1000,
                                                                                            duration: 200,
                                                                                            ease: 'Linear',
                                                                                            onComplete: () => {
                                                                                                // 动画完成后销毁所有元素
                                                                                                // 安全地销毁所有已知元素
                                                                                                try {
                                                                                                    // 销毁按钮和文本
                                                                                                    if (achievementButton) achievementButton.destroy();
                                                                                                    if (achievementText) achievementText.destroy();
                                                                                                    if (galleryButton) galleryButton.destroy();
                                                                                                    if (galleryText) galleryText.destroy();
                                                                                                    if (selectLevelButton) selectLevelButton.destroy();
                                                                                                    if (selectLevelText) selectLevelText.destroy();
                                                                                                    if (startGameButton) startGameButton.destroy();
                                                                                                    if (startGameText) startGameText.destroy();
                                                                                                    
                                                                                                    // 销毁图片元素
                                                                                                    if (this.mortisSign) this.mortisSign.destroy();
                                                                                                    if (this.shoukoSign) this.shoukoSign.destroy();
                                                                                                    if (this.titleImage) this.titleImage.destroy();
                                                                                                    if (this.woodenSign) this.woodenSign.destroy();
                                                                                                    
                                                                                                    // 销毁菜单栏背景
                                                                                                    const menuBg = this.children.getAll().find(child => child && child.texture && child.texture.key === '菜单栏背景');
                                                                                                    if (menuBg) menuBg.destroy();
                                                                                                } catch (error) {
                                                                                                    console.log('销毁元素时发生错误:', error);
                                                                                                }
                                                                                                
                                                                                                // 从第一关开始游戏，直接传递allowAccessToTheNextLevel: true参数
                                                                                                setTimeout(() => {
                                                                                                    // 播放关卡切换视频
                                                                                                    const transitionVideo = this.add.video(this.game.config.width / 2, this.game.config.height / 2, '关卡短切换level1');
                                                                                                    transitionVideo.setDisplaySize(1920, 1920);
                                                                                                    transitionVideo.setDepth(100); // 设置高深度，确保显示在最前面
                                                                                                    transitionVideo.play();
                                                                                                    
                                                                                                    // 视频结束后启动游戏场景
                                                                                                    transitionVideo.on('complete', () => {
                                                                                                        transitionVideo.destroy();
                                                                                                        // 启动游戏场景，直接在参数中设置allowAccessToTheNextLevel为true
                                                                                                        this.scene.start('GameScene', { 
                                                                                                            level: 1, 
                                                                                                            fromMain: true,

                                                                                                            allowAccessToTheNextLevel: true 
                                                                                                        });
                                                                                                    });
                                                                                                }, 100);
                                                                                            }
                                                                                        }
                                                                                    ];
                                                                                    
                                                                                    tweensConfig.forEach(config => {
                                                                                        this.tweens.add(config);
                                                                                    });
                                                                                }, 1000);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            };
            
            // 开始执行动画序列
            runAnimationSequence();
        });

        // 创建选择关卡按钮 - 使用图片
        const selectLevelButton = this.add.image(1280, 980, '主界面菜单按钮');
        selectLevelButton.setScale(1);
        selectLevelButton.setOrigin(0, 0); // 设置左上角为原点
        
        // 检查玩家是否已经通关过
        const achievements = JSON.parse(localStorage.getItem('gameAchievements') || '{}');
        const hasCompletedGame = achievements[1] || false; // 成就1是"演出成功"，对应通关一次
        
        if (hasCompletedGame) {
            // 已通关，启用选择关卡按钮
            selectLevelButton.setInteractive();
        } else {
            // 未通关，禁用选择关卡按钮并显示为灰色
            selectLevelButton.disableInteractive();
            selectLevelButton.setTint(0x888888); // 设置为灰色
        }

        // 选择关卡按钮文本
        const selectLevelText = this.add.text(1280 + selectLevelButton.width / 2, 980 + selectLevelButton.height / 2, '选择关卡', {
            fontSize: '32px',
            color: hasCompletedGame ? '#fff' : '#aaa', // 未通关时文本为灰色
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        // 保存文本引用
        selectLevelButton.textObject = selectLevelText;

        // 添加按钮交互事件
        selectLevelButton.on('pointerover', () => {
            if (hasCompletedGame) {
                selectLevelButton.setTexture('主界面鼠标悬停时菜单按钮');
            }
        });

        selectLevelButton.on('pointerout', () => {
            if (hasCompletedGame) {
                selectLevelButton.setTexture('主界面菜单按钮');
            }
        });

        selectLevelButton.on('pointerdown', () => {
            if (hasCompletedGame) {
                // 进入关卡选择模式
                this.enterLevelSelectMode();
            }
        });

        // 创建图鉴按钮 - 使用图片
        const galleryButton = this.add.image(1370, 1250, '主界面菜单按钮');
        galleryButton.setScale(1);
        galleryButton.setOrigin(0, 0); // 设置左上角为原点
        galleryButton.setInteractive();

        // 图鉴按钮文本
        const galleryText = this.add.text(1370 + galleryButton.width / 2, 1250 + galleryButton.height / 2, '图鉴', {
            fontSize: '32px',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        // 保存文本引用
        galleryButton.textObject = galleryText;

        // 添加按钮交互事件
        galleryButton.on('pointerover', () => {
            galleryButton.setTexture('主界面鼠标悬停时菜单按钮');
        });

        galleryButton.on('pointerout', () => {
            galleryButton.setTexture('主界面菜单按钮');
        });

        galleryButton.on('pointerdown', () => {
            // 图鉴功能实现
            console.log('点击了图鉴按钮');
            
            // 禁用所有主界面按钮
            this.mainMenuButtons.forEach(button => {
                button.disableInteractive();
            });
            
            // 创建图鉴背景纸
            const galleryBackground = this.add.image(this.game.config.width / 2, this.game.config.height / 2, '图鉴背景纸');
            galleryBackground.setDisplaySize(1650, 1650);
            galleryBackground.setDepth(50); // 设置深度，确保显示在前面
            
            // 在右上角添加关闭按钮（×）
            const closeButton = this.add.text(
                galleryBackground.x + galleryBackground.displayWidth / 2 - 50,
                galleryBackground.y - galleryBackground.displayHeight / 2 + 50,
                '×',
                {
                    fontSize: '64px',
                    color: '#000',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold'
                }
            );
            closeButton.setOrigin(0.5);
            closeButton.setDepth(51); // 设置深度，确保显示在背景纸上面
            closeButton.setInteractive();
            
            // 当前页码
            let currentPage = 1;
            
            // 道具数据
            const itemsData = {
                page1: [
                    { name: 'cucumber', displayName: '闪亮黄瓜', description: '闪闪发光的黄瓜，在黑暗中也能看到，+1分', x: -300, y: -150 },
                    { name: 'mask', displayName: '难绷的假面', description: '演出前一定要带上假面！过关所需的道具。', x: 0, y: -150 },
                    { name: '爱音的手机', displayName: '爱音的手机', description: '关注了若麦的频道，貌似可以通过直播间的背景看到她在哪里', x: 300, y: -150 },
                    { name: '素世的香水', displayName: '素世的香水', description: '贵重的香水，貌似可以吸引睦', x: -300, y: 150 },
                    { name: '巧克力奶', displayName: '巧克力奶', description: '立希给的巧克力奶，貌似可以吸引海玲', x: 0, y: 150 },
                    { name: '天文望远镜', displayName: '天文望远镜', description: '有了它你可以看得更远', x: 300, y: 150 }
                ],
                page2: [
                    { name: '抹茶巴菲', displayName: '抹茶巴菲', description: '乐奈最喜欢吃这个', x: -300, y: -150 },
                    { name: '迈巴赫钥匙', displayName: '迈巴赫钥匙', description: '祥子未成年没有驾照，因此只能用来打开迈巴赫的车门', x: 0, y: -150 },
                    { name: '空啤酒罐', displayName: '空啤酒罐', description: '被某人喝光扔掉的啤酒罐', x: 300, y: -150 },
                    { name: '芭蕾舞鞋', displayName: '芭蕾舞鞋', description: '不能用来呼叫医生。持有它时睦不会被莫提斯干掉。', x: -300, y: 150 },
                    { name: 'Mygo联合演出邀请函', displayName: 'Mygo联合演出邀请函', description: '可以大幅提高Mygo角色出现的概率', x: 0, y: 150 },
                    { name: '神秘的玩偶', displayName: '神秘的玩偶', description: '可以用来干什么呢？搞不懂', x: 300, y: 150 }
                ],
                page3: [
                    { name: '甜甜圈', displayName: '甜甜圈', description: '纯田真奈给的甜甜圈，当队伍中已经招募三角初华时被莫提斯抓到，可以消耗一个甜甜圈避免三角初华消失，最多只能持有一个哦。', x: -300, y: -150 }
                ]
            };
            
            // 获取玩家已收集的道具
            const collectedItems = JSON.parse(localStorage.getItem('gameCollectedItems') || '[]');
            const inventoryItemTypes = JSON.parse(localStorage.getItem('gameInventory') || '{}');
            console.log('-----------------collectedItems-----------------', collectedItems)
            // 创建道具显示函数
            function createItems(page) {
                const items = itemsData[`page${page}`];
                const itemSprites = [];
                
                items.forEach(itemData => {
                    // 检查玩家是否获取过该道具
                    const hasItem = collectedItems.includes(itemData.name) || inventoryItemTypes[itemData.name];
                    
                    // 创建道具精灵
                    const itemX = galleryBackground.x + itemData.x;
                    const itemY = galleryBackground.y + itemData.y;
                    
                    // 创建道具显示
                    const itemSprite = this.add.image(itemX, itemY, itemData.name);
                    itemSprite.setDisplaySize(128, 128);
                    itemSprite.setDepth(51);
                    
                    // 如果玩家没有获取过该道具，设置为半透明（剪影效果）
                    if (!hasItem) {
                        itemSprite.setTint(0x222222);
                        itemSprite.alpha = 0.5;
                    }
                    
                    // 只有获得过的道具才显示名称和描述
                    let itemText = null;
                    let itemDescription = null;
                    if (hasItem) {
                        // 添加道具名称
                        itemText = this.add.text(itemX, itemY + 80, itemData.displayName, {
                            fontSize: '24px',
                            color: '#000',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold'
                        });
                        itemText.setOrigin(0.5);
                        itemText.setDepth(51);
                        
                        // 添加道具描述
                        itemDescription = this.add.text(itemX, itemY + 120, itemData.description, {
                            fontSize: '20px',
                            color: '#000',
                            fontFamily: 'Arial, sans-serif',
                            align: 'center',
                            wordWrap: {
                                width: 200,
                                useAdvancedWrap: true
                            }
                        });
                        itemDescription.setOrigin(0.5, 0); // 水平居中，垂直顶端对齐
                        itemDescription.setDepth(51);
                    }
                    
                    itemSprites.push({ sprite: itemSprite, text: itemText, description: itemDescription });
                }, this);
                
                return itemSprites;
            }
            
            // 初始显示第一页道具
            let currentItems = createItems.call(this, currentPage);
            
            // 添加页码显示
            const pageText = this.add.text(galleryBackground.x, galleryBackground.y + 350, `第 ${currentPage} / 3 页`, {
                fontSize: '32px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            pageText.setOrigin(0.5);
            pageText.setDepth(51);
            
            // 添加翻页按钮
            const prevButton = this.add.text(galleryBackground.x - 200, galleryBackground.y + 350, '上一页', {
                fontSize: '24px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            prevButton.setOrigin(0.5);
            prevButton.setDepth(51);
            prevButton.setInteractive();
            
            const nextButton = this.add.text(galleryBackground.x + 200, galleryBackground.y + 350, '下一页', {
                fontSize: '24px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            nextButton.setOrigin(0.5);
            nextButton.setDepth(51);
            nextButton.setInteractive();
            
            // 翻页函数
            function changePage(page) {
                // 销毁当前道具
                currentItems.forEach(item => {
                    item.sprite.destroy();
                    if (item.text) {
                        item.text.destroy();
                    }
                    if (item.description) {
                        item.description.destroy();
                    }
                });
                
                // 更新页码
                currentPage = page;
                pageText.setText(`第 ${currentPage} / 3 页`);
                
                // 创建新页道具
                currentItems = createItems.call(this, currentPage);
            }
            
            // 上一页按钮点击事件
            prevButton.on('pointerdown', () => {
                if (currentPage > 1) {
                    changePage.call(this, currentPage - 1);
                }
            });
            
            // 下一页按钮点击事件
            nextButton.on('pointerdown', () => {
                if (currentPage < 3) {
                    changePage.call(this, currentPage + 1);
                }
            });
            
            // 点击关闭按钮，销毁所有元素
            closeButton.on('pointerdown', () => {
                // 销毁道具
                currentItems.forEach(item => {
                    item.sprite.destroy();
                    if (item.text) {
                        item.text.destroy();
                    }
                    if (item.description) {
                        item.description.destroy();
                    }
                });
                
                // 销毁翻页按钮和页码
                prevButton.destroy();
                nextButton.destroy();
                pageText.destroy();
                
                // 销毁背景纸和关闭按钮
                galleryBackground.destroy();
                closeButton.destroy();
                
                // 重新启用所有主界面按钮
                this.mainMenuButtons.forEach(button => {
                    button.setInteractive();
                });
                
                console.log('关闭了图鉴');
            });
        });

        // 创建成就按钮 - 使用图片
        const achievementButton = this.add.image(1460, 1520, '主界面菜单按钮');
        achievementButton.setScale(1);
        achievementButton.setOrigin(0, 0); // 设置左上角为原点
        achievementButton.setInteractive();

        // 成就按钮文本
        const achievementText = this.add.text(1460 + achievementButton.width / 2, 1520 + achievementButton.height / 2, '成就', {
            fontSize: '32px',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        // 保存文本引用
        achievementButton.textObject = achievementText;

        // 添加按钮交互事件
        achievementButton.on('pointerover', () => {
            achievementButton.setTexture('主界面鼠标悬停时菜单按钮');
        });

        achievementButton.on('pointerout', () => {
            achievementButton.setTexture('主界面菜单按钮');
        });

        achievementButton.on('pointerdown', () => {
            // 成就功能实现
            console.log('点击了成就按钮');
            
            // 禁用所有主界面按钮
            this.mainMenuButtons.forEach(button => {
                button.disableInteractive();
            });
            
            // 创建成就背景纸
            const achievementBackground = this.add.image(this.game.config.width / 2, this.game.config.height / 2, '成就背景纸');
            achievementBackground.setDisplaySize(1650, 1650);
            achievementBackground.setDepth(50); // 设置深度，确保显示在前面
            
            // 在右上角添加关闭按钮（×）
            const closeButton = this.add.text(
                achievementBackground.x + achievementBackground.displayWidth / 2 - 50,
                achievementBackground.y - achievementBackground.displayHeight / 2 + 50,
                '×',
                {
                    fontSize: '64px',
                    color: '#000',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold'
                }
            );
            closeButton.setOrigin(0.5);
            closeButton.setDepth(51); // 设置深度，确保显示在背景纸上面
            closeButton.setInteractive();
            
            // 获取成就完成状态
            const achievements = JSON.parse(localStorage.getItem('gameAchievements') || '{}');
            
            // 成就数据
            const achievementData = [
                { id: 1, name: '演出成功', description: '通关一次', hidden: false },
                { id: 2, name: '安可', description: '通关两次', hidden: false },
                { id: 3, name: '全国巡演', description: '通关五次', hidden: false },
                { id: 4, name: '小有名气', description: '评价达到C', hidden: false },
                { id: 5, name: '上头条！', description: '评价达到B', hidden: false },
                { id: 6, name: '直通武道馆！！', description: '评价达到A', hidden: false },
                { id: 7, name: '乐队传奇！！！', description: '评价达到S及以上', hidden: false },
                { id: 8, name: 'Mygo_Avemujica', description: '点亮所有图鉴（除了甜甜圈）', hidden: false },
                { id: 9, name: '我要成为卡密', description: '开启白月光形态', hidden: true },
                { id: 10, name: 'sumimi是不会解散的！', description: '获得道具甜甜圈', hidden: true }
            ];
            
            // 当前页码
            let currentPage = 1;
            
            // 显示成就列表函数
            function createAchievements(page) {
                const startIndex = (page - 1) * 5;
                const endIndex = startIndex + 5;
                const pageAchievements = achievementData.slice(startIndex, endIndex);
                const pageItems = [];
                
                pageAchievements.forEach((achievement, index) => {
                    const x = achievementBackground.x - 600;
                    const y = achievementBackground.y - 300 + index * 120;
                    
                    // 检查成就是否已完成
                    const isCompleted = achievements[achievement.id] || false;
                    
                    // 显示成就名称和描述
                    let displayName = achievement.name;
                    let displayDescription = achievement.description;
                    
                    // 如果是隐藏成就且未完成，显示"隐藏成就"
                    if (achievement.hidden && !isCompleted) {
                        displayName = '隐藏成就';
                        displayDescription = '';
                    }
                    
                    // 添加成就名称
                    const nameText = this.add.text(x, y, displayName, {
                        fontSize: '24px',
                        color: '#000',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold'
                    });
                    nameText.setDepth(51);
                    
                    // 添加成就描述
                    const descText = this.add.text(x, y + 30, displayDescription, {
                        fontSize: '18px',
                        color: '#000',
                        fontFamily: 'Arial, sans-serif'
                    });
                    descText.setDepth(51);
                    
                    // 添加成就完成状态（打√）
                    const checkBoxX = achievementBackground.x + 500;
                    const checkBoxY = y + 15;
                    
                    // 创建复选框（黑色边缘+空心）
                    const checkBox = this.add.rectangle(checkBoxX, checkBoxY, 30, 30, 0xFFFFFF);
                    checkBox.setStrokeStyle(2, 0x000000);
                    checkBox.setDepth(51);
                    
                    // 如果成就已完成，添加√
                    if (isCompleted) {
                        const checkMark = this.add.text(checkBoxX - 8, checkBoxY - 15, '√', {
                            fontSize: '30px',
                            color: '#000',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold'
                        });
                        checkMark.setDepth(52);
                        pageItems.push(checkMark);
                    }
                    
                    pageItems.push(nameText);
                    pageItems.push(descText);
                    pageItems.push(checkBox);
                }, this);
                
                return pageItems;
            }
            
            // 初始显示第一页成就
            let currentAchievementItems = createAchievements.call(this, currentPage);
            
            // 添加页码显示
            const pageText = this.add.text(achievementBackground.x, achievementBackground.y + 350, `第 ${currentPage} / 2 页`, {
                fontSize: '32px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            pageText.setOrigin(0.5);
            pageText.setDepth(51);
            
            // 添加翻页按钮
            const prevButton = this.add.text(achievementBackground.x - 200, achievementBackground.y + 350, '上一页', {
                fontSize: '24px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            prevButton.setOrigin(0.5);
            prevButton.setDepth(51);
            prevButton.setInteractive();
            
            const nextButton = this.add.text(achievementBackground.x + 200, achievementBackground.y + 350, '下一页', {
                fontSize: '24px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            nextButton.setOrigin(0.5);
            nextButton.setDepth(51);
            nextButton.setInteractive();
            
            // 翻页函数
            function changePage(page) {
                // 销毁当前成就列表
                currentAchievementItems.forEach(item => {
                    item.destroy();
                });
                
                // 更新页码
                currentPage = page;
                pageText.setText(`第 ${currentPage} / 2 页`);
                
                // 创建新页成就
                currentAchievementItems = createAchievements.call(this, currentPage);
            }
            
            // 上一页按钮点击事件
            prevButton.on('pointerdown', () => {
                if (currentPage > 1) {
                    changePage.call(this, currentPage - 1);
                }
            });
            
            // 下一页按钮点击事件
            nextButton.on('pointerdown', () => {
                if (currentPage < 2) {
                    changePage.call(this, currentPage + 1);
                }
            });
            
            // 点击关闭按钮，销毁所有元素
            closeButton.on('pointerdown', () => {
                // 销毁成就列表元素
                currentAchievementItems.forEach(item => {
                    item.destroy();
                });
                
                // 销毁页码显示和翻页按钮
                pageText.destroy();
                prevButton.destroy();
                nextButton.destroy();
                
                // 销毁关闭按钮和背景纸
                closeButton.destroy();
                achievementBackground.destroy();
                
                // 重新启用所有主界面按钮
                this.mainMenuButtons.forEach(button => {
                    button.setInteractive();
                });
                
                console.log('关闭了成就');
            });
        });

        // 存储主菜单按钮引用
        this.mainMenuButtons = [startGameButton, selectLevelButton, galleryButton, achievementButton, ruleButton];
    }

    // 创建关卡按钮
    createLevelButtons() {
        const levels = [
            { id: 1, name: '关卡一', unlocked: true, x: 1190, y: 710 },
            { id: 2, name: '关卡二', unlocked: true, x: 1280, y: 980 },
            { id: 3, name: '关卡三', unlocked: true, x: 1370, y: 1250 },
            { id: 4, name: '特殊关卡', unlocked: true, x: 1460, y: 1520 }
        ];

        levels.forEach(level => {
            // 创建关卡按钮，初始位置在屏幕右侧外
            const button = this.add.image(level.x + 1000, level.y, '主界面菜单按钮');
            button.setScale(1);
            button.setOrigin(0, 0);
            button.setInteractive();
            button.setAlpha(level.unlocked ? 1 : 0.5);
            button.setData('levelId', level.id);
            button.setData('unlocked', level.unlocked);

            // 关卡按钮文本
            const levelText = this.add.text(level.x + 1000 + button.width / 2, level.y + button.height / 2, level.name, {
                fontSize: '32px',
                color: level.unlocked ? '#fff' : '#aaa',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            }).setOrigin(0.5);
            // 保存文本引用
            button.textObject = levelText;

            // 添加按钮交互事件
            if (level.unlocked) {
                button.on('pointerover', () => {
                    button.setTexture('主界面鼠标悬停时菜单按钮');
                });

                button.on('pointerout', () => {
                    button.setTexture('主界面菜单按钮');
                });

                button.on('pointerdown', () => {
                    // 从关卡选择开始游戏，不设置allowAccessToTheNextLevel，默认为false
                    this.scene.start('GameScene', { 
                        allowAccessToTheNextLevel: false,
                        level: level.id 
                    });
                });
            }

            this.levelButtons.push(button);
        });

        // 创建返回按钮，初始位置在屏幕右侧外
        const backButton = this.add.image(1524 + 1000, 387, '主界面返回按钮');
        backButton.setScale(1);
        backButton.setOrigin(0, 0);
        backButton.setInteractive();

        // 返回按钮文本
        const backButtonText = this.add.text(1524 + 1080 + backButton.width / 2, 387 + backButton.height / 2, '返回', {
            fontSize: '32px',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        // 保存文本引用
        backButton.textObject = backButtonText;

        // 添加返回按钮交互事件
        backButton.on('pointerover', () => {
            backButton.setTexture('主界面鼠标悬停时返回按钮');
        });

        backButton.on('pointerout', () => {
            backButton.setTexture('主界面返回按钮');
        });

        backButton.on('pointerdown', () => {
            // 返回主菜单模式
            this.returnToMainMenu();
        });

        this.levelButtons.push(backButton);
    }

    // 进入关卡选择模式
    enterLevelSelectMode() {
        this.isLevelSelectMode = true;

        // 确保按钮按照正确的顺序排列：[开始游戏, 选择关卡, 图鉴, 成就]
        // 我们需要反向遍历，按照成就->图鉴->选择关卡->开始游戏的顺序执行动画
        // 过滤掉规则按钮，确保它不会被移动
        const buttonsInOrder = [...this.mainMenuButtons].filter(button => button.texture && button.texture.key !== '规则').reverse(); // 反转数组，得到 [成就, 图鉴, 选择关卡, 开始游戏]
        
        // 依次执行按钮动画
        buttonsInOrder.forEach((button, index) => {
            // 延迟执行，每个按钮间隔0.2秒
            this.time.delayedCall(index * 200, () => {
                // 确保文本也参与动画
                if (button.textObject) {
                    this.tweens.add({
                        targets: button.textObject,
                        x: button.textObject.x + 1000,
                        duration: 200 // 0.2秒
                    });
                }
                
                this.tweens.add({
                    targets: button,
                    x: button.x + 1000,
                    duration: 200, // 0.2秒
                    onComplete: () => {
                        // 销毁按钮时同时销毁文本
                        if (button.textObject) {
                            button.textObject.destroy();
                        }
                        button.destroy();
                        
                        // 检查是否是最后一个按钮
                        if (index === buttonsInOrder.length - 1) {
                            // 所有按钮销毁后，清除引用并创建关卡按钮
                            this.mainMenuButtons = [];
                            this.createLevelButtons();
                            
                            // 关卡按钮同时从右侧移入，持续0.3秒
                            this.levelButtons.forEach(levelButton => {
                                this.tweens.add({
                                    targets: levelButton,
                                    x: levelButton.x - 1000,
                                    duration: 300 // 0.3秒
                                });
                                // 确保文本也参与动画
                                if (levelButton.textObject) {
                                    this.tweens.add({
                                        targets: levelButton.textObject,
                                        x: levelButton.textObject.x - 1000,
                                        duration: 300 // 0.3秒
                                    });
                                }
                            });
                        }
                    }
                });
            });
        });
    }

    // 返回主菜单模式
    returnToMainMenu() {
        this.isLevelSelectMode = false;

        // 确保关卡按钮按照正确的顺序排列：
        // [关卡一, 关卡二, 关卡三, 特殊关卡, 返回]
        // 我们需要重新排序，按照特殊关卡->关卡三->关卡二->关卡一->返回的顺序执行动画
        const buttonsCopy = [...this.levelButtons];
        
        // 找出返回按钮
        const backButton = buttonsCopy.find(btn => btn.texture.key === '主界面返回按钮');
        // 移除返回按钮
        const filteredButtons = buttonsCopy.filter(btn => btn !== backButton);
        
        // 按照特殊关卡->关卡三->关卡二->关卡一的顺序排列关卡按钮
        // 根据y坐标排序，因为从创建顺序看，y值越大的按钮在下方
        const sortedLevelButtons = [...filteredButtons].sort((a, b) => b.y - a.y);
        
        // 最终顺序：特殊关卡->关卡三->关卡二->关卡一->返回
        const buttonsInOrder = [...sortedLevelButtons];
        if (backButton) {
            buttonsInOrder.push(backButton);
        }
        
        // 依次执行按钮动画
        buttonsInOrder.forEach((button, index) => {
            // 延迟执行，每个按钮间隔0.2秒
            this.time.delayedCall(index * 200, () => {
                // 确保文本也参与动画
                if (button.textObject) {
                    this.tweens.add({
                        targets: button.textObject,
                        x: button.textObject.x + 1000,
                        duration: 200 // 0.2秒
                    });
                }
                
                this.tweens.add({
                    targets: button,
                    x: button.x + 1000,
                    duration: 200, // 0.2秒
                    onComplete: () => {
                        // 销毁按钮时同时销毁文本
                        if (button.textObject) {
                            button.textObject.destroy();
                        }
                        button.destroy();
                        
                        // 检查是否是最后一个按钮
                        if (index === buttonsInOrder.length - 1) {
                            // 所有按钮销毁后，清除引用并创建主菜单按钮
                            this.levelButtons = [];
                            this.createMainMenuButtons();
                                
                            // 主菜单按钮初始位置在屏幕右侧外
                            this.mainMenuButtons.forEach(mainButton => {
                                // 跳过规则按钮，确保它不会被移动
                                if (mainButton.texture && mainButton.texture.key === '规则') {
                                    return;
                                }
                                
                                const originalX = mainButton.x;
                                mainButton.x = originalX + 1000;
                                
                                // 确保文本对象也有正确的初始位置
                                if (mainButton.textObject) {
                                    // 文本的原始x坐标应该考虑到按钮宽度的一半，因为文本是居中的
                                    const textOriginalX = mainButton.textObject.x;
                                    mainButton.textObject.x = textOriginalX + 1000;
                                }
                                
                                // 主菜单按钮同时从右侧移入，持续0.3秒
                                this.tweens.add({
                                    targets: mainButton,
                                    x: originalX,
                                    duration: 300 // 0.3秒
                                });
                                // 确保文本也参与动画
                                if (mainButton.textObject) {
                                    this.tweens.add({
                                        targets: mainButton.textObject,
                                        x: originalX + mainButton.width / 2, // 确保文本回到正确的居中位置
                                        duration: 300 // 0.3秒
                                    });
                                }
                            });
                        }
                    }
                });
            });
        });
    }
    }


const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1920,
    parent: 'game-container',
    physics: { default: 'arcade', arcade: { debug: false } },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        disableWebAudio: false,  // 确保启用Web Audio
        noAudio: false,          // 确保不禁止音频
        context: null,           // 使用默认音频上下文
        volume: 1.0              // 设置默认音量
    },
    dom: {
        createContainer: true
    },
    loader: {
        crossOrigin: 'anonymous'
    },
    scene: [BootScene, MainScene, GameScene]
};

const game = new Phaser.Game(config);