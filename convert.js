const path = require('path');
const { ImageGenerator } = require('@nplayfair/npe_gerber');

// npe_gerber config
const folderConfig = {
  tmpDir: process.env.TEMP_DIR || path.join(__dirname, 'tmp'),
  imgDir: process.env.IMG_DIR || path.join(__dirname, 'tmp'),
};
const imgConfig = {
  resizeWidth: 600,
  density: 1000,
  compLevel: 1,
};
const layerNames = [
  'CAMOutputs/DrillFiles/drills.xln',
  'CAMOutputs/GerberFiles/copper_top.gbr',
  'CAMOutputs/GerberFiles/silkscreen_top.gbr',
  'CAMOutputs/GerberFiles/soldermask_top.gbr',
  'CAMOutputs/GerberFiles/solderpaste_top.gbr',
  'CAMOutputs/GerberFiles/profile.gbr',
];

const fileProc = new ImageGenerator(folderConfig, imgConfig, layerNames);

module.exports = fileProc;
