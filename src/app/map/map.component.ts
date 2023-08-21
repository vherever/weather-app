import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import * as olProj from 'ol/proj';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { LonLatModel } from './lon-lat.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @Input() set latLon(data: LonLatModel) {
    this.lonLat = data;
  }

  public lonLat: LonLatModel;
  public map: Map;

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.createMarkers(),
      ],
      view: new View({
        center: olProj.fromLonLat([this.lonLat.lon, this.lonLat.lat]),
        zoom: 10
      })
    });
  }

  private createMarkers() {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([this.lonLat.lon, this.lonLat.lat])),
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        scale: 0.25,
        src: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    return vectorLayer;
  }
}
