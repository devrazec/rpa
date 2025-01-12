import axios from "axios";

const serverIp = process.env.REACT_APP_SERVER_IP;

async function getDataSource() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_data_source`
            ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataSource(data) {
    try {
        return await axios.post(
            `https://${serverIp}:3002/post_data_source`, {
            params: {                
                data: data,
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getDataImage() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_data_image`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataImage(data) {
    try {
        return await axios.post(
            `https://${serverIp}:3002/post_data_image`, {
            params: {                
                data: data,
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getDataUrl() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_data_url`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataUrl(source, data) {
    try {
        return await axios.post(
            `https://${serverIp}:3002/post_data_url`, {
            params: {
                source: source,
                data: data,
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getCleanDataImage() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_clean_data_image`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getCleanDataUrl() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_clean_data_url`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getDataCategory() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_data_category`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataCategory(data) {
    try {
        return await axios.post(
            `https://${serverIp}:3002/post_data_category`, {
            params: {
                data: data,
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getDataSubcategory() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_data_subcategory`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataSubcategory(data) {
    try {
        return await axios.post(
            `https://${serverIp}:3002/post_data_subcategory`, {
            params: {
                data: data,
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getDataWebsite() {
    try {
        return await axios.get(
            `https://${serverIp}:3002/get_data_website`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataWebsite(data) {
    try {
        return await axios.post(
            `https://${serverIp}:3002/post_data_website`, {
            params: {
                data: data,
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getDataSource,
    postDataSource,
    getDataUrl,
    postDataUrl,
    getDataImage,
    postDataImage,
    getCleanDataUrl,
    getCleanDataImage,
    postDataCategory,
    getDataCategory,
    getDataSubcategory,
    postDataSubcategory,
    getDataWebsite,
    postDataWebsite,
};