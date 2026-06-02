(() => {
  // ts/config.ts
  var api = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";
  var config_default = api;

  // ts/photoloader.ts
  function loadPicture(idPicture) {
    let url = config_default + "/photos/" + idPicture;
    return fetch(url, { credentials: "include" }).then((response) => {
      if (!response.ok) {
        return Promise.reject(
          new Error("Erreur HTTP : " + response.status)
        );
      }
      return response.json();
    }).catch((err) => {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return Promise.reject(err);
    });
  }
  function loadResource(uri) {
    return fetch("https://webetu.iutnc.univ-lorraine.fr" + uri, { credentials: "include" }).then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(response.statusText));
      }
      return response.json();
    }).catch((err) => {
      if (err instanceof Error) {
        console.log(err.message);
      }
      return Promise.reject(err);
    });
  }

  // ts/ui.ts
  function displayPicture(data) {
    const templateElement = document.querySelector("#photoTemplate");
    const templateSource = templateElement.innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template(data);
    const photoSection = document.querySelector("#la_photo");
    photoSection.innerHTML = html;
  }
  function displayCategory(data) {
    const categorie = document.querySelector("#la_categorie");
    console.log(data);
    categorie.innerHTML = "categorie : " + data.categorie.nom;
  }
  function displayComments(data) {
    const liste = document.querySelector("#les_commentaires");
    liste.innerHTML = "";
    data.comments.forEach((comment) => {
      liste.innerHTML += "<li>" + comment.pseudo + " : " + comment.content + "</li>";
    });
  }

  // ts/index.ts
  function getPicture(id) {
    loadPicture(id).then((data) => {
      displayPicture(data);
      getCategory(data).then((categorie) => {
        displayCategory(categorie);
      });
      getComments(data).then((comments) => {
        displayComments(comments);
      });
    }).catch((err) => {
      if (err instanceof Error) {
        console.log(err.message);
      }
    });
  }
  getPicture(
    window.location.hash ? Number(window.location.hash.substr(1)) : 105
  );
  function getCategory(data) {
    console.log(data.links.categorie.href);
    return loadResource(data.links.categorie.href);
  }
  function getComments(data) {
    return loadResource(data.links.comments.href);
  }
})();
//# sourceMappingURL=index.js.map
