
const apiUrl = 'http://127.0.0.1:80'

export const intial_animation = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/intial_animation`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

export const animate_character = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/animate_character`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

export const get_bounding_box = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/get_bounding_box`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

export const set_bounding_box = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/set_bounding_box`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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


export const set_mask = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/set_mask`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

export const get_skeleton = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/get_skeleton`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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
export const set_skeleton = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/set_skeleton`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

export const final_render = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}/set_background`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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