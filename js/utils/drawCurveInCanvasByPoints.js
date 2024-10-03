export const drawCurveInCanvasByPoints = (ctx, pointsArray) => {
    ctx.beginPath();
    drawLines(ctx, getCurvePoints(pointsArray));
    ctx.stroke();
};


const getCurvePoints = pointsArr => {
    // settings of curve
    const tension = 0.5;
    const numOfSegments = 16;

    const result = [];

    const points = pointsArr.slice(0);
    points.unshift(pointsArr[1]);
    points.unshift(pointsArr[0]);
    points.push(pointsArr[pointsArr.length - 2]);
    points.push(pointsArr[pointsArr.length - 1]);


    for ( let i=2; i < (points.length - 4); i+=2 ) {
        for ( let t=0; t <= numOfSegments; t++ ) {

            // calculating tension vectors
            const t1x = (points[i+2] - points[i-2]) * tension;
            const t2x = (points[i+4] - points[i]) * tension;
            const t1y = (points[i+3] - points[i-1]) * tension;
            const t2y = (points[i+5] - points[i+1]) * tension;

            // calculating step
            const step = t / numOfSegments;

            // calculating cardinals
            const c1 = 2 * Math.pow(step, 3) - 3 * Math.pow(step, 2) + 1;
            const c2 = -(2 * Math.pow(step, 3)) + 3 * Math.pow(step, 2);
            const c3 = Math.pow(step, 3) - 2 * Math.pow(step, 2) + step;
            const c4 = Math.pow(step, 3) - Math.pow(step, 2);

            // calc x and y cords with common control vectors
            const x = c1 * points[i]    + c2 * points[i+2] + c3 * t1x + c4 * t2x;
            const y = c1 * points[i+1]  + c2 * points[i+3] + c3 * t1y + c4 * t2y;

            //store points in array
            result.push(x);
            result.push(y);
        }
    }

    return result;
};


const drawLines =(ctx, pointsArray) => {
    ctx.moveTo(pointsArray[0], pointsArray[1]);
    for(let i = 2; i < pointsArray.length - 1; i += 2) ctx.lineTo(pointsArray[i], pointsArray[i+1]);
};
