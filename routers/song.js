import express from 'express';
import { createSong, deleteSong, editSong, getAllSong } from '../controllers/songs.js';
import { CreateSong, createArtist, getAllArtis } from '../controllers/artist.js';
import { createUser, handleLogin } from '../controllers/user.js';
import { auth, authorize } from '../middleware/auth.js';
import { createDevice, get10, getAllDevice, getDeviceBySearch } from '../controllers/Device.js';
import { createData, get10Data, getAllData} from '../controllers/rtData.js';
import { addTest, getAllTest, sendMqtt } from '../controllers/TestMQTTApi.js';


const router = express.Router();


//route cho bai hat

router.get('/song',auth,getAllSong)
router.delete('/song/:id',deleteSong)
router.put('/song/:id',editSong)
router.post('/song', createSong)


//Route cho ca si

router.get('/artist',auth,getAllArtis)
router.post('/artist/createsong',CreateSong);
router.post('/artist',createArtist);



//Route cho nguoi dung
router.post('/user/create', createUser);
router.post('/user/login',handleLogin);


//route cho du an IOT
router.post('/iot/createDevice', createDevice);
router.get('/iot/getAllDevice',getAllDevice);
router.get('/iot/get10Device', get10);
router.get('/iot/getDeviceBySearch',getDeviceBySearch )

//route cho data
router.post('/iot/createData', createData);
router.get('/iot/getAllData', getAllData);
router.get('/iot/get10Data', get10Data);



//test
router.post('/test', addTest);
router.get('/test/getall', getAllTest);
router.post('/test/send', sendMqtt);



export default router;



