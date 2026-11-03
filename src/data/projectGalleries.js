// Real Wraptors project photos for the vehicle pages (FocusServicePage).
// Source: singleprojects/ (client-supplied 2026-11-03, confirmed as real
// Wraptors work with the service shown on each page). Converted to WebP at
// 1440px and 720px wide in src/assets/projects/<slug>/NN-<width>.webp.
//
// Only photos that clearly show the same vehicle are used. Captions say
// "Wraptors Project" and do not claim where the work was done, materials,
// finishes or specifications beyond what the photos show.
//
// Vite-only (import.meta.glob): keep this out of serviceSeo.js, which the
// Node prerender script also imports.

const FILES = import.meta.glob('../assets/projects/*/*.webp', { eager: true, import: 'default' });

function photos(slug, alts) {
  return alts.map((alt, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      src: FILES[`../assets/projects/${slug}/${n}-1440.webp`],
      srcSmall: FILES[`../assets/projects/${slug}/${n}-720.webp`],
      alt,
    };
  });
}

export const PROJECT_GALLERIES = {
  'porsche-ppf': {
    title: 'Porsche 911',
    service: 'Paint Protection Film',
    heroPosition: 'center 62%',
    photos: photos('porsche-ppf', [
      'Wraptors Porsche 911 PPF project in dark green with gold wheels, front three-quarter view',
      'Rear arch and gold wheel of the dark green Porsche 911',
      'Front bumper, bonnet and headlight of the dark green Porsche 911',
      'Dark green Porsche 911 from the rear three-quarter',
      'Rear deck and Porsche lettering on the dark green 911',
      'Porsche crest on the bonnet of the dark green 911',
      'Dark green Porsche 911 rear three-quarter, low angle',
    ]),
  },
  'g-class-wrap': {
    title: 'Mercedes G-Class',
    service: 'Vehicle Wrap',
    heroPosition: 'center 60%',
    photos: photos('g-class-wrap', [
      'Wraptors G-Class wrap project, black Mercedes G-Class from the front',
      'Black Mercedes G-Class outside a Wraptors studio',
      'Black Mercedes G-Class side profile',
      'Black Mercedes G-Class side profile with multi-spoke wheels',
      'Carbon spare-wheel cover on the rear of the black G-Class',
      'Black Mercedes G-Class front three-quarter view',
    ]),
  },
  'lamborghini-urus-ppf': {
    title: 'Lamborghini Urus',
    service: 'Paint Protection Film',
    heroPosition: 'center 62%',
    photos: photos('lamborghini-urus-ppf', [
      'Wraptors Lamborghini Urus PPF project in matte black, front three-quarter view',
      'Matte black Lamborghini Urus from the rear three-quarter',
      'Rear arch and wheel of the matte black Lamborghini Urus',
      'Front wheel arch and lower door of the matte black Urus',
    ]),
  },
  'rolls-royce-starlight-headliner': {
    title: 'Rolls-Royce',
    service: 'Starlight Headliner',
    heroPosition: 'center 55%',
    photos: photos('rolls-royce-starlight-headliner', [
      'Fibre-optic starlight headliner in a Rolls-Royce cabin, Wraptors project',
      'White Rolls-Royce from the Wraptors starlight headliner project',
      'Rolls-Royce badge on the white bodywork',
      'Rolls-Royce emblem detail',
    ]),
  },
};
