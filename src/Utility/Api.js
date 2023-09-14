
const apiUrl = 'https://animator-swsknjcjbq-uc.a.run.app/'
// check if app is development or production
// const apiUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:80' : 'https://animator-swsknjcjbq-uc.a.run.app'

export const wake_up_backend = async (data, callBack, finalCallBack = null) => {
    try {
        const response = await fetch(`${apiUrl}`, 
        {
            method: 'GET'
        });
        callBack(response);
    
        } catch (error) {
        console.error(error);
    } finally {
        if(finalCallBack !== null){
            finalCallBack()
        }
    }
}


export const intial_animation = async (data, callBack, errorCallBack, finalCallBack = null) => {
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
        errorCallBack()
    } finally {
        if(finalCallBack !== null){
            finalCallBack()
        }
    }
}

export const animate_character = async (data, callBack, errorCallBack, finalCallBack = null) => {
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
        errorCallBack();
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

export const generate_spritesheets = async (data) => {
    try {
        const response = await fetch(`${apiUrl}/generate_spritesheets`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`API Error: ${error.message}`);
    }
};
