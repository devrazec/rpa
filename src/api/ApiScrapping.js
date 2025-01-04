import axios from "axios";

async function getSource(source) {
    try {
        return await axios.get(
            `http://localhost:3003/get_source_` + source
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postSource(source, data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_source_` + source, {
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

async function postScrappingDataUrl(source, data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_scrapping_data_url`, {
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

async function getSourceData(source) {
    try {
        return await axios.get(
            `http://localhost:3003/get_source_data_` + source
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postCategoryData(data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_category`, {
            params: {
                data: data,
            }           
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postSubcategoryData(data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_subcategory`, {
            params: {
                data: data,
            }           
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getCategoryData() {
    try {
        return await axios.get(
            `http://localhost:3003/get_category`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getSubcategoryData() {
    try {
        return await axios.get(
            `http://localhost:3003/get_subcategory`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getSource,
    postSource,
    postScrappingDataUrl,
    getCleanDataUrl,
    getCleanDataImage,
    getSourceData,
    postCategoryData,
    postSubcategoryData,
    getCategoryData,
    getSubcategoryData,
};