export function PostData(photo,info) {
console.log(photo, info)

    const address = '' //indirizzo a cui inviare i dati

    if(address !== '')
        fetch(address, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
                photo: photo,
                info: info
            })
        })
    
    else
        console.error('settare un indirizzo, per favore')
}
