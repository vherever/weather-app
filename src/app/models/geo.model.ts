export interface GeoModel {
  city: string;
  country: string;
  country_name: string;
  loc: number[]; // [lon, lat]
  city_image_url?: string;
}
