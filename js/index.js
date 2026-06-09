(() => {
  // ts/config.ts
  var apiRoot = "/www/canals5/phox/api";
  var apiBase = "https://webetu.iutnc.univ-lorraine.fr";
  var config_default = apiRoot;

  // ts/photoloader.ts
  function buildUrl(uri) {
    if (uri.startsWith("http://") || uri.startsWith("https://")) {
      return uri;
    }
    if (uri.startsWith("/www/")) {
      return apiBase + uri;
    }
    if (uri.startsWith("/")) {
      return apiBase + config_default + uri;
    }
    return apiBase + config_default + "/" + uri;
  }
  function loadPicture(idPicture) {
    return loadResource(`${config_default}/photos/${idPicture}`);
  }
  function loadResource(uri) {
    return fetch(buildUrl(uri), {
      credentials: "include"
    }).then((response) => {
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
    const template = Handlebars.compile(templateElement.innerHTML);
    const html = template(data);
    const photoSection = document.querySelector("#la_photo");
    photoSection.innerHTML = html;
  }
  function displayCategory(data) {
    const categorie = document.querySelector("#la_categorie");
    const descr = document.querySelector("#categorie_descr");
    categorie.textContent = `categorie : ${data.categorie.nom}`;
    descr.textContent = data.categorie.descr;
  }
  function displayComments(data) {
    const liste = document.querySelector("#les_commentaires");
    liste.innerHTML = "";
    data.comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = `${comment.pseudo} : ${comment.content}`;
      liste.appendChild(li);
    });
  }

  // ts/gallery.ts
  var currentGallery = null;
  function loadGalleryFromUri(uri) {
    return loadResource(uri).then((gallery) => {
      currentGallery = gallery;
      return gallery;
    });
  }
  function load() {
    return loadGalleryFromUri(`${config_default}/photos`);
  }
  function next() {
    if (currentGallery === null) {
      return load();
    }
    return loadGalleryFromUri(currentGallery.links.next.href);
  }
  function prev() {
    if (currentGallery === null) {
      return load();
    }
    return loadGalleryFromUri(currentGallery.links.prev.href);
  }
  function first() {
    if (currentGallery === null) {
      return load();
    }
    return loadGalleryFromUri(currentGallery.links.first.href);
  }
  function last() {
    if (currentGallery === null) {
      return load();
    }
    return loadGalleryFromUri(currentGallery.links.last.href);
  }

  // ts/gallery_ui.ts
  function displayGallery(galerie) {
    console.log(galerie.photos[0]);
    const templateElement = document.querySelector("#galleryTemplate");
    const template = Handlebars.compile(templateElement.innerHTML);
    const html = template({ photos: galerie.photos });
    const container = document.querySelector("#les_photos");
    container.innerHTML = html;
  }

  // ts/index.ts
  function handleError(err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
  function getCategory(data) {
    return loadResource(data.links.categorie.href);
  }
  function getComments(data) {
    return loadResource(data.links.comments.href);
  }
  function getPicture(id) {
    loadPicture(id).then((data) => {
      displayPicture(data);
      getCategory(data).then((categorie) => {
        displayCategory(categorie);
      }).catch(handleError);
      getComments(data).then((comments) => {
        displayComments(comments);
      }).catch(handleError);
    }).catch(handleError);
  }
  function refreshGallery(action) {
    action().then((galerie) => {
      displayGallery(galerie);
    }).catch(handleError);
  }
  var boutonLoad = document.querySelector("#load");
  var boutonNext = document.querySelector("#next");
  var boutonPrev = document.querySelector("#prev");
  var boutonFirst = document.querySelector("#first");
  var boutonLast = document.querySelector("#last");
  boutonLoad.addEventListener("click", () => {
    refreshGallery(load);
  });
  boutonNext.addEventListener("click", () => {
    refreshGallery(next);
  });
  boutonPrev.addEventListener("click", () => {
    refreshGallery(prev);
  });
  boutonFirst.addEventListener("click", () => {
    refreshGallery(first);
  });
  boutonLast.addEventListener("click", () => {
    refreshGallery(last);
  });
  getPicture(
    window.location.hash ? Number(window.location.hash.slice(1)) : 105
  );
})();
//# sourceMappingURL=index.js.map
