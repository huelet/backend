import signup from "./signup";
import login from "./login";
import verifyAuth from "./authVerify";
import badge from "./badge";
import { setPrivacy, getPrivacy } from "./settings/privacy";
import { setPfp, uploadPfp, getPfp } from "./settings/avatar";
import { setBio, getBio } from "./settings/bio";
import { setLocation, getLocation } from "./settings/location";
import { setPronouns, getPronouns } from "./settings/pronouns";
import userLookup from "./user";

export {
  signup,
  login,
  verifyAuth,
  badge,
  userLookup,
  setPrivacy,
  getPrivacy,
  setBio,
  getBio,
  getPfp,
  uploadPfp,
  setPfp,
  setPronouns,
  getPronouns,
  setLocation,
  getLocation
};
