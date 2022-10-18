// JS LIB
const AI = require("unitAI"); //unitAI Lib
const Ability = require("abilityLIB"); //ability Lib

// features
require("snekFunction"); //snek

// --- Variables ---
var previewVer = true; //Mod is on previewVer or Unstable Ver
var BetaVer = true; //Mod is on beta

// --- Units Region Start ---
// --- Mech Units ---
const jave = extend(UnitType, "javelin-ship", {
});
jave.abilities.add(MoveLightningAbility(3, 10, 0.35, 10, 3.6, 6, Color.valueOf("b2c6d2"), "classicv5-javelin-ship-shield")); //Use abilites from recent version
jave.constructor = () => extend(UnitEntity, {});

const omega = extend(UnitType, "omega-mech", {
});
omega.abilities.add(Ability.ArmorConfigAbility());
omega.constructor = () => extend(MechUnit, {});

const javemech = extend(UnitType, "delta-mech", {
});
javemech.abilities.add(Ability.ShockWaveLanding()); 
javemech.constructor = () => extend(MechUnit, {});

// --- Normal Units ---
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

const bomberplane = extend(UnitType, "ghoul", {
});
bomberplane.constructor = () => extend(UnitEntity, {});
bomberplane.controller = AI.BomberAI; //Use FlareAI for now :)
bomberplane.circleTarget = true; //Old CircleTarget use the new one from AIController.
// --- Units Region End ---

// --- Dialog ---
Events.on(ClientLoadEvent, cons(et => {
    if(previewVer == true){
        const dl1 = new BaseDialog("Welcome to Unstable Channel of V5!");
        dl1.addCloseButton();
        dl1.cont.pane(cons(t => {
        t.center();
        t.margin(60);
        t.add("[red]! Disclamer ![]").pad(6).row();
        t.image().growX().height(4).pad(4).color(Color.lightGray).row();
        t.add("This mod is currently unfinished and Unstable! You may experienced some bugs or unfinished contents. [sky]Mod Browser[].");
        })).grow();
        dl1.show();
    }
}));
