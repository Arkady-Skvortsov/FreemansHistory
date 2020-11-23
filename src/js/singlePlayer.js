/* 
  На самый конец - выбор Фримана.
  Будет принимать true/false 
*/ 

// window.addEventListener('scroll', () => {
//     let value = window.scrollY;

//    Gordon.style.left = `${value * 1.5}px`;
// });

let FrChoice = new Boolean

module.exports = FrChoice

window.addEventListener('load', () => {
      let single_player = document.querySelector('.single-player');
      let buttons = document.querySelectorAll('.buttons');

      let arr2 = [...buttons];

      arr2.map((item) => {
         item.addEventListener("click", () => {
             window.location.assign('../finalScreen.min.html')
         })
      })
})

   

















