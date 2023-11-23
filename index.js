//Import assets from Vortex
const path = require('path');
const { fs, log, util } = require('vortex-api');

//Nexus Mods domain for the game tdlr use what ever the game is named in Vortex
const GAME_ID = 'coralisland';

//Game id from the store it came from for CI is steam
const STEAMAPP_ID = '1158160';

//GOG APP ID find at gogdb.org as of 11/23/2023 coral island does not have a gogdb id 
// set reminder to check in a month!!

//telling vortex what format to look for for the installer
const MOD_FILE_EXT = ".pak";


function mainModule(context) {
//Main function that vortex will run when game extension is detected

    context.registerGame({
        id: GAME_ID,
        name: 'Coral Island',
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        queryModPath: () => 'I:\SteamLibrary\steamapps\common\Coral Island\ProjectCoral\Content\Paks\~mods',
        logo: 'CoralIsland.jpeg',
        executable: () => 'ProjectCoral.exe',
        requiredFiles: [
            'ProjectCoral.exe',
            'I:\SteamLibrary\steamapps\common\Coral Island\ProjectCoral\Binaries\Win64\ProjectCoral-Wind64-Shipping.exe',
        ],
        setup: prepareForModding,
        environment: {
            SteamAPPID: STEAMAPP_ID,
        },
        details: {
            steamAppId: STEAMAPP_ID,
        },
    });

    context.registerInstaller('projectcoral-mod', 25, testSupportedContent, InstallContent);

    return true;
}

function findGame() {
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID])
      .then(game => game.gamePath);
}

function prepareForModding(discovery) {
    return fs.ensureDirWrittableAsync(path.join(discovery.path, 'ProjectCoral', 'Content', 'Paks', '~mods'));
}

function testSupportedContent(files, gameId) {
    //Makes sure the mod is supported
    let supported = (gameId === GAME_ID) &&
        (files.find(file => path.extname(file).toLowerCase() === MOD_FILE_EXT)!== undefined);

    return Promise.resolve({
        supported,
        requiredFiles: [],
    });
}

function installContent(files) {
    // The .pak file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
    const modFile = files.find(file => path.extname(file).toLowerCase() === MOD_FILE_EXT);
    const idx = modFile.indexOf(path.basename(modFile));
    const rootPath = path.dirname(modFile);

    // Remove directories and anything that isn't in the rootPath.
    const filtered = files.filter(file =>
      ((file.indexOf(rootPath) !== -1)
      && (!file.endsWith(path.sep))));

    const instructions = filtered.map(file => {
      return {
        type: 'copy',
        source: file,
        destination: path.join(file.substr(idx)),
      };
    });

    return Promise.resolve({ instructions });
  }

module.exports = {
    default: main,
};