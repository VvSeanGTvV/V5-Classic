
const ArmorConfigAbility = () => { //Use legacy style format combined with new style
    var armorEffectRegion;
    var armorRegion;
    var healthMultiplier = 1.2;
    var warmup = 0;
    var z = Layer.effect;

    return extend(Ability, {
        localized() {
            return "Armored Configuration" //Name of the ability lolz.
        },
        update(unit){
            this.super$update(unit);

            warmup = Mathf.lerpDelta(warmup, unit.isShooting ? 1 : 0, 0.1);
            unit.healthMultiplier += warmup * healthMultiplier;

            
            
        },
        draw(unit){
            //Color.valueOf(ColorArmor)
            armorEffectRegion = Core.atlas.find(unit.type.name + "-armor-effect", unit.type.region);
           // armorRegion = Core.atlas.find(unit.type.name + "-armor", unit.type.region);
            armorRegion = Core.atlas.find(unit.type.name + "-armor", unit.type.region);
            Draw.alpha(warmup);
            Draw.rect(armorRegion, unit.x, unit.y, unit.rotation - 90);

            if(warmup > 0.001){
                Draw.draw(z <= 0 ? Draw.z() : z, () => {
                    Shaders.armor.progress = warmup;
                    Shaders.armor.region = armorEffectRegion;
                    Shaders.armor.time = Time.time / 10;
                    

                    Draw.color(Pal.accent);//ColorArmor);
                    //Shaders.armor.color.set(Pal.accent).a = warmup;
                    Draw.shader(Shaders.armor);
                    Draw.rect(Shaders.armor.region, unit.x, unit.y, unit.rotation - 90);
                    Draw.shader();
                    Draw.reset();
                })

            }
        },
    });
}
exports.ArmorConfigAbility = ArmorConfigAbility;
//#fed37f

// --- ShockWave Constructor ---
const ShockWaveLightning = (Unit, Damage, LightningLengthRand, LightningLength) => {
    var unit = Unit;
    Lightning.create(unit.team, Pal.lancerLaser, Damage * Vars.state.rules.playerDamageMultiplier, unit.getX(), unit.getY(), Mathf.random(LightningLengthRand), LightningLength);
    Lightning.create(unit.team, Pal.lancerLaser, Damage * Vars.state.rules.playerDamageMultiplier, unit.getX(), unit.getY(), Mathf.random(LightningLengthRand), LightningLength);
    Lightning.create(unit.team, Pal.lancerLaser, Damage * Vars.state.rules.playerDamageMultiplier, unit.getX(), unit.getY(), Mathf.random(LightningLengthRand), LightningLength);
    Lightning.create(unit.team, Pal.lancerLaser, Damage * Vars.state.rules.playerDamageMultiplier, unit.getX(), unit.getY(), Mathf.random(LightningLengthRand), LightningLength);
    Lightning.create(unit.team, Pal.lancerLaser, Damage * Vars.state.rules.playerDamageMultiplier, unit.getX(), unit.getY(), Mathf.random(LightningLengthRand), LightningLength);
    Lightning.create(unit.team, Pal.lancerLaser, Damage * Vars.state.rules.playerDamageMultiplier, unit.getX(), unit.getY(), Mathf.random(LightningLengthRand), LightningLength);
    Lightning.create(unit.team, Pal.lancerLaser, Damage * Vars.state.rules.playerDamageMultiplier, unit.getX(), unit.getY(), Mathf.random(LightningLengthRand), LightningLength);
}
const ShockWaveLanding = (cooldown) => { //Use legacy style format combined with new style
    var onGroundAlready = true;
    return extend(Ability, {
        localized() {
            return "Discharge" //Name of the ability lolz.
        },
        update(unit){
            if(unit.isGrounded()){
                if(onGroundAlready == false){
                    Fx.landShock.at(unit);
                    onGroundAlready = true;
                    ShockWaveLightning(unit, 17, 360, 16);
                }
            } else {
                onGroundAlready = false
            }
        },
        draw(unit){

        }

    });
}
exports.ShockWaveLanding = ShockWaveLanding;