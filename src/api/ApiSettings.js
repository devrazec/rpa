import axios from "axios";

let PROTOCOL = '';

const FRONTEND_HTTPS = process.env.REACT_APP_FRONTEND_HTTPS;

if(FRONTEND_HTTPS === 'true') {
    PROTOCOL = 'https://'
} else {
    PROTOCOL = 'http://';
}
const FRONTEND_IP = process.env.REACT_APP_FRONTEND_IP;
const FRONTEND_SETTINGS_PORT = process.env.REACT_APP_FRONTEND_SETTINGS_PORT;

async function getSettings() {
    try {
        return await axios.get(
            `${PROTOCOL}${FRONTEND_IP}:${FRONTEND_SETTINGS_PORT}/settings`
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function postSettings(data) {
    try {
        return await axios.post(
            `${PROTOCOL}${FRONTEND_IP}:${FRONTEND_SETTINGS_PORT}/settings`, data
        ).then((response) => response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function patchtHookSettingsVisible(hookSettingsVisible) {
    try {
        return await axios.patch(
            `${PROTOCOL}${FRONTEND_IP}:${FRONTEND_SETTINGS_PORT}/settings`, {
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
            `${PROTOCOL}${FRONTEND_IP}:${FRONTEND_SETTINGS_PORT}/settings`, {
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