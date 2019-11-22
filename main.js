fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
   .then(res => res.json())
   .then(res => {
      console.log(res);
      let pictureContainer = document.querySelector(".gallery__container");
      let titleContainer = document.querySelector(".article__title");
      let textContainer = document.querySelector(".article__text");
      pictureContainer.innerHTML = `<img class="gallery__picture" src="${res.url}" alt="Picture Of The Day"/>`;
      titleContainer.innerHTML = `${res.title}`;
      textContainer.innerHTML = `${res.explanation}`;
   })
   .catch(err => console.log(err));

let titleLength = () => {
   document.querySelector(".header__title--small").classList.add(".header__title--loaded");
};

titleLength();
