// let audio = document.querySelector('.loading-screen').dataset.aud;

// document.addEventListener('load', () => {
//    console.log(aud);
// });

window.addEventListener('load', () => {
   let loading_screen = document.querySelector('.loading-screen');
   let first_content = document.querySelector('.content');
   let second_content = document.querySelector('.content2');
   let third_content = document.querySelector('.content3');
   let content_number = document.querySelector('.content-load__number');
   let count = 0;

    first_content.classList.add('content-anim');

    setTimeout(() => {
       first_content.classList.remove('content-anim');

       first_content.style.display = "none";

       second_content.classList.add("lambda-anim");
    }, 6100);

    setTimeout(() => {
       second_content.classList.remove('lambda-anim');

       second_content.style.display = "none";

       // audio.played ? audio.pause() : audio.play();

       third_content.classList.add('loading-animate');

       loading_screen.style.backgroundImage = "url('../img/Black_Mesa_Preloader_1.jpg')";
    }, 12100);

    setTimeout(() => {
       third_content.classList.remove('loading-animate');

       let interval = setInterval(() => {
          content_number.textContent = `${count}%`;

          content_number.parentElement.children[1].style.width = `${count}%`;

          count++;

          if(count > 100) {
            count = 100; 

            third_content.classList.add('loading-animate');

          	clearInterval(interval);

            location.assign('../singlePlayer.min.html');
          }  
       }, 100);

       third_content.style.opacity = 1; 
    }, 14100);
});