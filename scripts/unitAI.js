const IgnoreDefenseAI = () => { //This is similar to Lich AI from V5
    return extend(AIController, {
        updateMovement(){
            var core = this.unit.closestEnemyCore();

            if(this.target != null && this.unit.within(this.target, this.unit.type.range * 0.5)){
                this.unit.aim(this.target); //aim the weapon at target while moving towards the core.
            }
            if(core != null && !this.unit.within(core, this.unit.type.range * 0.5)){
                this.moveTo(core, this.unit.type.range * 0.5); //Follow to the Enemy Core.
                this.unit.lookAt(core);
            }
            if(core != null && this.unit.within(core, this.unit.type.range * 0.55)){
                if(core != null){ //check if core or the building still exist
                    this.moveTo(core, 1); //Hug the Core.
                    this.unit.aim(core); //auto aim to core after that. (basically game over)
                }
            }
        },
    });
}
exports.IgnoreDefenseAI = IgnoreDefenseAI;



const FlareAI = () => { //This is similar to Flare/Wraith AI from V5 or V6
    return extend(AIController, {
        updateMovement(){
            var closestTarget = this.getClosestSpawner();
            var core = this.unit.closestEnemyCore();
            if(this.target != null){
                this.unit.lookAt(this.target);
                if(this.unit.type.circleTarget){ //If CircleTarget = true in Unit
                    this.circleAttack(100); //Do the circle target.
                }
                if(!this.unit.within(this.target, this.unit.type.range * 0.8)){
                    this.unit.aim(this.target); //aim the weapon at target
                    this.moveTo(this.target, this.unit.type.range * 0.8); //move towards the enemy
                }
            } else if(this.target == null && core != null) {
                this.moveTo(core, this.unit.type.range * 0.8); //Vars.state.rules.dropZoneRadius + 120); //if no block exist target nearest enemy block
            }
        },
    });
}
exports.FlareAI = FlareAI;