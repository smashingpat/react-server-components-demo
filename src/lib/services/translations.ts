const TRANSLATIONS = {
  // INCREDIBLE BIG TRANSLATION OBJECT
  TITLE: "Awesome blog",
  POSTS_TITLE: "Posts",
  COMMENTS_TITLE: "Comments",
};

function translate(code: keyof typeof TRANSLATIONS) {
  return TRANSLATIONS[code];
}

export { translate, translate as t };
