import { markerColor, primaryColor } from './colors';

export const drawMarker = (canvas, position) => {
    const context = canvas.getContext('2d');
    const x = position[0];
    const y = position[1];
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = markerColor;
    context.fill();

    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = primaryColor;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = markerColor;
    context.stroke();
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI, false);
    context.fillStyle = markerColor;
    context.fill();
};
