const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
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
    songs: [
        {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./access/song1.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./access/song2.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path: "./access/song3.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./access/song4.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "./access/song5.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "./access/song6.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./access/song7.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Click Pow Get Down 2",
            singer: "Raftaar x Fortnite",
            path: "./access/song1.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Tu Phir Se Aana 2",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./access/song2.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Naachne Ka Shaunq 2",
            singer: "Raftaar x Brobha V",
            path: "./access/song3.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mantoiyat 2",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./access/song4.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Aage Chal 2",
            singer: "Raftaar",
            path: "./access/song5.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        }
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
            const isTouch = 'touchstart' || 'mousedown';
            this.addEventListener(isTouch, () => {
                audio.ontimeupdate = false;
            })
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
            this.classList.toggle("active");
            app.isRepeat = !app.isRandom;
            repeatBtn.classList.remove("active", app.isRandom);
        }
        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat;
            this.classList.toggle("active");
            app.isRandom = !app.isRepeat;
            randomBtn.classList.remove("active", app.isRepeat);
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
        console.log(`checkSong: ${checkSong} and checkRepeat: ${checkRepeat}`);
        console.log(checkBoolean);
        if(checkBoolean){
            this.currentIndex = newIndex;
            this.loadCurrentSong();
            return;
        }else{
            app.randomSong();
        }
    },
    start: function () {
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvent();
        this.render();
    }
}

app.start();

