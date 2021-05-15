import { Image } from 'react-native'

export function PostData(photouri,info) {
// console.log(photo, info)

let photo = { uri: photouri}
let formdata = new FormData();

formdata.append({uri: photo.uri, name: 'image.jpg', type: 'image/jpeg'})

console.log(formdata)

//SERVE UN FILEPICKER??

    const address = '127.0.0.1'

    if(address !== '')
        fetch(address, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
                // photo: photouri,
                // info: info
                formdata
            })
        })
    
    else
        console.error('settare un indirizzo, per favore')
}
