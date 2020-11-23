window.addEventListener('load', () => {
   let achivment = document.querySelector('.final-screen__achivment-block');
   let final_screen = document.querySelector('.final-screen');  
   let audio = document.querySelector('audio');
   let txt = document.querySelectorAll('.information-block__txt');
   let ending_images = ['../img/Ending_1.jpg', '../img/Ending_2.jpg', '../img/Ending_3.jpg', '../img/Ending_4.jpg', '../img/Ending_5.jpg', '../img/Ending_6.jpg', '../img/Ending_7.jpg', '../img/Ending_8.jpg', '../img/Ending_9.jpg', '../img/Ending_10.png', "../img/Ending_11.jpg"];
   //let txt2 = [...txt]
         
   txt[0].classList.add('first-start');
   txt[1].classList.add('second-start');
   txt[2].classList.add('third-start');

   setTimeout(() => {
      achivment.style.animation = 'show 2s linear 1, lighting 3s linear infinite';
      achivment.style.transform = "translateX(0px)";
   }, 2000);

   setTimeout(() => {
       txt[0].classList.remove('first-start');
       txt[1].classList.remove('second-start');
       txt[2].classList.remove('third-start');
   }, 10000);
   
   setTimeout(() => {
      achivment.style.animation = "hide 2s linear 1, lighting 3s linear infinite"; 
      achivment.style.opacity = "0";

      txt[0].classList.add('first-end');
      txt[1].classList.add('second-end');
      txt[2].classList.add('third-end');
   }, 10500);

   setTimeout(() => {
       txt.forEach(item => item.style.opacity = "0")
   }, 11505)

   setTimeout(() => {
      final_screen.removeChild(achivment)
      final_screen.removeChild(txt[0].parentElement.parentElement)
     
      let imgBlock = document.createElement('div')
      let img = document.createElement('img')
      let i = 0

      imgBlock.className = 'img-block'
      img.className = 'img'
      
      final_screen.appendChild(imgBlock)
      imgBlock.appendChild(img)  

      let interval = setInterval(() => {
         img.src = ending_images[i]

         img.classList.add('strange')

         i++

         if(i >= 12) {
            // audio.played ? audio.pause() : console.log(audio.currentTime)

            final_screen.removeChild(imgBlock)
            imgBlock.removeChild(img)

            clearInterval(interval)

            let buttonsBlock = document.createElement('div')
            let buttonRepeat = document.createElement('button')
            let buttonGoOn = document.createElement('button')

            buttonsBlock.className = 'buttonsBlock'
            buttonRepeat.className = 'buttonRepeat'
            buttonGoOn.className = 'buttonGoOn'

            buttonRepeat.textContent = 'Начать с начала'
            buttonGoOn.textContent = 'Выйти со страницы'

            final_screen.appendChild(buttonsBlock)
            buttonsBlock.appendChild(buttonRepeat)
            buttonsBlock.appendChild(buttonGoOn)

            buttonRepeat.addEventListener('click', () => {
                window.location.assign("../loadScreen.min.html")
            })

            buttonGoOn.addEventListener('click', () => {
                window.location.assign("https://google.com")
            })
         }
      }, 10000)
   }, 12000)

  final_screen.addEventListener('click', () => {
    if(!document.fullscreenElement) {
      final_screen.requestFullscreen();
    } else {
      // if(document.fullscreenEnabled) {
      //      document.exitFullscreen();
      // }
      console.log(true)
    }
  });

  final_screen.click()
  return false
});