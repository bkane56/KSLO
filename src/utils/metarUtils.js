function calculatePressureAltitude(baro, elevation) {
  return Math.round(((29.92 - baro) * 1000 + elevation));
}

export function calculateDensityAltitude(metarData) {
  const baro = metarData.barometer.hg;
  const elevation = metarData.elevation.feet;
  const outsideTemp = metarData.temperature.celsius;
  const pressAlt = calculatePressureAltitude(baro, elevation);
  const isaTemp = -((elevation/500) -15);

  return Math.round(pressAlt + (120 * (outsideTemp - isaTemp)));


}
