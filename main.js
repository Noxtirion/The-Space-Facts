fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
   .then(res => res.json())
   .then(res => {
      console.log(res);
      const pictureContainer = document.querySelector(".gallery__container");
      const titleContainer = document.querySelector(".article__title");
      const textContainer = document.querySelector(".article__text");
      pictureContainer.innerHTML = `<img class="gallery__picture" src="${res.url}" alt="Picture Of The Day"/>`;
      titleContainer.innerHTML = `${res.title}`;
      textContainer.innerHTML = `${res.explanation}`;
   })
   .catch(err => console.log(err));

const titleLength = () => {
   document.querySelector(".header__title--small").classList.add(".header__title--loaded");
};

titleLength();

fetch("https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0")
   .then(res => res.json())
   .then(res => {
      console.log(res);
      const tempContainer = document.querySelectorAll(".footer-info__box");
      const solKey = res.sol_keys;
      console.log(solKey.map(sol => res[sol].AT.mx));
      const maxTemp = solKey.map(sol => res[sol].AT.mx);
      const minTemp = solKey.map(sol => res[sol].AT.mn);
      const avTemp = solKey.map(sol => res[sol].AT.av);
      const actualDate = solKey.map(sol => res[sol].First_UTC);
      const months = {
         0: "Jan.",
         1: "Feb.",
         2: "Mar.",
         3: "Apr.",
         4: "May",
         5: "Jun.",
         6: "Jul.",
         7: "Aug.",
         8: "Sep.",
         9: "Oct.",
         10: "Nov.",
         11: "Dec."
      };

      for (let i = 0; i < tempContainer.length; i++) {
         if (tempContainer[i].classList[1] === `footer-info__box--sol${i}`) {
            let numDate = new Date(actualDate[i]);
            const numDay = numDate.getUTCDate();
            const numMonth = numDate.getUTCMonth();
            const nameMonth = months[numMonth];

            tempContainer[
               i
            ].innerHTML = `<div class="footer-info__subtitle"><h3>Sol ${solKey[i]}</h3><h3>${nameMonth} ${numDay}</h3></div><p>High: ${maxTemp[i]} &#778 C</p><p>Low: ${minTemp[i]} &#778 C</p><p>Avg: ${avTemp[i]} &#778 C</p>`;
         }
      }
   })
   .catch(err => console.log(err));
