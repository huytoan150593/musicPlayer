const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "Music-option";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const singer = $("header h3");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    onPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(){
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(app.config));
    },
    loadConfig: function(){
        app.isRandom = app.config.isRandom;
        app.isRepeat = app.config.isRepeat;
        app.currentIndex = app.config.currentIndex || 0;
        if(app.isRandom){
            randomBtn.classList.add("active");
        }
        if(app.isRepeat){
            repeatBtn.classList.add("active");
        }
    },
    songs: [
        {
            name: "All for Nothing",
            singer: "Anthem of Rain",
            path: "./access/Songs/All_For_Nothing_-_Anthem_of_Rain.mp3",
            image: "./access/Thumbnails/Allfornothing.jpeg"
        },
        {
            name: "Always Ever Be",
            singer: "Cole Powell",
            path: "./access/Songs/Always_Ever_Be_(2021_24-bit_Master)_-_Cole_Powell.mp3",
            image: "./access/Thumbnails/Always ever be.jpeg"
        },
        {
            name: "A moment in Time",
            singer: "Graham Coe",
            path: "./access/Songs/A_Moment_in_Time_-_Graham_Coe.mp3",
            image: "./access/Thumbnails/A moment in time.jpeg"
        },
        {
            name: "Baby Bird",
            singer: "LZYBY",
            path: "./access/Songs/Baby_Bird_-_LZYBY.mp3",
            image: "./access/Thumbnails/Baby bird.jpeg"
        },
        {
            name: "Ballad of a Doubtful Thought",
            singer: "Barefoot McCoy",
            path: "./access/Songs/Ballad_of_a_Doubtful_Thought_-_Barefoot_McCoy.mp3",
            image: "./access/Thumbnails/Ballad of a Doubtful Thought.jpeg"
        },
        {
            name: "Beyond the Sky",
            singer: "Joshwoodward",
            path: "./access/Songs/Beyond_the_Sky_-_joshwoodward.mp3",
            image: "./access/Thumbnails/Beyond the Sky.jpeg"
        },
        {
            name: "Blood Brothers",
            singer: "The Manky Gnu",
            path: "./access/Songs/Blood_Brothers_-_The_Manky_Gnu.mp3",
            image: "./access/Thumbnails/Blood brothers.jpeg"
        },
        {
            name: "Forest Lullaby",
            singer: "LESFM",
            path: "./access/Songs/Forest Lullaby.mp3",
            image: "./access/Thumbnails/Forest Lullaby.jpeg"
        },
        {
            name: "Braided Heart",
            singer: "Luke Davids",
            path: "./access/Songs/Braided_Heart_-_Luke_Davids.mp3",
            image: "./access/Thumbnails/Braided Heart.jpeg"
        },
        {
            name: "Caught on the Wire",
            singer: "Berkley_Mallin",
            path: "./access/Songs/Caught_on_the_Wire_-_Berkley_Mallin.mp3",
            image: "./access/Thumbnails/Caught on the Wire.jpeg"
        },
        {
            name: "Come Along",
            singer: "Avi Rosenfeld",
            path: "./access/Songs/Come_Along_-_Avi_Rosenfeld.mp3",
            image: "./access/Thumbnails/Come Along.jpeg"
        },
        {
            name: "Don't Worry",
            singer: "Joshua Wales",
            path: "./access/Songs/Don't_Worry_-_Joshua_Wales.mp3",
            image: "./access/Thumbnails/Dont't worry.jpeg"
        },
        {
            name: "Driftwood",
            singer: "The_Imaginary_Suitcase",
            path: "./access/Songs/Driftwood_-_The_Imaginary_Suitcase.mp3",
            image: "./access/Thumbnails/Driftwood.jpeg"
        },
        {
            name: "Flower of September",
            singer: "The_Tangerine_Club",
            path: "./access/Songs/Flowers_Of_September_-_The_Tangerine_Club.mp3",
            image: "./access/Thumbnails/Flower of September.jpeg"
        },
        {
            name: "Forget About Tomorrow",
            singer: "Kavi Jezzie Hockaday",
            path: "./access/Songs/Forget_About_Tomorrow_-_Kavi_Jezzie_Hockaday.mp3",
            image: "./access/Thumbnails/Forget about tomorrow.jpeg"
        },
        {
            name: "If Only",
            singer: "The Vow",
            path: "./access/Songs/If_Only_-_The_Vow.mp3",
            image: "./access/Thumbnails/If Only.jpeg"
        },
        {
            name: "I know now",
            singer: "Xander Black",
            path: "./access/Songs/I_Know_Now_-_Xander_Black.mp3",
            image: "./access/Thumbnails/I know now.jpeg"
        },
        {
            name: "In Between",
            singer: "Kinematic",
            path: "./access/Songs/Kinematic_-_In_Between.mp3",
            image: "./access/Thumbnails/In between.jpeg"
        },
        {
            name: "I wish I knew",
            singer: "Lip Service",
            path: "./access/Songs/I_Wish_I_Knew_-_Lip_Service.mp3",
            image: "./access/Thumbnails/I wish i knew.jpeg"
        },
        {
            name: "L'albero della vita",
            singer: "Simone_Roncoletta",
            path: "./access/Songs/L'albero_della_vita_-_Simone_Roncoletta.mp3",
            image: "./access/Thumbnails/L'albero della vita.jpeg"
        },
        {
            name: "Like a Song",
            singer: "Yonder Breaks",
            path: "./access/Songs/Like_a_Song_-_Yonder_Breaks.mp3",
            image: "./access/Thumbnails/Like a song.jpeg"
        },
        {
            name: "Lose You",
            singer: "EVVA x Igor Pumphonia",
            path: "./access/Songs/Lose you EVVA_feat._Igor_Pumphonia",
            image: "./access/Thumbnails/Lose You.jpeg"
        },
        {
            name: "Lost and Found",
            singer: "Jon Maurer",
            path: "./access/Songs/Lost_And_Found_-_Jon_Maurer.mp3",
            image: "./access/Thumbnails/Lost and Found.jpeg"
        },
        {
            name: "Lost Balloon",
            singer: "Tab",
            path: "./access/Songs/Lost_Balloon_-_Tab.mp3",
            image: "./access/Thumbnails/Lost balloon.jpeg"
        },
        {
            name: "Monday 8 am",
            singer: "Kinematic",
            path: "./access/Songs/Kinematic_-_Monday_8am.mp3",
            image: "./access/Thumbnails/Monday 8am.jpeg"
        },
        {
            name: "Morning coffee and you",
            singer: "The Vow",
            path: "./access/Songs/The_Vow_-_Morning_Coffee_and_You.mp3",
            image: "./access/Thumbnails/Moning coffee and you.jpeg"
        },
        {
            name: "My Garden",
            singer: "Michael Ellis",
            path: "./access/Songs/My_Garden_-_Michael_Ellis.mp3",
            image: "./access/Thumbnails/My Garden.jpeg"
        },
        {
            name: "No love to Show",
            singer: "Dayung",
            path: "./access/Songs/No_Love_to_Show--- Dayung.mp3",
            image: "./access/Thumbnails/No love to show.jpeg"
        },
        {
            name: "Not the One to Say",
            singer: "Cole Powell",
            path: "./access/Songs/Not_the_One_to_Say_(I_Told_You_So)_(24-bit_Master)_-_Cole_Powell.mp3",
            image: "./access/Thumbnails/Not the one to say.jpeg"
        },
        {
            name: "Now",
            singer: "Blooming Memories",
            path: "./access/Songs/Now_-_Blooming_Memories.mp3",
            image: "./access/Thumbnails/Now.jpeg"
        },
        {
            name: "O Fim da Escuridão",
            singer: "The Rooms",
            path: "./access/Songs/O_Fim_da_Escurida_o_-_The_Rooms.mp3",
            image: "./access/Thumbnails/O Fim da Escuridão.jpeg"
        },
        {
            name: "Old Light",
            singer: "Charles Jerred",
            path: "./access/Songs/Old_Light_-_Charles_Jerred.mp3",
            image: "./access/Thumbnails/Old light.jpeg"
        },
        {
            name: "Orange Juice",
            singer: "Sonia Isabel",
            path: "./access/Songs/Orange_Juice_-_Sonia_Isabel.mp3",
            image: "./access/Thumbnails/Orange Juice.jpeg"
        },
        {
            name: "Partners in Crime",
            singer: "Julie x Gent",
            path: "./access/Songs/Partners_in_Crime_-_Julie_amp_Gent.mp3",
            image: "./access/Thumbnails/Partners in Crime.jpeg"
        },
        {
            name: "Polaris",
            singer: "So far as I know x Daria Shakhova",
            path: "./access/Songs/Polaris_(feat._Daria_Shakhova)_-_So_Far_As_I_Know.mp3",
            image: "./access/Thumbnails/Polaris.jpeg"
        },
        {
            name: "Real",
            singer: "Michael C Jones",
            path: "./access/Songs/Real_-_Michael_C._Jones.mp3",
            image: "./access/Thumbnails/Real.jpeg"
        },
        {
            name: "Sooner or Later",
            singer: "Sam Reaver",
            path: "./access/Songs/Sooner_or_Later_-_Sam_Reaver.mp3",
            image: "./access/Thumbnails/Sooner of later.jpeg"
        },
        {
            name: "Tiptoe",
            singer: "Rivers x Leafs",
            path: "./access/Songs/Tiptoe_-_Rivers_and_Leafs.mp3",
            image: "./access/Thumbnails/Tiptoe.jpeg"
        },
        {
            name: "Tomorrow without Guns",
            singer: "Roy Smiles",
            path: "./access/Songs/Tomorrow_Without_Guns_-_Roy_Smiles.mp3",
            image: "./access/Thumbnails/Tomorrow without guns.jpeg"
        },
        {
            name: "Try Me On",
            singer: "Paxton Pennington",
            path: "./access/Songs/Try_Me_On_-_Paxton_Pennington.mp3",
            image: "./access/Thumbnails/Try me on.jpeg"
        },
        {
            name: "Walk Tonight",
            singer: "Charlie Mosbrook",
            path: "./access/Songs/Walk_Tonight_-_Charlie_Mosbrook.mp3",
            image: "./access/Thumbnails/WalkTonight.jpeg"
        },
        {
            name: "Wide World Waltz",
            singer: "Jill Zimerman",
            path: "./access/Songs/Wide_World_Waltz_-_Jill_Zimmerman.mp3",
            image: "./access/Thumbnails/Wide World Waltz.jpeg"
        },
        {
            name: "Tantalizing Youth",
            singer: "Social Square",
            path: "./access/Songs/Tantalizing_Youth_-_Social_Square.mp3",
            image: "./access/Thumbnails/Tantalizing_Youth_-_Social_Square.jpeg"
        },
        {
            name: "The Deep",
            singer: "Anitek",
            path: "./access/Songs/The_Deep_-_Anitek.mp3",
            image: "./access/Thumbnails/The Deep.jpeg"
        },
        {
            name: "No Rest Or Endless Rest",
            singer: "Lisofv",
            path: "./access/Songs/No_Rest_Or_Endless_Rest_-_Lisofv.mp3",
            image: "./access/Thumbnails/No Rest Or Endless Rest.jpeg"
        },
    ],
    playedSongs: [],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            this.loadCurrentSong();
            return `
                            <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                                <div class="thumb"
                                    style="background-image: url('${song.image}')">
                                </div>
                                <div class="body">
                                    <h3 class="title">${song.name}</h3>
                                    <p class="author">${song.singer}</p>
                                </div>
                                <div class="option">
                                    <i class="fas fa-ellipsis-h"></i>
                                </div>
                            </div>
                        `;
        });
        playlist.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    scrollActiveSong: function(){
        $(".song.active").scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = `${this.currentSong.path}`;
    },
    handleEvent: function () {
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const newCdWidth = cdWidth - window.scrollY;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        }
        const rotateAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ],{
            duration: 10000,
            iterations: Infinity
        });
        rotateAnimate.pause();
        playBtn.onclick = function () {
            if (app.onPlaying) {
                audio.pause();
            } else {
                audio.play(); 
            }
            audio.onplay = function(){
                player.classList.add("playing");
                rotateAnimate.play();
                app.onPlaying = true;
                app.config.currentIndex = app.currentIndex;
                app.setConfig();
            }
            audio.onpause = function() {
                player.classList.remove("playing");
                rotateAnimate.pause();
                app.onPlaying = false;
            }
        }
        audio.ontimeupdate = function(){
            progress.value = Math.floor(audio.currentTime / audio.duration * 100);
        }
        progress.onchange = function(){
            // const isTouch = 'touchstart' || 'mousedown';
            // app.addEventListener("mousedown", () => {
            //     audio.ontimeupdate = false;
            //     progress.onchange = false;
            // })
            audio.currentTime = audio.duration / 100 * progress.value;
        }
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong();
                app.playedSongs.push(app.currentIndex);
                console.log(app.playedSongs)
            }else{
                app.nextSong();
            }
            app.render();
            app.scrollActiveSong();
        }
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong();
                app.playedSongs.push(app.currentIndex);
                console.log(app.playedSongs)
            }else{
                app.prevSong();
            }
            app.render();
            app.scrollActiveSong();
        }
        randomBtn.onclick = function(){
            app.isRandom = !app.isRandom;
            app.config.isRandom = app.isRandom;
            app.setConfig();
            this.classList.toggle("active");
            // app.isRepeat = !app.isRandom;
            // repeatBtn.classList.remove("active", app.isRandom);
        }
        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat;
            app.config.isRepeat = app.isRepeat
            app.setConfig();
            this.classList.toggle("active");
            // app.isRandom = !app.isRepeat;
            // randomBtn.classList.remove("active", app.isRepeat);
        }
        audio.onended = function(){
            if(app.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }
        playlist.onclick = function(e){
            let activeElement = $(".song.active");
            let element = e.target.closest(".song:not(.active)");
            let optionElement = e.target.closest(".song:not(.option)");
            if(element || optionElement){
                if(element){
                    activeElement.classList.remove("active");
                    element.classList.add("active");
                    app.currentIndex = Number(element.dataset.index);
                    app.loadCurrentSong();
                    playBtn.click();
                    audio.play();
                }
                if(optionElement){
                }
            }
        }
    },
    nextSong: function(){
        if(app.currentIndex < app.songs.length - 1){
            app.currentIndex++;
        }else{
            app.currentIndex = 0;
        };
        app.loadCurrentSong();
    },
    prevSong: function(){
        if(app.currentIndex === 0){
            app.currentIndex = app.songs.length - 1;
        }else{
            app.currentIndex--;
        }
        app.loadCurrentSong();
    },
    randomSong: function(){
        const countSongs = app.songs.length;
        let countPlayed = app.playedSongs.length;
        if(countSongs === countPlayed){
            app.playedSongs = [];
        }
        let newIndex = Math.floor(Math.random() * app.songs.length);
        let checkSong = app.playedSongs.includes(newIndex);
        let checkRepeat = newIndex === app.currentIndex ;
        let checkBoolean = !checkSong && !checkRepeat;
        if(checkBoolean){
            this.currentIndex = newIndex;
            this.loadCurrentSong();
            return;
        }else{
            app.randomSong();
        }
    },
    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvent();
        this.render();
    }
}

app.start();



