import './index.css';
import 'ol/ol.css';

import { Map, View } from 'ol';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import { landuseStyle, roadStyle, waterStyle } from './styles';
import { exportMap } from './export';
import { primaryColor } from './colors';


document.getElementById('map').style.backgroundColor = primaryColor;

const key = process.env.NEXTZEN_API_KEY;

const vectorLayer = new VectorTileLayer({
    source: new VectorTileSource({
        attributions: '&copy; OpenStreetMap',
        format: new MVT({
            layerName: 'layer',
            layers: ['water', 'roads', 'landuse']
        }),
        maxZoom: 16,
        url: 'https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt?api_key=' + key
    }),
    style: (feature) => {
        switch (feature.get('layer')) {
            case 'water': return waterStyle;
            case 'roads': return roadStyle(feature);
            case 'landuse': return landuseStyle(feature);
            default: return null;
        }
    }
});


const map = new Map({
    target: 'map',
    layers: [
        vectorLayer
    ],
    view: new View({
        center: [2077558, 7235987],
        zoom: 13
    })
});

const exportButton = document.getElementById('export');

exportButton.addEventListener('click', () => {
    exportButton.disabled = true;
    document.body.style.cursor = 'progress';
    const format = document.getElementById('format').value;
    const resolution = document.getElementById('resolution').value;
    exportMap(map, {format, resolution}, () => {
        exportButton.disabled = false;
        document.body.style.cursor = 'auto';
    });

}, false);
