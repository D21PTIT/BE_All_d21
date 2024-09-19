import { Song } from "../model/SongModel.js";
import { Artist } from "../model/artistModel.js"


export const getAllArtis =async(req, res)=>{
    try{
        const a = await Artist.find();
        res.status(200).json(a);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error: error.message });
    }
}

export const CreateSong =async(req, res)=>{
    try{
        const {name,artist,release}= req.body;
        const song = new Song({name,artist,release});
        console.log(song);
        await song.save();

        const ar = await Artist.findById(artist);
        ar.songs.push(song);
        await ar.save();
        console.log(ar);
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error: error.message });
    }
}

export const createArtist =async(req, res)=>{
    try{
        const {name, birth, sex} = req.body;
        const artist = new Artist({name, birth, sex, songs:[]})
        await artist.save()
        console.log(artist)
        res.status(200).json(artist);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error: error.message });
    }
}



