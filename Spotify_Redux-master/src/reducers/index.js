export default function (state = {}, action) {
  switch (action.type) {
    case "SELECTED_SONG":
      return {
        ...state,
        selectedSong: action.payload,
      };
    case "LIKED_SONG":
      return {
        ...state,
        likedSong: true,
        listOfLikedSongs: state.listOfLikedSongs.concat(action.payload),
      };
    case "UNLIKED_SONG":
      const songToRemove = state.listOfLikedSongs.findIndex(
        (name) => name === action.payload
      );
      return {
        ...state,
        likedSong: false,
        listOfLikedSongs: [
          ...state.listOfLikedSongs.slice(0, songToRemove),
          ...state.listOfLikedSongs.slice(songToRemove + 1),
        ],
      };
    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_PLAYLIST":
      return {
        ...state,
        playlists: [...state.playlists.concat(action.payload)],
      };
    case "DELETE_PLAYLIST":
      const playlistIndx = state.playlists.findIndex(
        (obj) => obj.name === action.payload
      );
      return{
        ...state,
        playlists: [
          ...state.playlists.slice(0, playlistIndx),
          ...state.playlists.slice(playlistIndx + 1),
        ],
      }
    case "ADD_SONG_TO_PLAYLIST":
      const playlistIndex = state.playlists.findIndex(
        (obj) => obj.name === action.payload.playlistName
      );
      let selectedPlaylist = state.playlists[playlistIndex];
      selectedPlaylist.songs.push(action.payload.songName);
      return {
        ...state,
        playlists: [
          ...state.playlists.slice(0, playlistIndex),
          ...state.playlists.slice(playlistIndex + 1),
          selectedPlaylist,
        ],
      };
    default:
      return state;
  }
}
