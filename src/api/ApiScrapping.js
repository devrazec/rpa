import axios from "axios";

async function getSource(data) {
    try {
        return await axios.get(
            `http://localhost:3003/get_source_` + data
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
                data: data,
            }
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postScrappingData(source, data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_scrapping_` + source, {
            params: {
                data: data,
            }           
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getFormatScrappingData(data) {
    try {
        return await axios.get(
            `http://localhost:3003/get_format_` + data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getCleanScrappingData(data) {
    try {
        return await axios.get(
            `http://localhost:3003/get_clean_` + data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getSource,
    postSource,
    postScrappingData,
    getFormatScrappingData,
    getCleanScrappingData,
};