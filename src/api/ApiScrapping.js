import axios from "axios";

async function postReadDataSource(source) {
    try {
        return await axios.post(
            `http://localhost:3003/post_read_data_source`, {
            params: {
                source: source
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postWriteDataSource(source, data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_write_data_source`, {
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

async function getDataImage() {
    try {
        return await axios.get(
            `http://localhost:3003/get_data_image`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataImage(source, data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_data_image`, {
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

async function getDataUrl() {
    try {
        return await axios.get(
            `http://localhost:3003/get_data_url`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataUrl(source, data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_data_url`, {
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
            `http://localhost:3003/get_clean_data_image`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getCleanDataUrl() {
    try {
        return await axios.get(
            `http://localhost:3003/get_clean_data_url`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getDataCategory() {
    try {
        return await axios.get(
            `http://localhost:3003/get_data_category`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataCategory(data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_data_category`, {
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
            `http://localhost:3003/get_data_subcategory`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postDataSubcategory(data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_data_subcategory`, {
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
    postReadDataSource,
    postWriteDataSource,
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
};