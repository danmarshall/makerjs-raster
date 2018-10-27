///<reference path="node_modules/makerjs/dist/index.d.ts" />

const makerjs = require('makerjs');

class Raster implements MakerJs.IModel {
    public origin: MakerJs.IPoint;
    public paths: MakerJs.IPathMap;

    constructor(modelToRasterize: MakerJs.IModel, margin: number, offset = 0) {
        const measurement = makerjs.measure.modelExtents(modelToRasterize);
        const line = new makerjs.paths.Line([-1, 0], [measurement.width + 1, 0]);
        const count = measurement.height / margin + 1;
        const lines = makerjs.layout.cloneToColumn(line, count, margin);
        this.paths = lines.paths;
        this.origin = measurement.low;
        if (offset) {
            makerjs.model.moveRelative(this, [0, offset]);
        }
        const clone = makerjs.cloneObject(modelToRasterize);
        makerjs.model.combine(clone, this, true, true, true, false);
    }
}

module.exports = Raster;
