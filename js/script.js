console.log("JavaScript");
let currentSong = new Audio();
let songs=[]
let currFolder;

function formatTime(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Using floor here as well

    // Add leading zeroes if necessary
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Return the formatted time as mm:ss
    if (isNaN(formattedMinutes) || isNaN(formattedSeconds))
        return "00:00"
    return `${formattedMinutes}:${formattedSeconds}`;
}
const playMusic = (track, pause = 0) => {
    // let audio=new Audio("/songs/"+track);
    currentSong.src = `/${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "images/pause.svg";
    }


    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";

    return songs;
}

async function getSongs(folder) {
    songs=[]
    currFolder = folder;
    let a = await fetch(`/${folder}`);

    let response = await a.text();

    // console.log(folder);

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    

    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            // console.log(element.href.replaceAll("%20"," "));
            
            songs.push(element.href.split(`${folder}`)[1])
        }
    }
    //Show All the songs in the playlist
    let song_ol = document.querySelector(".songList").getElementsByTagName("ol")[0];
    song_ol.innerHTML = "";

    // console.log(songs);
    // console.log(folder.split("/"));
    
    
    for (const song of songs) {
        song_ol.innerHTML += ` <li>
        <img src="images/music.svg" alt="">
        <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>${Array.from(folder.split("/"))[1]}</div>
                            </div>
                            <div class="playnow">
                                <div>Play Now</div>
                                <img src="images/play.svg" alt="">
                            </div>
                        </li>`;
    }

    // //Playing songs
    // var audio = new Audio(songs[4]);
    // // audio.play();

    // if (promise !== undefined) {
    //     promise.then(_ => {
    //       // Autoplay started!
    //     }).catch(error => {                            //audio play gives promise most time unless user interact with script
    //       // Autoplay was prevented.
    //       // Show a "Play" button so that user can start playback.
    //     });
    //   }

    // audio.addEventListener("loadeddata", () => {
    //     // let duration=audio.duration;
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
    // })


    //Attach Event Listner to every Song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", (element) => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            songs=playMusic(e.querySelector(".info").firstElementChild.innerHTML);
        })
    });
}



async function displayAlbums() {
    let a = await fetch(`/songs/`);

    let response = await a.text();

    // console.log(response);   

    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors=Array.from(div.getElementsByTagName("a"));
    let cardContainer=document.querySelector(".cardContainer");

    for (let index = 0; index < anchors.length; index++) {
        const e= anchors[index];
        if(e.href.includes("/songs"))
        {
            let folder=(e.href.split("/").slice(-2)[0]);
            //Get the metaData of the folder
            let a = await fetch(`/songs/${folder}/info.json`);
            let response = await a.json();

            // console.log(response);
            cardContainer.innerHTML+=`<div class="card" data-folder="${response.title}">
                        <div class="play">
                            <svg height="70px" width="45px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="-30.72 -30.72 573.44 573.44" xml:space="preserve" fill="#000000">

                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                <g id="SVGRepo_iconCarrier">
                                    <circle style="fill:#3dc26c;" cx="256" cy="256" r="245.801" />
                                    <polygon style="fill: black"
                                        points="195.825,391.629 376.351,256 195.825,120.371 " />
                                    <g>
                                        <path style="fill:#0d0c0c;"
                                            d="M256,512c-68.381,0-132.667-26.628-181.019-74.98C26.628,388.667,0,324.38,0,256 S26.628,123.333,74.981,74.98C123.333,26.628,187.619,0,256,0s132.667,26.628,181.019,74.98C485.372,123.333,512,187.62,512,256 s-26.628,132.667-74.981,181.02C388.667,485.372,324.381,512,256,512z M256,20.398C126.089,20.398,20.398,126.089,20.398,256 S126.089,491.602,256,491.602S491.602,385.911,491.602,256S385.911,20.398,256,20.398z" />
                                        <path style="fill:#0d0c0c;"
                                            d="M195.824,401.828c-1.553,0-3.115-0.355-4.557-1.075c-3.458-1.727-5.641-5.26-5.641-9.124V120.371 c0-3.864,2.185-7.397,5.641-9.124c3.458-1.726,7.593-1.351,10.685,0.97l180.526,135.629c2.564,1.927,4.073,4.948,4.073,8.154 s-1.508,6.228-4.073,8.154L201.951,399.783C200.15,401.137,197.994,401.828,195.824,401.828z M206.024,140.791v230.418L359.371,256 L206.024,140.791z" />
                                        <path style="fill:#0d0c0c;"
                                            d="M256,473.243c-5.632,0-10.199-4.566-10.199-10.199c0-5.633,4.567-10.199,10.199-10.199 c52.815,0,102.404-20.633,139.633-58.1c3.973-3.996,10.429-4.015,14.425-0.045c3.995,3.971,4.016,10.428,0.046,14.424 C369.016,450.471,314.287,473.243,256,473.243z" />
                                        <path style="fill:#0d0c0c;"
                                            d="M430.396,377.825c-1.886,0-3.793-0.522-5.498-1.617c-4.741-3.041-6.118-9.351-3.076-14.092 c1.514-2.36,2.998-4.788,4.411-7.216c2.834-4.867,9.077-6.516,13.945-3.684c4.868,2.833,6.518,9.077,3.684,13.945 c-1.56,2.681-3.201,5.363-4.873,7.97C437.043,376.168,433.754,377.825,430.396,377.825z" />
                                    </g>
                                </g>

                            </svg>
                        </div>
                        <img src="/songs/${response.title}/cover.jpeg" alt="">
                        <h2>${response.title}</h2>
                        <a href="">${response.Description}</a>                     
                    </div>  `
            
        }
    }


    //load the library when the card is clicked
    console.log(document.getElementsByClassName("card"));
    
    let array=Array.from(document.getElementsByClassName("card"))
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        e.addEventListener("click", async item => {
            console.log(item.currentTarget.dataset.folder)

            await getSongs(`songs/${item.currentTarget.dataset.folder}/`);
            // playMusic(songs[0]);  //First Song will be automatically start Playing
        })   
    }
} 


async function main() {


    //Getting list of songs
    await getSongs("songs/Honey_Singh");
    // currentSong.src = "/songs/" + songs[0];       //For playing first song if play button is pressed
    // currentSong.addEventListener("play", () => {
    //     document.querySelector(".songinfo").innerHTML = currentSong.src.split("/songs/")[1].replaceAll("%20", " ");
    //     document.querySelector(".songtime").innerHTML = "00:00";            //setting its name and time

    // })

    playMusic(songs[0], 1)

    //Display All Albums on the Page
    await displayAlbums();


    //Attach an Event listner to play next and previous
    currentSong.addEventListener("ended", () => {
        play.src = "images/play.svg";
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "images/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "images/play.svg"
        }
    })

    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime,currentSong.duration); 
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Add an event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        // console.log(e.target.getBoundingClientRect(),e);  //e.target.getBoundingClientRect():Tell us the dimensions of the element
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";

        currentSong.currentTime = (percent * currentSong.duration) / 100;

    })

    // Add an eventlistner for Hamburger icon;
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })


    //Add an Event Listner for previous and next
    previous.addEventListener("click", () => {
        console.log("currentSong");
        
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);

        if (index <= 0) {
            playMusic(songs[songs.length - 1]);
        }
        else {
            playMusic(songs[index - 1]);
        }

    })
    next.addEventListener("click", () => {
        console.log("NextSong");
        console.log(songs);
        

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);

        if (index >= songs.length - 1) {
            playMusic(songs[0])
        }
        else {
            playMusic(songs[index + 1])
        }

    })

    //Add an Event Listner to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100; //as .volume goes from 0 to 1 thats why divided by 100
    })

    //Add event listner of the volume and mute buttion

    awaaz.addEventListener("click", () => {

        let x = currentSong.volume;
        if (currentSong.volume > 0) {
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
            
            currentSong.volume = 0;
            awaaz.src = "images/mute.svg";
        }
        else {
            currentSong.volume = 0.70;
            awaaz.src = "images/volume.svg";
            document.querySelector(".range").getElementsByTagName("input")[0].value=70;
        }
    })

    

}

main();


