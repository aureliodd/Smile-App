export function PostData(photo,info) {
console.log(url, info)
    fetch('https://website/endpoint/', {
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
}
