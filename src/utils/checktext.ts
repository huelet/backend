import * as dotenv from "dotenv";
import unorm from "unorm";
import removeAccents from "remove-accents";
import latinize from "latinize";
import unidecode from "unidecode";
import axios from "axios";
import words from "profane-words";

dotenv.config();
const normalizer = unorm.nfkc;

const sanitizeString = async (str: string) => {
  // this is a mess stolen from @aero/sanitizer
  const cleanedString = unidecode(
    normalizer(latinize(removeAccents(str)))
  ).replace(/\[\?\]/g, "");
  return cleanedString;
};

const cleanString = async (str: string) => {
  if (words.includes(str.toLowerCase())) {
    return false;
  } else {
    return true;
  }
};

const checkString = async (str: string) => {
    const resp = await axios.post("https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?PII=true&classify=true&language=eng", {
        headers: {
            "Ocp-Apim-Subscription-Key": process.env.AZURE_CONTENTMOD_KEY
        },
        body: str
    });
}

export { sanitizeString, cleanString, checkString };
