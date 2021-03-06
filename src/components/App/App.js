import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updateplaylistName = this.updateplaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
    
    this.state = {
      searchResults:  [],
    playlistName: 'My Playlist',
    playListTracks: []
  }
  }

  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return 
    } 
    tracks.push(track);
    this.setState({ playListTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !==track.id )

    this.setState({ playListTracks: tracks })
  }

  updateplaylistName(name) {
    this.setState({ playlistName: name})
  }

  savePlayList() {
    const trackURIs = this.state.playListTracks.map(track => track.uri)
    Spotify.savePlayList(this.state.playlistName, trackURIs).then(() =>{
    this.setState({ playlistName: 'New Playlist', playListTracks: []})})
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({ searchResults: searchResults})
    });
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar 
          onSearch={this.search}  />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        <Playlist 
          playListTracks={this.state.playListTracks} 
          playlistName={this.state.playlistName} 
          onRemove={this.removeTrack}
          onNameChange={this.updateplaylistName}
          onSave={this.savePlayList} />
    </div>
  </div>
</div>
  )}
}

export default App;
