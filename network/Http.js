import { Alert } from "react-native"

export async function PostData(photouri, photoResultName, photoGravity, info, phoneNumber, email) {

    const address = 'https://smile-app-backend.herokuapp.com/photos'

    // let bodyData = new FormData();
    // bodyData.append('photo', {
    //     uri: Platform.OS === 'ios' ? photouri.replace('file://', '') : photouri,
    //     name: 'photo.png',
    //     filename: 'imageName.png',
    //     type: 'image/png' });

    let response = await fetch(address, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // photo: photouri,
            moreInfo: info,
            resultName: photoResultName,
            resultGravity: photoGravity,
            phoneNumber: phoneNumber,
            email: email,
        })
        // body: JSON.stringify(bodyData)
    })

    try{
        return response.json()
    } catch (e) {
        Alert.alert('Qualcosa è andato storto.')
    }
}
