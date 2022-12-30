
const SYMBOL = {
    WIDTH: 195,
    HEIGHT: 270
}

const SLOTS_PER_REEL = 5;
const ALPHA = Math.PI/SLOTS_PER_REEL;
const REEL_RADIUS = Math.round(SYMBOL.HEIGHT/(2*Math.tan(ALPHA/2)));

cc.Class({
    extends: cc.Component,

    properties: {
        symbol: cc.Prefab,
        showSymbols: 3,
        symbolHolder: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.symbolList = [];
        this.node.on("SPINING_REEL", this.spiningReel, this);
        this.initReel();
        this.currentIndex = 0;
    },

    // start () {

    // },

    // update (dt) {},
    initReel(){
        for(let i=0; i < SLOTS_PER_REEL; i++){
            let symbol = cc.instantiate(this.symbol);
            symbol.parent = this.symbolHolder;
            this.calculatePositionSymbol(symbol,i);
            this.symbolList.unshift(symbol);
        }
    },

    calculatePositionSymbol(symbol,index){
        const angle = Math.round(((index+3) * ALPHA - Math.PI) * 180 / Math.PI);
        symbol.y = Math.round(REEL_RADIUS * Math.sin((2-index) * ALPHA));
        symbol.z = Math.round(REEL_RADIUS * Math.cos((2-index) * ALPHA));
        symbol.eulerAngles = cc.v3(angle, 0, 0);
        // cc.log(symbol.y, symbol.z, symbol.eulerAngles.x);
    },

    spiningReel(timeDelay){
        cc.tween(this.symbolHolder)
        .delay(timeDelay)
        .repeat(10,
            cc.tween().by(0.5,{eulerAngles: cc.v3(ALPHA * 180  / Math.PI, 0, 0)})
                    .call(()=>{
                        this.circulateLastSymbol();
                    })
            )
            .start()
    },

    circulateLastSymbol(){
        const index = this.currentIndex % (this.symbolList.length);
        const lastSymbol = this.symbolList[index];
        this.calculatePositionSymbol(lastSymbol, 9- (this.currentIndex % 10));
        this.currentIndex++;
    }
});
