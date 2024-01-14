const getUrlId = (url: string) => {
  return url.split('/').at(-2) as string;
};

export default getUrlId;
