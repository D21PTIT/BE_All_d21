import { Artist } from "../model/artistModel.js";
import { Song } from "../model/SongModel.js";

export const getAllSong =async (req, res)=>{
    try{
        const a = await Song.find();
        res.status(200).json({data: a});
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error: error.message });
    }
}

export const deleteSong =async (req, res)=>{
    try{
        const {songId}= req.params;
        const song = await Song.findByIdAndDelete(req.body.id);
        // //const artist = await Artist.findById(artistId);
        // //artist.songs = artist.songs.filter(s => s.toString() !== songId);
        // //await artist.save();
        console.log(song);
        res.status(200).json();
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error: error.message });
    }
}
export const editSong =async (req, res)=>{
    try{
        console.log(req.params);
        const {name, release} = req.body;   
        const song =await Song.findByIdAndUpdate(req.params.id,{name: name,release: release}, { new: true, runValidators: true })
        res.status(200).json();
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error: error.message });
    }
}

export const createSong =async (req, res)=>{
    try{
        const {name, release}= req.body.data;
        const newSong = new Song ({name: name, release: release});
        await newSong.save();
        res.status(200).json();
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error: error.message });
    }
}


