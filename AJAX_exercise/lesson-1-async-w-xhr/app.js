(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const responseHeader = document.querySelector('#response-header');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        responseHeader.innerHTML = '';
        searchedForText = searchField.value;

        //search for images from unsplash
        const imgRequest = new XMLHttpRequest();
        //const searchedText = 'my';

        imgRequest.onload = addImage;
        imgRequest.onerror = function(err) {
          requestError(err, 'image');
        };
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID f741369501d5bc8877d76f955804d0c51074dbf0a5f0fa0d74d28e1aca478d16');
        imgRequest.send();

        //search for articles from NYtimes
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.onerror = function(err) {
          requestError(err, 'articles');
        };
        articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=19cfMMR4Kbnd1q1AItgUdAlfN5GnSTGh`);
        articleRequest.send();
    });

    //on success callback getting images
    function addImage() {
      let htmlContent = '';
      //let divCont = document.createElement("div");
      const data = JSON.parse(this.responseText);
      if (data && data.results.length>0) {
        data.results.forEach(function (el, indx) {
        //const firstImage = data.results[0];
          htmlContent = `<figure>
            <img src="${el.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${el.user.name}</figcaption>
          </figure>`;
          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        });
      } else {
        htmlContent = '<div class="error-no-image">Brak obrazów</div>';
      }
      responseHeader.innerHTML = `Znaleźliśmy dla ciebie ${data.results.length} obrazów `;
      //responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    //on success callback getting articles
    function addArticles() {
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data.response && data.response.docs.length > 1) {
        htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
          </li>`
        ).join('') + '</ul>';
      } else {
        htmlContent = '<div class="error-no-articles">Brak artykulów</div>';
      }
      responseContainer.insertAdjacentHTML('beforeend', htmlContent);
      responseHeader.innerHTML += ` i ${data.response.docs.length} artykulów.`
    }

})();
