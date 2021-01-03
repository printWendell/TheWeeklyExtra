export function cookieStrToObj(str) {
  var obj = {};
  if (str && typeof str === 'string') {
    var objStr = str.match(/\{(.)+\}/g);
    eval('obj =' + objStr);
  }
  return obj;
}

// check if article is saved
export const check = async (title) => {
  const res = await fetch('/api/articles/');
  const data = await res.json();
  return data.some(function (article) {
    return article.title === title;
  });
};

// get user saved articles api call
export const getSavedArticles = async () => {
  const res = await fetch('/api/articles/');
  return await res.json();
};

// save article api call
export const saveUserArticle = async (email, article, savedArticleTime) => {
  try {
    return fetch('/api/articles/save', {
      method: 'POST',
      body: JSON.stringify({
        email,
        author: article.author,
        title: article.title,
        description: article.description,
        published_at: savedArticleTime,
        link_url: article.url,
        img_url: article.urlToImage,
        source: article.source.name,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  } catch (err) {
    return console.log(err);
  }
};

// delete article api call
export const deleteSavedArticles = async (email, articleLink) => {
  try {
    return fetch('/api/articles/delete', {
      method: 'DELETE',
      body: JSON.stringify({
        email: email,
        link_url: articleLink,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  } catch (err) {
    return console.log(err);
  }
};
