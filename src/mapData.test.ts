import { describe, expect, it } from 'vitest'
import { getParishCoordinates, getMapHazardsForParish, getFallbackMapSummary } from './mapData'

describe('Map data helpers', () => {
  it('centers the map on the selected parish', () => {
    expect(getParishCoordinates('Kingston')).toEqual({ lat: 17.9712, lng: -76.7936 })
    expect(getParishCoordinates('St. Andrew')).toEqual({ lat: 18.0054, lng: -76.7809 })
  })

  it('includes relevant hazard overlays for a parish', () => {
    const hazards = getMapHazardsForParish('St. Andrew')
    expect(hazards.some((hazard) => hazard.type === 'rainfall')).toBe(true)
    expect(hazards.some((hazard) => hazard.type === 'flood-zone')).toBe(true)
    expect(hazards.some((hazard) => hazard.type === 'wind')).toBe(true)
  })

  it('provides a static summary fallback for data-saver mode', () => {
    expect(getFallbackMapSummary('Portland')).toContain('Portland')
    expect(getFallbackMapSummary('Kingston')).toContain('flood')
  })
})
