export type ParishCoords = {
  lat: number
  lng: number
}

export type HazardOverlay = {
  id: string
  type: 'rainfall' | 'radar' | 'lightning' | 'wind' | 'hurricane' | 'flood-zone' | 'earthquake'
  label: string
  level: 'low' | 'moderate' | 'high' | 'critical'
  value: number
  center: { lat: number; lng: number }
  radiusKm: number
}

const parishCoordinates: Record<string, ParishCoords> = {
  Kingston: { lat: 17.9712, lng: -76.7936 },
  'St. Andrew': { lat: 18.0054, lng: -76.7809 },
  'St. Catherine': { lat: 17.9537, lng: -76.9556 },
  Clarendon: { lat: 17.8821, lng: -77.2368 },
  Manchester: { lat: 17.9757, lng: -77.507 },
  'St. Elizabeth': { lat: 17.9149, lng: -77.6867 },
  Westmoreland: { lat: 18.1975, lng: -78.1514 },
  Hanover: { lat: 18.4167, lng: -78.1488 },
  'St. James': { lat: 18.4496, lng: -77.9137 },
  Trelawny: { lat: 18.3154, lng: -77.6568 },
  'St. Ann': { lat: 18.1953, lng: -77.1773 },
  'St. Mary': { lat: 18.2856, lng: -76.9438 },
  Portland: { lat: 18.1462, lng: -76.5 },
  'St. Thomas': { lat: 17.8821, lng: -76.3637 },
}

const parishHazards: Record<string, HazardOverlay[]> = {
  Kingston: [
    { id: 'kingston-rain', type: 'rainfall', label: 'Rainfall', level: 'moderate', value: 42, center: { lat: 17.972, lng: -76.79 }, radiusKm: 18 },
    { id: 'kingston-flood', type: 'flood-zone', label: 'Flood zone', level: 'high', value: 68, center: { lat: 17.99, lng: -76.81 }, radiusKm: 14 },
    { id: 'kingston-wind', type: 'wind', label: 'Wind gusts', level: 'moderate', value: 38, center: { lat: 17.965, lng: -76.775 }, radiusKm: 16 },
  ],
  'St. Andrew': [
    { id: 'andrew-rain', type: 'rainfall', label: 'Rainfall', level: 'high', value: 58, center: { lat: 18.01, lng: -76.79 }, radiusKm: 20 },
    { id: 'andrew-flood', type: 'flood-zone', label: 'Flood zone', level: 'critical', value: 82, center: { lat: 17.995, lng: -76.81 }, radiusKm: 16 },
    { id: 'andrew-wind', type: 'wind', label: 'Wind gusts', level: 'moderate', value: 35, center: { lat: 18.035, lng: -76.78 }, radiusKm: 17 },
    { id: 'andrew-lightning', type: 'lightning', label: 'Lightning', level: 'moderate', value: 26, center: { lat: 18.03, lng: -76.74 }, radiusKm: 12 },
  ],
  'St. Catherine': [
    { id: 'catherine-rain', type: 'rainfall', label: 'Rainfall', level: 'moderate', value: 33, center: { lat: 17.97, lng: -76.96 }, radiusKm: 21 },
    { id: 'catherine-flood', type: 'flood-zone', label: 'Flood zone', level: 'moderate', value: 54, center: { lat: 17.95, lng: -77.02 }, radiusKm: 19 },
    { id: 'catherine-wind', type: 'wind', label: 'Wind gusts', level: 'low', value: 22, center: { lat: 17.94, lng: -76.91 }, radiusKm: 15 },
  ],
  Clarendon: [
    { id: 'clarendon-rain', type: 'rainfall', label: 'Rainfall', level: 'moderate', value: 48, center: { lat: 17.9, lng: -77.25 }, radiusKm: 24 },
    { id: 'clarendon-flood', type: 'flood-zone', label: 'Flood zone', level: 'high', value: 70, center: { lat: 17.89, lng: -77.3 }, radiusKm: 16 },
    { id: 'clarendon-wind', type: 'wind', label: 'Wind gusts', level: 'moderate', value: 36, center: { lat: 17.93, lng: -77.2 }, radiusKm: 18 },
  ],
  Portland: [
    { id: 'portland-rain', type: 'rainfall', label: 'Rainfall', level: 'high', value: 60, center: { lat: 18.14, lng: -76.5 }, radiusKm: 24 },
    { id: 'portland-flood', type: 'flood-zone', label: 'Flood zone', level: 'high', value: 72, center: { lat: 18.16, lng: -76.46 }, radiusKm: 18 },
    { id: 'portland-lightning', type: 'lightning', label: 'Lightning', level: 'high', value: 49, center: { lat: 18.11, lng: -76.54 }, radiusKm: 17 },
  ],
  default: [
    { id: 'jamaica-rain', type: 'rainfall', label: 'Rainfall', level: 'moderate', value: 40, center: { lat: 18.1, lng: -77.3 }, radiusKm: 36 },
    { id: 'jamaica-wind', type: 'wind', label: 'Wind gusts', level: 'moderate', value: 34, center: { lat: 18.1, lng: -77.3 }, radiusKm: 40 },
    { id: 'jamaica-flood', type: 'flood-zone', label: 'Flood zone', level: 'high', value: 62, center: { lat: 18.1, lng: -77.1 }, radiusKm: 30 },
  ],
}

export function getParishCoordinates(parish: string): ParishCoords {
  return parishCoordinates[parish] ?? parishCoordinates['St. Catherine']
}

export function getMapHazardsForParish(parish: string): HazardOverlay[] {
  return parishHazards[parish] ?? parishHazards.default
}

export function getFallbackMapSummary(parish: string): string {
  const coords = getParishCoordinates(parish)
  const hazardSummary = getMapHazardsForParish(parish)
  const peakHazard = hazardSummary.reduce((top, hazard) => hazard.value > top.value ? hazard : top, hazardSummary[0])

  return `${parish} map summary: ${peakHazard.label.toLowerCase()} risk is ${peakHazard.level} near ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}; local conditions remain watchful with flood risk across the area.`
}
