function handleErrors(res) {
   if (!res.ok) {
      document.querySelector(
         ".gallery__container"
      ).innerHTML = `<p>Sorry, there is no picture to display on this date.</p>`;
      throw Error(res.statusText);
   }
   return res.json();
}

fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
   .then(handleErrors)
   .then(res => {
      console.log(res);

      const pictureContainer = document.querySelector(".gallery__container");
      const titleContainer = document.querySelector(".article__title");
      const textContainer = document.querySelector(".article__text");
      const slideButtons = document.querySelectorAll(".slider__button");
      const sliderDateText = document.querySelector(".slider__date");
      let currentDate = moment(res.date).format("YYYY-MM-DD");

      console.log(currentDate);
      if (res.media_type !== "image") {
         pictureContainer.innerHTML = `<img class="gallery__picture" src="./img/Moon.png" alt="Picture Of The Day"/><p>Sorry, no image available.</p>`;
         res.media_type = "image";
      } else {
         pictureContainer.innerHTML = `<img class="gallery__picture" src="${res.url}" alt="Picture Of The Day"/>`;
      }
      titleContainer.innerHTML = `${res.title}`;
      textContainer.innerHTML = `${res.explanation}`;
      sliderDateText.innerHTML = `${currentDate}`;

      slideButtons.forEach(item => {
         item.addEventListener("click", function dec(e) {
            if (res.media_type === "image" && e.target.classList[1] === "slider__button--red") {
               currentDate = moment(currentDate).subtract(1, "day");
               currentDate = moment
                  .max(moment(currentDate), moment("1995-06-16"))
                  .format("YYYY-MM-DD");
               console.log(res.media_type);
               console.log(currentDate);
               console.log(e.target.classList[1]);
               // console.log(res.media_type);
            } else if (
               res.media_type === "image" &&
               e.target.classList[1] === "slider__button--blue"
            ) {
               currentDate = moment(currentDate).add(1, "day");
               currentDate = moment.min(moment(currentDate), moment(res.date)).format("YYYY-MM-DD");
               console.log(currentDate);
               console.log(res.date);
               console.log(e.target.classList[1]);
            }

            fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${currentDate}`)
               .then(handleErrors)
               .then(res => {
                  if (res.media_type !== "image") {
                     pictureContainer.innerHTML = `<img class="gallery__picture" src="./img/Moon.png" alt="Picture Of The Day"/><p>Sorry, no image available.</p>`;
                     // console.log(e);
                     // dec(e);
                  } else {
                     pictureContainer.innerHTML = `<img class="gallery__picture" src="${res.url}" alt="Picture Of The Day"/>`;
                  }
                  titleContainer.innerHTML = `${res.title}`;
                  textContainer.innerHTML = `${res.explanation}`;
                  sliderDateText.innerHTML = `${currentDate}`;
               })

               .catch(err => console.log(err));
         });
      });
   })
   .catch(err => console.log(err));

//////////////////////// This is footer

fetch("https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0")
   .then(res => res.json())
   .then(res => {
      console.log(res);
      const tempContainer = document.querySelectorAll(".footer-info__box");
      const solKey = res.sol_keys;
      console.log(solKey.map(sol => res[sol].AT.mx));
      console.log(solKey.map(sol => res[sol].HWS.mx));
      const maxTemp = solKey.map(sol => res[sol].AT.mx);
      const minTemp = solKey.map(sol => res[sol].AT.mn);
      const avTemp = solKey.map(sol => res[sol].AT.av);
      const maxWind = solKey.map(sol => res[sol].HWS.mx);
      const minWind = solKey.map(sol => res[sol].HWS.mn);
      const avWind = solKey.map(sol => res[sol].HWS.av);
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
            const windButton = document.querySelector(".footer-info__button--wind");
            const tempButton = document.querySelector(".footer-info__button--temp");

            const celsius = "&#778 C";
            const metPerSec = "m/s";
            function weather(min, max, av, unit) {
               tempContainer[i].innerHTML = `<div class="footer-info__subtitle"><h3>Sol ${
                  solKey[i]
               }</h3><h3>${nameMonth} ${numDay}</h3></div><p>High: ${max[i].toFixed(
                  3
               )} ${unit} </p><p>Low: ${min[i].toFixed(3)} ${unit} </p><p>Avg: ${av[i].toFixed(
                  3
               )} ${unit} </p>`;
            }

            weather(minTemp, maxTemp, avTemp, celsius);

            tempButton.addEventListener("click", () => weather(minTemp, maxTemp, avTemp, celsius));
            windButton.addEventListener("click", () =>
               weather(minWind, maxWind, avWind, metPerSec)
            );
         }
      }
   })
   .catch(err => console.log(err));
