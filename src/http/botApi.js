import { $host } from ".";

export const sendOrder = async (from, to, phone, name, rate) => {
    const {data} = await $host.get('api/bot', {params: {from, to, phone, name, rate}})
    return data
}

export const sendQuery = async (phone) => {
    const {data} = await $host.get('api/bot/call', {params: {phone}})
    return data
}

export const abstractQuery = async () => {
    const {data} = await $host.get('api/bot/abstract')
    return data
}