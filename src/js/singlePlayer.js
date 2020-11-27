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
      let options = {
        threshold: 0.5
      }
      
      let callback = (entries, observer) => {
         entries.forEach(entry => {
            let el = entry.target
            let audio =  el.children[0].children[0]

            if(entry.isIntersecting) {
              if(audio.paused) {
                audio.play()
              }

              el.classList.add('anim')

              el.style.opacity = 1
            } else {
              audio.pause()
              audio.currentTime = 0
            
              el.classList.remove('anim')

              el.style.opacity = 0
            }
         })
      }
      
      let history_blocks = document.querySelectorAll('.history-blocks');
      let buttons = document.querySelectorAll('.buttons');
      let buttons2 = [...buttons];

      buttons2.map((item) => {
         item.addEventListener("click", () => {
             window.location.assign('../finalScreen.min.html')
         })
      })

      let observer = new IntersectionObserver(callback, options);

      history_blocks.forEach((block) => observer.observe(block)) 
})

   

















