var mediaLibrary = /** @class */ (function () {
    function mediaLibrary() {
        this.playList = [];
        this.playListname = [];
        var songDet = [
            {
                songname: "In The End",
                author: "Linkin Park",
                rating: [2, 5, 4],
                playlist: "English songs",
                songURL: "/music/intheend.mp3",
                genre: "Rock"
            },
            {
                songname: "Spectre",
                author: "Alan Walker",
                rating: [4, 2],
                playlist: "English songs",
                songURL: "/music/spectre.mp3",
                genre: "Rock"
            },
            {
                songname: "Thinking Out Loud",
                author: "Ed Sheeran",
                rating: [3],
                playlist: "English songs",
                songURL: "/music/thinkingoutloud.mp3",
                genre: "Rock"
            },
            {
                songname: "Shape of you",
                author: "Ed Sheeran",
                rating: [3, 2],
                playlist: "English songs latest",
                songURL: "/music/shapeofyou.mp3",
                genre: "Romantic"
            },
            {
                songname: "Bheegi Bheegi",
                author: "Neha Kakkar",
                rating: [4, 1, 5],
                playlist: "Hindi songs",
                songURL: "/music/bheegi bheegi.mp3",
                genre: "Sad"
            },
            {
                songname: "Lamha Lamha",
                author: "Abhijeet Bhattacharya, Sunidhi Chauhan",
                rating: [5, 5, 3],
                playlist: "Hindi songs",
                songURL: "/music/lamha_lamha.mp3",
                genre: "Romantic"
            },
        ];
        for (var _i = 0, songDet_1 = songDet; _i < songDet_1.length; _i++) {
            var det = songDet_1[_i];
            this.addSongs(det);
        }
        this.showPlayLists();
    }
    mediaLibrary.prototype.addSongs = function (list) {
        this.playList.push(list);
        if (!this.playlistExist(list.playlist)) {
            this.playListname.push(list.playlist);
        }
    };
    mediaLibrary.prototype.feedrating = function (rate) {
        var name = document.getElementById('selectedSong').innerText;
        for (var _i = 0, _a = this.playList; _i < _a.length; _i++) {
            var song = _a[_i];
            if (song.songname == name) {
                song.rating.push(rate);
                break;
            }
        }
    };
    mediaLibrary.prototype.addNewPlaylist = function () {
        var temp = {
            songname: document.getElementById('songName').value,
            author: document.getElementById('author').value,
            rating: [+(document.getElementById('rating').value)],
            playlist: document.getElementById('playlistName').value,
            songURL: document.getElementById('songUrl').value,
            genre: document.getElementById('genre').value
        };
        this.addSongs(temp);
        this.showPlayLists();
    };
    mediaLibrary.prototype.addNewSong = function () {
        var temp = {
            songname: document.getElementById('newsongName').value,
            author: document.getElementById('newauthor').value,
            rating: [+(document.getElementById('newrating').value)],
            playlist: this.selectedPlaylist,
            songURL: document.getElementById('newsongUrl').value,
            genre: document.getElementById('newgenre').value
        };
        this.addSongs(temp);
        this.showSongs(this.selectedPlaylist);
    };
    mediaLibrary.prototype.playlistExist = function (name) {
        for (var _i = 0, _a = this.playListname; _i < _a.length; _i++) {
            var song = _a[_i];
            if (song == name) {
                return true;
            }
        }
        return false;
    };
    mediaLibrary.prototype.showPlayLists = function () {
        for (var _i = 0, _a = this.playListname; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var playlistdiv = document.getElementById("playlistSection");
            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item chng-cursor");
            li.innerText = name_1;
            li.onclick = this.showSongs(name_1);
            playlistdiv.appendChild(li);
        }
    };
    mediaLibrary.prototype.showSongs = function (playList) {
        var _this = this;
        return function () {
            document.getElementById("songsSection").innerHTML = "";
            var songdiv = document.getElementById("songsSection");
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute('class', 'card');
            var interDiv = document.createElement('div');
            interDiv.setAttribute('class', 'card-header font-weight-bolder');
            var interSpan = document.createElement('span');
            var spanI = document.createElement('i');
            spanI.setAttribute('class', 'far fa-plus-square');
            spanI.setAttribute('data-toggle', 'modal');
            spanI.setAttribute('data-target', '#addSong');
            interSpan.appendChild(spanI);
            interDiv.innerHTML = "Songs of " + playList;
            interDiv.append(interSpan);
            var ul = document.createElement('ul');
            ul.setAttribute('class', 'list-group list-group-flush');
            for (var _i = 0, _a = _this.playList; _i < _a.length; _i++) {
                var song = _a[_i];
                if (song.playlist == playList) {
                    var li = document.createElement("li");
                    li.setAttribute("class", "list-group-item chng-cursor");
                    li.innerText = song.songname;
                    li.onclick = _this.getSongDetails(song.songname);
                    ul.appendChild(li);
                }
            }
            mainDiv.append(interDiv, ul);
            songdiv.appendChild(mainDiv);
            _this.selectedPlaylist = playList;
        };
    };
    mediaLibrary.prototype.getSongDetails = function (songInp) {
        var _this = this;
        return function () {
            for (var _i = 0, _a = _this.playList; _i < _a.length; _i++) {
                var song = _a[_i];
                if (song.songname == songInp) {
                    document.getElementById("SongDetailed").innerHTML = "";
                    var SongDetailed = document.getElementById("SongDetailed");
                    var songDetdiv = document.createElement('div');
                    songDetdiv.setAttribute('class', 'card');
                    var h5 = document.createElement('h5');
                    h5.setAttribute('class', 'card-header');
                    h5.innerText = 'Song Details';
                    var cardBody = document.createElement('div');
                    cardBody.setAttribute('class', 'card-body');
                    var h5cardBody = document.createElement('h5');
                    h5cardBody.setAttribute('class', 'card-title');
                    h5cardBody.innerText = song.songname;
                    h5cardBody.id = 'selectedSong';
                    var audioCardBody = document.createElement('audio');
                    audioCardBody.controls = true;
                    audioCardBody.id = 'audioPlayer';
                    var audioSource = document.createElement('source');
                    audioSource.src = song.songURL;
                    audioSource.type = 'audio/mpeg';
                    audioCardBody.appendChild(audioSource);
                    var pcardBody = document.createElement('p');
                    pcardBody.setAttribute('class', 'card-text');
                    var ratAvg = (song.rating.reduce(function (a, b) { return a + b; }, 0)) / song.rating.length;
                    pcardBody.innerText = "Singer of this song is \"" + song.author + "\" and rating provided by users is \"" + Math.round(ratAvg) + "\"";
                    cardBody.append(h5cardBody, audioCardBody, pcardBody);
                    songDetdiv.append(h5, cardBody);
                    SongDetailed.appendChild(songDetdiv);
                    document.getElementById('rateCounter').style.display = 'block';
                    break;
                }
            }
        };
    };
    mediaLibrary.prototype.searchPlaylist = function (playList) {
        for (var _i = 0, _a = this.playList; _i < _a.length; _i++) {
            var song = _a[_i];
            if (song.playlist == playList) {
                console.log(song.playlist);
                break;
            }
        }
    };
    mediaLibrary.prototype.searchSongs = function (songinput) {
        for (var _i = 0, _a = this.playList; _i < _a.length; _i++) {
            var song = _a[_i];
            if (song.playlist == songinput) {
                console.log(song.playlist);
                break;
            }
        }
    };
    return mediaLibrary;
}());
var media = new mediaLibrary();
