interface songs {
  songname: string;
  author: string;
  rating: number[];
  playlist: string;
  songURL: string;
  genre: string;
}

type ratingNo = 1 | 2 | 3 | 4 | 5;

class mediaLibrary {
  playList: Array<songs> = [];
  playListname: Array<string> = [];
  selectedPlaylist:string;

  constructor() {
    let songDet = [
      {
        songname: "In The End",
        author: "Linkin Park",
        rating: [2, 5, 4],
        playlist: "English songs",
        songURL:"/music/intheend.mp3",
        genre: "Rock"
      },
      {
        songname: "Spectre",
        author: "Alan Walker",
        rating: [4, 2],
        playlist: "English songs",
        songURL:"/music/spectre.mp3",
        genre: "Rock"
      },
      {
        songname: "Thinking Out Loud",
        author: "Ed Sheeran",
        rating: [3],
        playlist: "English songs",
        songURL:"/music/thinkingoutloud.mp3",
        genre: "Rock"
      },
      {
        songname: "Shape of you",
        author: "Ed Sheeran",
        rating: [3, 2],
        playlist: "English songs latest",
        songURL:"/music/shapeofyou.mp3",
        genre: "Romantic"
      },
      {
        songname: "Bheegi Bheegi",
        author: "Neha Kakkar",
        rating: [4, 1, 5],
        playlist: "Hindi songs",
        songURL:"/music/bheegi bheegi.mp3",
        genre: "Sad"
      },
      {
        songname: "Lamha Lamha",
        author: "Abhijeet Bhattacharya, Sunidhi Chauhan",
        rating: [5, 5, 3],
        playlist: "Hindi songs",
        songURL:"/music/lamha_lamha.mp3",
        genre: "Romantic"
      },
    ];
    for (let det of songDet) {
      this.addSongs(det);
    }
    this.showPlayLists();
  }

  addSongs(list: songs) {
    this.playList.push(list);
    if (!this.playlistExist(list.playlist)) {
      this.playListname.push(list.playlist);
    }
  }

  feedrating(rate){
    var name = document.getElementById('selectedSong').innerText;
    for (let song of this.playList) {
      if (song.songname == name) {
        song.rating.push(rate);
        break;
      }
    }
  }

  addNewPlaylist(){
    let temp = {
        songname: (<HTMLInputElement>document.getElementById('songName')).value,
        author: (<HTMLInputElement>document.getElementById('author')).value,
        rating: [+((<HTMLInputElement>document.getElementById('rating')).value)],
        playlist: (<HTMLInputElement>document.getElementById('playlistName')).value,
        songURL:(<HTMLInputElement>document.getElementById('songUrl')).value,
        genre: (<HTMLInputElement>document.getElementById('genre')).value
    }
    this.addSongs(temp)
    this.showPlayLists();
  }

  addNewSong(){
    let temp = {
        songname: (<HTMLInputElement>document.getElementById('newsongName')).value,
        author: (<HTMLInputElement>document.getElementById('newauthor')).value,
        rating: [+((<HTMLInputElement>document.getElementById('newrating')).value)],
        playlist: this.selectedPlaylist,
        songURL:(<HTMLInputElement>document.getElementById('newsongUrl')).value,
        genre: (<HTMLInputElement>document.getElementById('newgenre')).value
    }
    this.addSongs(temp);
    this.showSongs(this.selectedPlaylist)

  }

  playlistExist(name) {
    for (let song of this.playListname) {
      if (song == name) {
        return true;
      }
    }
    return false;
  }

  showPlayLists() {
    for (let name of this.playListname) {
      let playlistdiv = document.getElementById("playlistSection");
      let li = document.createElement("li");
      li.setAttribute("class", "list-group-item chng-cursor");
      li.innerText = name;
      li.onclick = this.showSongs(name);
      playlistdiv.appendChild(li);
    }
  }

  showSongs(playList): () => void {
    return () => {
      (<HTMLDivElement>document.getElementById("songsSection")).innerHTML = "";
      let songdiv = document.getElementById("songsSection");
      let mainDiv = document.createElement('div');
          mainDiv.setAttribute('class', 'card');

          let interDiv = document.createElement('div');
          interDiv.setAttribute('class', 'card-header font-weight-bolder');

          let interSpan = document.createElement('span');
          let spanI = document.createElement('i');
          spanI.setAttribute('class', 'far fa-plus-square');
          spanI.setAttribute('data-toggle', 'modal')
          spanI.setAttribute('data-target', '#addSong')
          interSpan.appendChild(spanI);

          interDiv.innerHTML = `Songs of ${playList}`;
          interDiv.append(interSpan);

          let ul = document.createElement('ul');
          ul.setAttribute('class', 'list-group list-group-flush')

      for (let song of this.playList) {
        if (song.playlist == playList) {
          let li = document.createElement("li");
          li.setAttribute("class", "list-group-item chng-cursor");
          li.innerText = song.songname;
          li.onclick = this.getSongDetails(song.songname);
          ul.appendChild(li);
        }
      }
      mainDiv.append(interDiv, ul);
      songdiv.appendChild(mainDiv);
      this.selectedPlaylist = playList;
    };
  }

  getSongDetails(songInp): () => void{
    return () =>{
      for (let song of this.playList) {
        if (song.songname == songInp) {
          
          (<HTMLDivElement>document.getElementById("SongDetailed")).innerHTML = "";
          let SongDetailed = document.getElementById("SongDetailed");
          let songDetdiv = document.createElement('div');
          songDetdiv.setAttribute('class', 'card');

          let h5 = document.createElement('h5');
          h5.setAttribute('class', 'card-header');
          h5.innerText = 'Song Details'

          let cardBody = document.createElement('div');
          cardBody.setAttribute('class', 'card-body');

          let h5cardBody = document.createElement('h5');
          h5cardBody.setAttribute('class', 'card-title');
          h5cardBody.innerText = song.songname;
          h5cardBody.id = 'selectedSong'

          let audioCardBody = document.createElement('audio');
          audioCardBody.controls = true;
          audioCardBody.id = 'audioPlayer';

          let audioSource  = document.createElement('source');
          audioSource.src = song.songURL;
          audioSource.type = 'audio/mpeg';
          audioCardBody.appendChild(audioSource);

          let pcardBody = document.createElement('p');
          pcardBody.setAttribute('class', 'card-text');
          let ratAvg = (song.rating.reduce(function(a, b){ return a + b;}, 0))/ song.rating.length;
          pcardBody.innerText = `Singer of this song is "${song.author}" and rating provided by users is "${Math.round(ratAvg)}"`;

          cardBody.append(h5cardBody, audioCardBody, pcardBody);
          songDetdiv.append(h5, cardBody);
          SongDetailed.appendChild(songDetdiv);
          document.getElementById('rateCounter').style.display = 'block';
          break;
        }
      }
    }
  }

  searchPlaylist(playList) {
    for (let song of this.playList) {
      if (song.playlist == playList) {
        console.log(song.playlist);
        break;
      }
    }
  }

  searchSongs(songinput) {
    for (let song of this.playList) {
      if (song.playlist == songinput) {
        console.log(song.playlist);
        break;
      }
    }
  }
}

let media = new mediaLibrary();
