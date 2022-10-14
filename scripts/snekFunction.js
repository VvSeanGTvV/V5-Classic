// This was integrated from v5dustry :)
let sorter = (block) => {
    let h = () => extend(Sorter.SorterBuild, block, {
        isSame(other){
            return other != null && other.block instanceof Sorter;
        },
        getTileTarget(item, source, flip){
            let dir = source.relativeTo(this.tile.x, this.tile.y);
            if(dir == -1) return null;
            let to;

            if(((item == this.sortItem) != this.block.invert) == this.enabled){
                //prevent 3-chains, but not overflow gates :D
                if(this.isSame(source) && this.isSame(this.nearby(dir))){
                    return null;
                }
                to = this.nearby(dir);
            }else{
                let a = this.nearby(Mathf.mod(dir - 1, 4));
                let b = this.nearby(Mathf.mod(dir + 1, 4));
                let ac = a != null && !(this.isSame(a) && this.isSame(source)) && a.acceptItem(this, item);
                let bc = b != null && !(this.isSame(b) && this.isSame(source)) && b.acceptItem(this, item);

                if(ac && !bc){
                    to = a;
                }else if(bc && !ac){
                    to = b;
                }else if(!bc){
                    return null;
                }else{
                    if(this.rotation == 0){
                        to = a;
                        if(flip) this.rotation = 1;
                    }else{
                        to = b;
                        if(flip) this.rotation = 0;
                    }
                }
            }

            return to;
        }
    });
    return h;
};

let flowgate = (block) => {
    let h = () => extend(OverflowGate.OverflowGateBuild, block, {
        getTileTarget(item, src, flip){
            let from = this.relativeToEdge(src.tile);
            if(from == -1) return null;
            let to = this.nearby((from + 2) % 4);
            let
                fromInst = src.block instanceof OverflowGate,
                canForward = to != null && to.team == this.team && !(fromInst && to.block instanceof OverflowGate) && to.acceptItem(this, item),
                inv = this.block.invert == this.enabled;

            if(!canForward || inv){
                let a = this.nearby(Mathf.mod(from - 1, 4));
                let b = this.nearby(Mathf.mod(from + 1, 4));
                let ac = a != null && !(fromInst && a.block instanceof OverflowGate) && a.team == this.team && a.acceptItem(this, item);
                let bc = b != null && !(fromInst && b.block instanceof OverflowGate) && b.team == this.team && b.acceptItem(this, item);

                if(!ac && !bc){
                    return inv && canForward ? to : null;
                }

                if(ac && !bc){
                    to = a;
                }else if(bc && !ac){
                    to = b;
                }else{
                    if(this.rotation == 0){
                        to = a;
                        if(flip) this.rotation = 1;
                    }else{
                        to = b;
                        if(flip) this.rotation = 0;
                    }
                }
            }

            return to;
        }
    });
    return h;
};

Blocks.sorter.buildType = sorter(Blocks.sorter);
Blocks.invertedSorter.buildType = sorter(Blocks.invertedSorter);
Blocks.overflowGate.buildType = flowgate(Blocks.overflowGate);
Blocks.underflowGate.buildType = flowgate(Blocks.underflowGate);
