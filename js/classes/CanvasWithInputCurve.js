import { drawCurveInCanvasByPoints } from '../utils/drawCurveInCanvasByPoints.js';

export class CanvasWithInputCurve {
    constructor () {
        this.canvas = document.querySelector('canvas');
        this.vertKoeffFromCss = 0.97;
        this.innnerHeight = window.innerHeight * this.vertKoeffFromCss;
        this.innnerWidth = window.innerWidth;
        this.ctx = this.canvas.getContext("2d");

        this.init()
    }

    init () {
        this.canvas.height = this.innnerHeight;
        this.canvas.width = this.innnerWidth;
        this.ctx.strokeStyle = '#638EC4';
        this.ctx.lineWidth = this.innnerHeight / 50;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    drawCurve  = pointsArray => {
        drawCurveInCanvasByPoints(this.ctx, pointsArray);
    };

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.innnerWidth, this.innnerHeight)
    };
};
