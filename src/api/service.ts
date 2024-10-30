export const fetchData = async <T>(url: string):Promise<T> =>{
    try {
        const fetchResponse = await fetch(url);
        if (!fetchResponse.ok) {
            throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        const response = await fetchResponse.json();   
        return response as T;
    }   
    catch(err) {
        throw new Error('Response was not ok: ' + err);
    }
}