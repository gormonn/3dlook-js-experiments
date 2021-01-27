// require('dotenv').config();
import SAIA from '@3dlook/saia-sdk';
import { createModel, Male, Female } from './utils'
import femaleFront from './body/female-front.jpg'
import femaleSide from './body/female-side.jpg'
import maleFront from './body/male-front.jpg'
import maleSide from './body/male-side.jpg'

// console.log(new Female(), new Male())

start()

async function start(){
    try{
        // const model = await createModel(Female, 160, 65, [ femaleFront, femaleSide ])
        const model = await createModel(Male, 175, 70, [ maleFront, maleSide ])
        // const model = await createModel(Male, 175, 220, [ fatMaleFront, fatMaleSide ]) // error
        // const model = await createModel(Female, 164, 79, [uFront, uSide])
        // const {height, frontImage, sideImage} = female
        // console.log(model);  process.exit()
        make3D(model)
    }catch(e){
        console.error(e)
    }
}

function make3D(model){
    const saia = new SAIA({
        key: process.env.API_KEY,
    });

    const {
        gender,
        height,
        weight,
        frontImage,
        sideImage
    } = model;
    
    saia.api.person.create({
        gender,
        height,
        weight,
        frontImage,
        sideImage
    })
        .then((taskSetId) => saia.api.queue.getResults(taskSetId))
        .then(results => console.log(results))
        .catch(err => console.error(err));
}
// console.log(process.cwd())

// const frontImage, sideImage;
