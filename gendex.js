const {Dex} = require('@pkmn/dex')
const {writeFileSync} = require('fs')
const fixName = (name) => {
  if (name.includes('Alola')) {
    return 'Alolan ' + name.split('-')[0]
  }
  if (name.includes('Galar')) {
    return 'Galarian ' + name.split('-')[0]
  }
  if (name.includes('Paldea')) {
    if (name.startsWith('Tauros')) {
      return 'Paldean Tauros (' + name.split('-')[2] + ')'
    }
    return 'Paldean Wooper'
  }
  if (name.startsWith('Castform-')) {
    return name.split('-')[1] + ' Castform'
  }
  if (name.startsWith('Wormadam')) {
    if (name === 'Wormadam') {
      return 'Wormadam Plant Cloak'
    }
    return 'Wormadam ' + name.split('-')[1] + ' Cloak'
  }
  if (name.startsWith('Lycanroc')) {
    return 'Lycanroc'
  }
  if (name.startsWith('Vivillon')) {
    return 'Vivillon'
  }
  if (name.startsWith('Wishiwashi')) {
    return 'Wishiwashi'
  }
  if (name.startsWith('Maushold')) {
    return 'Maushold'
  }
  if (name.startsWith('Dudunsparce')) {
    return 'Dudunsparce'
  }
  if (name.startsWith('Squawkabilly')) {
    if (name === 'Squawkabilly') {
      return 'Squawkabilly Green Plumage'
    }
    return 'Squawkabilly ' + name.split('-')[1] + ' Plumage'
  }
  if (name.endsWith('-F')) {
    return name.split('-')[0] + ' ♀'
  }
  if (name.endsWith('-M')) {
    return name.split('-')[0] + ' ♂'
  }
  if (name.startsWith('Toxtricity')) {
    if (name === 'Toxtricity') {
      return 'Toxtricity Amped'
    }
    return 'Toxtricity Low Key'
  }
  return name
}
const table = {}
Dex.species
  .all()
  .map(function (mon) {
    if (mon.isNonstandard === "LGPE" ||
        mon.isNonstandard === "Custom" ||
        mon.isNonstandard === "CAP" ||
        mon.forme.startsWith('Mega') ||
        mon.forme.includes('Gmax') ||
        mon.tags.includes('Mythical') ||
        mon.tags.includes('Restricted Legendary') ||
        mon.tags.includes('Legendary') ||
        mon.tags.includes('Sub-Legendary') ||
        mon.tags.includes('Paradox') ||
        mon.forme.includes('Spiky') ||
        mon.forme.includes('Sunshine') ||
        mon.name.startsWith('Rotom-') ||
        mon.forme.includes('Zen') ||
        mon.forme === 'Ash' ||
        mon.forme.includes('Fancy') ||
        mon.forme.includes('Eternal') ||
        mon.forme === 'Blade' ||
        mon.name.startsWith('Pumpkaboo-') ||
        mon.name.startsWith('Gourgeist-') ||
        mon.name.startsWith('Oricorio') ||
        mon.name.startsWith('Lycanroc-') ||
        mon.forme === 'Meteor' ||
        mon.forme === 'Busted' ||
        mon.name.startsWith('Cramorant-') ||
        mon.forme === 'Antique' ||
        mon.forme === 'Noice' ||
        mon.forme === 'Hangry' ||
        mon.forme === 'Hero' ||
        mon.forme === 'Three-Segment'
    ) {
      return
    }
    const name = fixName(mon.name)
    table[name] = {
      name,
      types: {}
    };
    for (const type of mon.types) {
      table[name].types[type] = type
    }
    if (Object.keys(mon.evos).length > 0) {
      table[name].evos = {}
      for (const evo of mon.evos) {
        const key = fixName(evo)
        table[name].evos[key] = key
      }
    }
    if (mon.prevo) {
      table[name].prevo = fixName(mon.prevo)
    }
    if (mon.gender) {
      table[name].gender = mon.gender
    }
    else if (mon.genderRatio) {
      if (mon.genderRatio.M !== 0.5) {
        table[name].genderRatio = mon.genderRatio
      }
    }
  });
writeFileSync("dex.json", JSON.stringify(table));