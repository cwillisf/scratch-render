// table for exact sine values in degrees [0,360]
const sineTable = [];

/**
 * Math functions that operate on degrees instead of radians, with exact results for certain angles.
 */
class ScratchMath {
    static cos (degrees) {
        return this.sin(90 - degrees);
    }

    static sin (degrees) {
        // always-positive version of `degrees % 360`
        degrees = ((degrees % 360) + 360) % 360;

        const indexSin = degrees | 0; // truncate to integer [0,359]
        const frac = degrees - indexSin; // get fractional part [0,1)

        const indexCos = (360 + 90 - indexSin) % 360;

        // Note that sin(x + d) = sin(x) * cos(d) + cos(x) * sin(d)
        // And for small d:
        //   sin(d) ~= d
        //   cos(d) ~= 1 - d*d/2
        // So for small d:
        //   sin(x+d) ~= sin(x) * (1 - d*d/2) + cos(x) * d

        const sinX = sineTable[indexSin];
        const cosX = sineTable[indexCos];

        // small angle approximations are more accurate in radians where values are smaller
        const fracRad = frac * Math.PI / 180;
        const sinD = fracRad;
        const cosD = 1 - (0.5 * fracRad * fracRad);

        const result = (sinX * cosD) + (cosX * sinD);
        return result;
    }

    static degreesToRadians (degrees) {
        return degrees * Math.PI / 180;
    }

    static radiansToDegrees (radians) {
        return radians * 180 / Math.PI;
    }

    static _init () {
        for (let degrees = 0; degrees <= 360; ++degrees) {
            const radians = this.degreesToRadians(degrees);
            sineTable[degrees] = Math.sin(radians);
        }

        const sqrt2over2 = Math.SQRT2 / 2;
        const sqrt3over2 = Math.sqrt(3) / 2;

        // Fill in exact values where we can
        sineTable[0] = 0;
        sineTable[30] = 0.5;
        sineTable[45] = sqrt2over2;
        sineTable[60] = sqrt3over2;
        sineTable[90] = 1;
        sineTable[120] = sqrt3over2;
        sineTable[135] = sqrt2over2;
        sineTable[150] = 0.5;
        sineTable[180] = 0;
        sineTable[210] = -0.5;
        sineTable[225] = -sqrt2over2;
        sineTable[240] = -sqrt3over2;
        sineTable[270] = -1;
        sineTable[300] = -sqrt3over2;
        sineTable[315] = -sqrt2over2;
        sineTable[330] = -0.5;
    }
}

ScratchMath._init();

module.exports = ScratchMath;
