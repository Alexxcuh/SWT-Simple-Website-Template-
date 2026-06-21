const ConfigFile = await fetch("/assets/Config.json")
    .then(r => r.json());
const SongsFile = await fetch("/assets/Songs.json")
    .then(r => r.json());
const ImagesFile = await fetch("/assets/Images.json")
    .then(r => r.json());

var CurrentPageNumber = 0;
var SongsDiv = document.getElementById("songs")
var ImagesDiv = document.getElementById("images")
var CurrentPageDiv = null;
var CurrentInnerPageDiv = null;

//initialize songs page
SongsFile.Songs.forEach((song, index) => {
    if (index % ConfigFile.SongsPerPage === 0) {
        CurrentPageNumber++;
        CurrentPageDiv = document.createElement("div")
        CurrentPageDiv.classList.add("song-pages");
        CurrentPageDiv.dataset.page = CurrentPageNumber;
        if (CurrentPageNumber == 1) CurrentPageDiv.classList.add("active")
        SongsDiv.append(CurrentPageDiv)
        CurrentInnerPageDiv = document.createElement("div")
        CurrentInnerPageDiv.classList.add("song-list");
        CurrentPageDiv.append(CurrentInnerPageDiv);
    }
    var CurrentSongPillDiv = document.createElement("div");
    CurrentSongPillDiv.classList.add("song-pill")
    CurrentInnerPageDiv.append(CurrentSongPillDiv);
    var image = document.createElement("img");
    image.alt = `${song.Name} cover`
    image.dataset.src = song.Icon;
    CurrentSongPillDiv.append(image)
    var songdetails = document.createElement("div");
    songdetails.classList.add("song-details");
    var songtitle = document.createElement("div")
    songtitle.classList.add("song-title")
    songtitle.innerHTML = song.Name;
    songdetails.append(songtitle);
    var songcreator = document.createElement("span")
    songcreator.innerText = song.Creator;
    songdetails.append(songcreator);
    CurrentSongPillDiv.append(songdetails);
    var songbuttons = document.createElement("div")
    songbuttons.classList.add("song-buttons");
    song.Streams.forEach((stream) => {
        var streambutton = document.createElement("a")
        streambutton.classList.add("click-button");
        streambutton.target = "_blank"
        var streamicon = document.createElement("img")
        streambutton.append(streamicon)
        switch (stream.Type) {
            case 0:
                streambutton.style.cssText = `--bg:${ConfigFile.YoutubeColor};`;
                streambutton.href = "https://www.youtube.com/watch?v="+stream.Code;
                streamicon.dataset.src = ConfigFile.YoutubeIcon;
                streamicon.alt = "Youtube icon";
                streambutton.append("Stream");
                break;
        
            case 1:
                streambutton.style.cssText = `--bg:${ConfigFile.SpotifyColor};`;
                streambutton.href = "https://open.spotify.com/track/"+stream.Code;
                streamicon.dataset.src = ConfigFile.SpotifyIcon;
                streamicon.alt = "Spotify icon";
                streambutton.append("Stream");
                break;
            
            case 2:
                streambutton.style.cssText = `--bg:${ConfigFile.NicoColor}; --hover:#000;`;
                streambutton.href = "https://www.nicovideo.jp/watch/"+stream.Code;
                streamicon.dataset.src = ConfigFile.NicoIcon;
                streamicon.alt = "Niconico icon";
                streambutton.append("Stream");
                break;

            case 3:
                streambutton.style.cssText = `--bg:${ConfigFile.BandcampColor};`;
                streambutton.href = "https://omuomu.bandcamp.com/track/"+stream.Code;
                streamicon.dataset.src = ConfigFile.BandcampIcon;
                streamicon.alt = "Bandcamp icon";
                streambutton.append("Buy");
                break;
            
            default: break;
        }
        songbuttons.append(streambutton);
    });
    CurrentSongPillDiv.append(songbuttons);

})
var pagination = document.createElement("div")
pagination.classList.add("pagination")
SongsDiv.append(pagination)
paginationState.songs.totalPages = CurrentPageNumber;
renderPagination('songs', '.song-pages');
loadActivePageImages(document.querySelector('.panel.active'));
CurrentPageNumber = 0;
// initialize images page
ImagesFile.Images.forEach((image, index) => {
    if (index % ConfigFile.ImagesPerPage === 0) {
        CurrentPageNumber++;
        CurrentPageDiv = document.createElement("div")
        CurrentPageDiv.classList.add("image-pages");
        CurrentPageDiv.dataset.page = CurrentPageNumber;
        if (CurrentPageNumber == 1) CurrentPageDiv.classList.add("active")
        ImagesDiv.append(CurrentPageDiv)
        CurrentInnerPageDiv = document.createElement("div")
        CurrentInnerPageDiv.classList.add("image-grid");
        CurrentPageDiv.append(CurrentInnerPageDiv);
    }
    var ImageCard = document.createElement("div");
    ImageCard.classList.add("image-card")
    var InnerDiv = document.createElement("div");
    var Image = document.createElement("img");
    Image.dataset.src = image.Path;
    Image.alt = image.Description;
    InnerDiv.append(Image);
    ImageCard.append(InnerDiv);
    CurrentInnerPageDiv.append(ImageCard)

})
pagination = document.createElement("div")
pagination.classList.add("pagination")
ImagesDiv.append(pagination)
paginationState.images.totalPages = CurrentPageNumber;
renderPagination('images', '.image-pages');
loadActivePageImages(document.querySelector('.panel.active'));

        //     <div class="image-pages active" data-page="1">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/tetorobot.jpeg" alt="robot kasane teto"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/tetofat.jpeg" alt="kasane teto hugging bread"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/synthv.jpeg" alt="kasane teto synthesizer v"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/smugfigr.jpeg" alt="chibi kasane teto figur"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="2">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/sleepteto.jpeg" alt="one teto sleeping and one excited "></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/ineed.jpeg" alt="shut up and take my money gif here"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/hi.jpeg" alt="zoomed in picture of an kasane teto plush"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/ewgrass.jpeg" alt="teto outside touching grass ew"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="3">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/absolute_cinema.png" alt="teto absolute cinema"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/rygb.png" alt="(R)ed (Y)ellow (G)reen (B)lue"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_1.png" alt="teto fanart (by @roraly on discord)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/tetoapproves.jpg" alt="teto approves"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="4">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/tetobaguette.jpg" alt="teto holding a baguette (by @kkcharles on discord)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/tetodoom.png" alt="teto + doom (by @roraly on discord)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/tetoposture.png" alt="teto posture comparison"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/tetoselfie.png" alt="teto selfie (by @roraly on discord)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="5">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/2000yardstare.png" alt="teto 2000 yard stare (by @00koshimiz00 on twitter)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/drummer_teto.jpg" alt="drummer teto (by @hasei01 on twitter)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_happy.png" alt="teto happy (by 0916psy/가온누리 on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/unemployed.jpg" alt="teto unemployed (by @abstractsama on twitter)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="6">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/born_to_create.png" alt="born to create (by @uzsgsg on twitter)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/just_teto.png" alt="teto <3 (by @mimi__pya on twitter)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_singing.jpg" alt="teto singing (by @HiRO_eeee on twitter)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/undone_drills.png" alt="teto undone drills (by @ganbaritaiNa_07 on twitter)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="7">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_2.png" alt="teto fanart (by @roraly on discord)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_silly.jpg" alt="silly teto"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_3.jpg" alt="teto fanart (by 薛喵M on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/cat_teto_baguette.jpg" alt="cat teto holding a baguette (by @gomya0_0 on twitter)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="8">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_4.jpg" alt="teto fanart (by ayra on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/pearto.jpg" alt="pearto (by @artz_only on twitter)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_5.jpg" alt="teto fanart (by いわし on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_eating.jpg" alt="teto eating ice cream (by 白井サフニ on pixiv)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="9">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_6.jpg" alt="teto fanart (by 白井サフニ on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_7.jpg" alt="teto fanart (by 白井サフニ on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_halloween.jpg" alt="teto halloween outfit (by @sakauchi0 on twitter)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_8.jpg" alt="teto fanart (by Ni7@Skeb募集中 on pixiv)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="10">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_9.jpg" alt="teto fanart (by 冷凍パイン on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_10.png" alt="teto fanart (by わたあめ on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_bday_fanart.png" alt="teto birthday fanart (by わたあめ on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_11.jpg" alt="teto fanart (by わたあめ on pixiv)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="11">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_headache.jpg" alt="teto headache (by 400w on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_12.jpg" alt="teto fanart (by KoKo on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_sharing.jpg" alt="teto sharing ice cream (by えりふら on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_13.jpg" alt="teto fanart (by えりふら on pixiv)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="12">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_14.png" alt="teto fanart (by えりふら on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_15.png" alt="teto fanart (by 炸街大手子。。on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_teto_beam.png" alt="teto teto beam (by AmaoPofu on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_16.png" alt="teto fanart (by Danchoo._. on pixiv)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="13">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_17.jpg" alt="teto fanart (by Danchoo._. on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_18.png" alt="teto fanart (by 緑葉茶屋(ろくばちゃや) on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_19.png" alt="teto fanart (by 가온누리 on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_20.jpg" alt="teto fanart (by 韓冰箱 Fridge on pixiv)"></div>
        //         </div>
        //     </div>


        //     <div class="image-pages" data-page="14">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_portrait.png" alt="teto portrait (by Endimion on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_21.jpg" alt="teto fanart (by Robotoperez on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_book.png" alt="teto reading a book (by miles/miles99 on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_halloween_2.jpg" alt="teto halloween outfit (by RaychuUwU on pixiv)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="15">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_22.png" alt="teto fanart (by 緑葉茶屋(ろくばちゃや) on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_23.jpg" alt="teto fanart (by PandaAColor on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_24.jpg" alt="teto fanart (by 天音. on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_25.jpg" alt="teto fanart (by HOII on pixiv)"></div>
        //         </div>
        //     </div>

        //     <div class="image-pages" data-page="16">
        //         <div class="image-grid">
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_26.jpg" alt="teto fanart (by かーやんアート on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_knight.png" alt="teto knight (by Botfishe on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_suit.jpg" alt="teto in a suit (by ayra on pixiv)"></div>
        //             <div class="image-card"><img data-src="./assets/cdn/images/teto_fanart_27.jpg" alt="teto fanart (by カザル on pixiv)"></div>
        //         </div>
        //     </div>

        // <div class="pagination"></div>