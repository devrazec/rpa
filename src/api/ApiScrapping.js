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

async function postSource(data) {
    try {
        return await axios.post(
            `http://localhost:3003/post_source_`, data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getScrapping(data) {
    try {
        return await axios.get(
            `http://localhost:3003/scrapping_` + data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getFormatJson(data) {
    try {
        return await axios.get(
            `http://localhost:3003/format_json_` + data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getCleanJson(data) {
    try {
        return await axios.get(
            `http://localhost:3003/clean_json_` + data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getSource,
    getScrapping,
    getFormatJson,
    getCleanJson,
};