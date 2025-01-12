import axios from "axios";

const serverIp = process.env.REACT_APP_SERVER_IP;

async function getSettings() {
    try {
        return await axios.get(
            `https://${serverIp}:3001/settings`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postSettings(data) {
    try {
        return await axios.post(
            `https://${serverIp}:3001/settings`, data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function patchtHookSettingsVisible(hookSettingsVisible) {
    try {
        return await axios.patch(
            `https://${serverIp}:3001/settings`, {
            hookSettingsVisible
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function patchtHookSettingsEnable(hookSettingsEnable) {
    try {
        return await axios.patch(
            `https://${serverIp}:3001/settings`, {
            hookSettingsEnable
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getSettings,
    postSettings,
    patchtHookSettingsVisible,
    patchtHookSettingsEnable
};