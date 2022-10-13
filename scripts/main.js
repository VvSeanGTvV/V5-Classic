const AI = require("unitAI"); //unitAI Lib

// --- Units Region Start ---
const jave = extend(UnitType, "javelin-ship", {
});
jave.constructor = () => extend(UnitEntity, {});
jave.abilities.add(MoveLightningAbility(3, 10, 0.65,  10, 3.6, 6, Color.valueOf("b2c6d2"), "javelin-ship-shield")); //Use abilites from recent version

const liche = extend(UnitType, "Lich", {
});
liche.constructor = () => extend(UnitEntity, {});
liche.controller = AI.IgnoreDefenseAI;
liche.targetFlags = [BlockFlag.turret, BlockFlag.core, null]; //Main Targets

const flarew = extend(UnitType, "wraith", {
});
flarew.constructor = () => extend(UnitEntity, {});
flarew.controller = AI.FlareAI;
flarew.circleTarget = true; //Old CircleTarget use the new one from AIController.
// --- Units Region End ---
