/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const responseHeader = document.querySelector('#response-header');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        //search for images from unsplash
        $.ajax({
          url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
          headers: {
            Authorization: 'Client-ID f741369501d5bc8877d76f955804d0c51074dbf0a5f0fa0d74d28e1aca478d16'
          }
        }).done(addImage)
        .fail(function (err) {
          requestError(err, 'images');
        });

        //search for articles from NYtimes
        $.ajax({
          url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=19cfMMR4Kbnd1q1AItgUdAlfN5GnSTGh`,
        }).done(addArticles)
        .fail(function (err) {
          requestError(err, 'articles');
        });

    });

    //on success callback getting images
    function addImage(images) {
      let htmlContent = '';
      //let divCont = document.createElement("div");
      //const data = JSON.parse(this.responseText);
      if (images.results.length>0) {
        images.results.forEach(function (el, indx) {
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
      responseHeader.innerHTML = `Znaleźliśmy dla ciebie ${images.results.length} obrazów `;
      //responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    //on success callback getting articles
    function addArticles(data) {
      let htmlContent = '';
      //const data = JSON.parse(this.responseText);

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
