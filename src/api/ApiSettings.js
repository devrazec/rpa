import axios from "axios";

async function getSettings() {
    try {
        return await axios.get(
            `http://localhost:3001/settings`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postSettings(data) {
    try {
        return await axios.post(
            `http://localhost:3001/settings`, data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function patchtHookSettingsVisible(hookSettingsVisible) {
    try {
        return await axios.patch(
            `http://localhost:3001/settings`, {
            hookSettingsVisible
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getSettings,
    postSettings,
    patchtHookSettingsVisible
};