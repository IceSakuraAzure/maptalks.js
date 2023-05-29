import Browser from '../../core/Browser';
import { extend } from '../../core/util';
import TileLayer, { TileLayerOptionsType } from './TileLayer';
export type WMSTileLayerOptionsType = TileLayerOptionsType & {
    service?: string;
    request?: string;
    layers?: string;
    styles?: string;
    format?: string;
    transparent?: boolean;
    version?: string;
}

/**
 * @property {Object}              options                     - TileLayer's options
 * @property {String}              [options.service=WMS]       - WMS Service
 * @property {String}              options.layers              - Comma-separated list of WMS layers to show.
 * @property {String}              [options.styles='']         - Comma-separated list of WMS styles.
 * @property {String}              [options.format=image/jpeg] - WMS image format (use `'image/png'` for layers with transparency).
 * @property {String}              [options.transparent=false] - Version of the WMS service to use
 * @property {String}              [options.version=1.1.1]     - size of the tile image
 * @property {String}              [options.crs=null]          - Coordinate Reference System to use for the WMS requests, defaults to map CRS. Don't change this if you're not sure what it means.
 * @property {Boolean}             [options.uppercase=false]   - If `true`, WMS request parameter keys will be uppercase.
 * @property {Boolean}             [options.detectRetina=false]   - If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
 * @memberOf WMSTileLayer
 * @instance
 */
const options = {
    crs: null,
    uppercase: false,
    detectRetina: false
};

const defaultWmsParams = {
    service: 'WMS',
    request: 'GetMap',
    layers: '',
    styles: '',
    format: 'image/jpeg',
    transparent: false,
    version: '1.1.1'
};
let wmsExcludeParams;

/**
 * @classdesc
 * Used to display [WMS]{https://en.wikipedia.org/wiki/Web_Map_Service} services as tile layers on the map. Extends [TileLayer]{@link TileLayer}.
 * Implemented based on Leaflet's TileLayer.WMS.
 * @category layer
 * @extends TileLayer
 * @param {String|Number} id - tile layer's id
 * @param {Object} [options=null] - options defined in [WMSTileLayer]{@link TileLayer#options}
 * @example
 * var layer = new maptalks.WMSTileLayer('wms', {
 *     'urlTemplate' : 'https://demo.boundlessgeo.com/geoserver/ows',
 *     'crs' : 'EPSG:3857',
 *     'layers' : 'ne:ne',
 *     'styles' : '',
 *     'version' : '1.3.0',
 *     'format': 'image/png',
 *     'transparent' : true,
 *     'uppercase' : true
 * });
 */
class WMSTileLayer extends TileLayer {
    wmsParams: object;
    _wmsVersion: number;

    constructor(id, options: WMSTileLayerOptionsType) {
        super(id);
        if (!wmsExcludeParams) {
            wmsExcludeParams = extend({}, this.options);
        }
        this.wmsParams = extend({}, defaultWmsParams);
        this.setOptions(options);
        //@ts-ignore
        this.setZIndex(options.zIndex);
        if (!Browser.proxy) {
            this._optionsHook(options);
        }
    }

    //in Hook,Reset wmsParams
    _optionsHook(options = {}) {
        for (const p in options) {
            //clear tilesize cache
            if (p === 'tileSize') {
                //@ts-ignore
                this._tileSize = null;
            }
            if (!(p in wmsExcludeParams)) {
                this.wmsParams[p] = options[p];
            }
        }
        const tileSize = this.getTileSize();
        //@ts-ignore
        this.wmsParams.width = tileSize.width;
        //@ts-ignore
        this.wmsParams.height = tileSize.height;
        //@ts-ignore
        this._wmsVersion = parseFloat(this.wmsParams.version);
        return this;
    }

    onAdd() {
        const dpr = this.getMap().getDevicePixelRatio();
        const r = options.detectRetina ? dpr : 1;
        //@ts-ignore
        this.wmsParams.width *= r;
        //@ts-ignore
        this.wmsParams.height *= r;
        //@ts-ignore
        const crs = this.options.crs || this.getMap().getProjection().code;
        const projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
        this.wmsParams[projectionKey] = crs;
        super.onAdd();
    }

    getTileUrl(x, y, z) {
        const res = this.getSpatialReference().getResolution(z),
            tileConfig = this._getTileConfig(),
            tileExtent = tileConfig.getTilePrjExtent(x, y, res);
        const max = tileExtent.getMax(),
            min = tileExtent.getMin();
        //@ts-ignore
        const bbox = (this._wmsVersion >= 1.3 && (this.wmsParams.crs === 'EPSG:4326' || this.wmsParams.crs === 'EPSG:4490') ?
            [min.y, min.x, max.y, max.x] :
            [min.x, min.y, max.x, max.y]).join(',');

        const url = super.getTileUrl(x, y, z);

        return url +
            //@ts-ignore
            getParamString(this.wmsParams, url, this.options.uppercase) +
            //@ts-ignore
            (this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
    }

    /**
     * Export the WMSTileLayer's json. <br>
     * It can be used to reproduce the instance by [fromJSON]{@link Layer#fromJSON} method
     * @return {Object} layer's JSON
     */
    toJSON() {
        return {
            'type': 'WMSTileLayer',
            'id': this.getId(),
            //@ts-ignore
            'options': this.config()
        };
    }

    /**
     * Reproduce a WMSTileLayer from layer's JSON.
     * @param  {Object} layerJSON - layer's JSON
     * @return {WMSTileLayer}
     * @static
     * @private
     * @function
     */
    static fromJSON(layerJSON) {
        if (!layerJSON || layerJSON['type'] !== 'WMSTileLayer') {
            return null;
        }
        return new WMSTileLayer(layerJSON['id'], layerJSON['options']);
    }
}

WMSTileLayer.registerJSONType('WMSTileLayer');

WMSTileLayer.mergeOptions(options);

export default WMSTileLayer;

// From Leaflet
// Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
// be appended at the end. If `uppercase` is `true`, the parameter names will
// be uppercased (e.g. `'?A=foo&B=bar'`)
export function getParamString(obj, existingUrl, uppercase) {
    const params = [];
    for (const i in obj) {
        //@ts-ignore
        params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
    }
    return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
}
