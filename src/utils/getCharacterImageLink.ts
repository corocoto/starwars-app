import { CHARACTER_ASSETS_LINK } from 'src/constants/links';

type CharacterId = string;

const getCharacterImageLink = (id: CharacterId) => {
  return `${CHARACTER_ASSETS_LINK}${id}.jpg`;
};

export default getCharacterImageLink;
