var dsector;
(function (dsector) {
    class IntersectingDSecObject {
        constructor(distance, type, playerTank, missile, jewel) {
            if (this.distance === undefined) {
                this.distance = 0;
            }
            if (this.type === undefined) {
                this.type = 0;
            }
            if (this.playerOwningIntersectingTank === undefined) {
                this.playerOwningIntersectingTank = null;
            }
            if (this.intersectingMissile === undefined) {
                this.intersectingMissile = null;
            }
            if (this.jewel === undefined) {
                this.jewel = null;
            }
            this.distance = distance;
            this.type = type;
            this.playerOwningIntersectingTank = playerTank;
            this.intersectingMissile = missile;
            this.jewel = jewel;
        }
    }
    dsector.IntersectingDSecObject = IntersectingDSecObject;
    IntersectingDSecObject["__class"] = "dsector.IntersectingDSecObject";
})(dsector || (dsector = {}));
