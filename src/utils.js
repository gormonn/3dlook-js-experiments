import imageToBase64 from 'image-to-base64';
const cwd = process.cwd();

export async function createModel(Class, ...props){
    try{
        const model = new Class(...props)
        await model.init();
        return model
    }catch(e){
        console.error(e)
    }
}

class Model{
    constructor(height, weight, data = []){
        // console.log('model', height, data)
        this.height = height;
        this.weight = weight;
        this.data = data;
        return this;
    }

    async init(){
        try{
            if(this.data.length === 2){
                this.frontImage = await this.getImage(this.data[0])
                this.sideImage = await this.getImage(this.data[1])
                return this;
            }
            console.error('init error:', this.data)
        }catch(e){
            console.error('init error:', this.data, e)
        }
    }

    async getImage(path){
        try{
            return await imageToBase64(`${cwd}/dist/${path}`)
                .then(response => response)
                .catch(error => console.log('imageToBase64 Error:', error))
        }catch(e){
            console.error('getImage Error:', e)
        }
    }
}

export class Male extends Model{
    constructor(){
        super(...arguments)
        this.gender = 'male'
    }
}
export class Female extends Model{
    constructor(){
        super(...arguments)
        this.gender = 'female'
    }
}
