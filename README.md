# Vortex-Extension-Update---Coral-Island
# Auther: XiyakaHex

To add this extension for Vortex add it to your %AppData%\Roaming\Vortex\plugins folder
Then restart computer and open Vortex should start searching for Coral Island

Currently any troubleshooting is minimal as this is my first time really messing 
with code so bare with me and I'll update when I can

If any pathing issues open index.js in notepad or your perfered code editor and change the 
pathing in querymodpath and requiredfiles to where the mods are stored for querymodpath and the games shipping.exe file
stored on your computer example from file below:


line:27       queryModPath: () => './SteamLibrary/steamapps/common/Coral Island/ProjectCoral/Content/Paks/~mods',
line:32       './SteamLibrary/steamapps/common/Coral Island/ProjectCoral/Binaries/Win64/ProjectCoral-Wind64-Shipping.exe',

