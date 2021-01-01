export function cookieStrToObj(str) {
  var obj = {};
  if (str && typeof str === 'string') {
    var objStr = str.match(/\{(.)+\}/g);
    eval('obj =' + objStr);
  }
  return obj;
}

// save article api call
export const saveUserArticle = (email, article, savedArticleTime) => {
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
  }).catch((err) => console.log(err));
};

// delete article api call
export const deleteSavedArticles = (email, articleLink) => {
  return fetch('/api/articles/delete', {
    method: 'DELETE',
    body: JSON.stringify({
      email: email,
      link_url: articleLink,
    }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).catch((err) => console.log(err));
};
