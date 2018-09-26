import { Fill, Stroke, Style } from 'ol/style';
import { forestColor, primaryColor, secondaryColor, waterColor } from './colors';

const pattern = (function() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pixelRatio = 1;
    canvas.width = 6 * pixelRatio;
    canvas.height = 6 * pixelRatio;
    context.fillStyle = primaryColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = forestColor;
    context.fillRect(0, 0, canvas.width / 2, canvas.height);

    return context.createPattern(canvas, 'repeat');
}());

const roadStyleCache = {
    'highway': new Style({
        stroke: new Stroke({
            color: secondaryColor,
            width: 3
        }),
        zIndex: 204
    }),
    'major_road': new Style({
        stroke: new Stroke({
            color: secondaryColor,
            width: 3
        }),
        zIndex: 203
    }),
    'minor_road': new Style({
        stroke: new Stroke({
            color: secondaryColor,
            width: 1.5
        }),
        zIndex: 202
    }),
    'rail': new Style({
        stroke: new Stroke({
            color: secondaryColor,
            width: 1.5,
            lineDash: [8, 6],
            lineCap: 'square'
        }),
        zIndex: 201
    }),
    'path2': new Style({
        stroke: new Stroke({
            color: primaryColor,
            width: 1.5
        }),
        zIndex: 200
    }),

};

export const waterStyle = new Style({
    fill: new Fill({
        color: waterColor
    })
});
export const landuseStyle = function(feature) {
    var kind = feature.get('kind');
    if (kind === 'forest') {

        var fill = new Fill();
        fill.setColor(pattern);

        return new Style({
            fill: fill
        });
    }
    return null;
};
export const roadStyle = function(feature) {
    var kind = feature.get('kind');
    var sort_key = feature.get('sort_rank');
    var styleKey = kind;// + '/' + railway + '/' + sort_key;

    return roadStyleCache[styleKey]? roadStyleCache[styleKey]: null;
};
