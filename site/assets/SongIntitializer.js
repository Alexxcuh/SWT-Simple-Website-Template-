const ConfigFile = await fetch("/assets/Config.json")
    .then(r => r.json());
const SongsFile = await fetch("/assets/Songs.json")
    .then(r => r.json());

var CurrentSongPage = 0;
var SongsDiv = document.getElementById("songs")
var CurrentPageDiv = null;
var CurrentInnerPageDiv = null;
var CurrentSongPillDiv = null;

SongsFile.Songs.forEach((song, index) => {
    if (index % ConfigFile.SongsPerPage === 0) {
        CurrentSongPage++;
        CurrentPageDiv = document.createElement("div")
        CurrentPageDiv.classList.add("song-pages");
        CurrentPageDiv.dataset.page = CurrentSongPage;
        if (CurrentSongPage == 1) CurrentPageDiv.classList.add("active")
        SongsDiv.append(CurrentPageDiv)
        CurrentInnerPageDiv = document.createElement("div")
        CurrentInnerPageDiv.classList.add("song-list");
        CurrentPageDiv.append(CurrentInnerPageDiv);
    }
    CurrentSongPillDiv = document.createElement("div");
    CurrentSongPillDiv.classList.add("song-pill")
    CurrentInnerPageDiv.append(CurrentSongPillDiv);
    var image = document.createElement("img");
    image.alt = `{song.Name} cover`
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
renderPagination('songs', '.song-pages');
loadActivePageImages(document.querySelector('.panel.active'));