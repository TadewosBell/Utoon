
const apiUrl = 'http://127.0.0.1:5000'

export const upload_image = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/upload_image`, 
        {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        callBack(json);
    
        } catch (error) {
        console.error(error);
    } finally {
        if(finalCallBack !== null){
            finalCallBack()
        }
    }
}