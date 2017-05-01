
import { SvgTransformGroupDirective } from "../directives/svg-transform-group.directive";

const ZOOM_FACTOR = 0.05;

export class SvgTransformData {
    public tx: number = 0;
    public ty: number = 0;
    public sc: number = 1.0;
}

export class SvgPoint {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}

export class SvgTransformer {
    private transform: SvgTransformData = new SvgTransformData();

    constructor(
        private svgElement: SVGSVGElement,
        private svgTransformGroup: SvgTransformGroupDirective) {
    }

    public zoomIn(event: Event) {
        const scale = this.transform.sc * (1 + ZOOM_FACTOR);
        const pt = this.getSVGPoint(event);
        this.zoom(pt, scale);
    }

    public zoomOut(event: Event) {
        const scale = this.transform.sc * (1 - ZOOM_FACTOR);
        const pt = this.getSVGPoint(event);
        this.zoom(pt, scale);
    }

    public getSVGPoint(event: any): SvgPoint {
        const svg = this.svgElement;
        let pt = svg.createSVGPoint();

        pt.x = event.clientX;
        pt.y = event.clientY;
        pt = pt.matrixTransform(svg.getScreenCTM().inverse());

        // return pt as "un-transformed" data
        return new SvgPoint(
            (pt.x - this.transform.tx) / this.transform.sc,
            (pt.y - this.transform.ty) / this.transform.sc
        );
    }

    private zoom(pt: SvgPoint, scale: number) {
        const deltaScale = scale - this.transform.sc;
        this.transform.sc = scale;
        this.transform.tx -= deltaScale * pt.x;
        this.transform.ty -= deltaScale * pt.y;
        this.svgTransformGroup.updateTransform(this.transform);
    }
}
