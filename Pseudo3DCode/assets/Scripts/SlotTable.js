const FORMAT_TABLE=[3,3,3];
const SYMBOL = {
    WIDTH: 195,
    HEIGHT: 270
}

cc.Class({
    extends: cc.Component,

    properties: {
        reelPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.reels = [];
        this.initTable();
        window.table3D = this;
    },

    // start () {
    // },

    // update (dt) {},

    initTable(){
        for (let i = 0; i < FORMAT_TABLE.length; i++){
            let reel = cc.instantiate(this.reelPrefab);
            reel.parent = this.node;
            reel.x = (i-1)* SYMBOL.WIDTH;
            this.reels.push(reel);  
            
        }
    },
    
    spinReels(){
        for (let i = 0; i < this.reels.length; i++){
            this.reels[i].emit("SPINING_REEL", i*1);
        }
    }
});
