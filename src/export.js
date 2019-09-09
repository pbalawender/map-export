import saveAs from 'file-saver';
import { primaryColor, secondaryColor } from './colors';
import { drawMarker } from './marker';

const dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148]
};

export const exportMap = (map, options, callback) => {
    const { format, resolution, margin, title } = options;
    const dim = dims[format];
    const width = Math.round(dim[0] * resolution / 25.4);
    const height = Math.round(dim[1] * resolution / 25.4);
    const size = map.getSize();
    const extent = map.getView().calculateExtent(size);

    map.once('rendercomplete', function(event) {
        const canvas = event.context.canvas;
        // const context = canvas.getContext('2d');
        const newCanvas = document.createElement('canvas');
        const context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;

        context.fillStyle = primaryColor;
        context.fillRect(0, 0, newCanvas.width, newCanvas.height);
        //apply the old canvas to the new one
        context.drawImage(canvas, 0, 0);

        map.getOverlays().forEach((overlay) => {
            const position = overlay.getPosition();
            const pixel = map.getPixelFromCoordinate(position);
            drawMarker(newCanvas, pixel.map((p) => p + 11));
        });

        if (margin) {
            const marginInPixels = Math.round(10 * margin * resolution / 25.4);
            console.log(`Canvas: ${newCanvas.width} x ${newCanvas.height}, Margin: ${marginInPixels}`);
            context.fillStyle = primaryColor;
            context.fillRect(0, 0, marginInPixels, newCanvas.height);
            context.fillRect(0, 0, newCanvas.width, marginInPixels);
            context.fillRect(newCanvas.width - marginInPixels, 0, marginInPixels, newCanvas.height);
            context.fillRect(0, newCanvas.height - marginInPixels, newCanvas.width, marginInPixels);
        }

        if (title) {
            const titleHeight = Math.round(newCanvas.height * 0.1);
            context.fillStyle = primaryColor;
            context.fillRect(0, newCanvas.height - titleHeight, newCanvas.width, titleHeight);
            context.font = `${Math.round(titleHeight / 2)}px 'Prosto One'`;
            context.fillStyle = secondaryColor;
            context.textAlign = "center";
            context.textBaseline="middle";
            context.fillText(title, newCanvas.width / 2, newCanvas.height - Math.round(titleHeight * 0.5));
        }

        newCanvas.toBlob(result => saveAs(result, 'Gdansk.png'));
        map.setSize(size);
        map.getView().fit(extent, {size: size});
        callback();

    });

    // Set print size
    const printSize = [width, height];
    map.setSize(printSize);
    map.getView().fit(extent, {size: printSize});

};
