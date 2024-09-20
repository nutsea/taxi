// import { $host } from ".";

// export const sendOrder = async (from, to, phone, name, rate) => {
//     const {data} = await $host.get('taxi/bot', {params: {from, to, phone, name, rate}})
//     return data
// }

// export const sendQuery = async (phone) => {
//     const {data} = await $host.get('taxi/bot/call', {params: {phone}})
//     return data
// }

export const sendOrder = async (from, to, phone, name, rate) => {
    const response = await fetch('https://api.telegram.org/bot6300036683:AAHH5iFy9GlOqSZV3A7z37e_uAyPBho9p44/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: '953061764', // ID чата, куда отправляешь сообщение
            text: `ЗАКАЗ\nИмя: ${name}\nНомер: +${phone}\nОткуда: ${from}\nКуда: ${to}\nТариф: ${rate}`
        }),
    })

    if (!response.ok) {
        throw new Error('Ошибка при отправке сообщения в бота')
    }

    const data = await response.json()
    return data
}

export const sendQuery = async (phone) => {
    const response = await fetch('https://api.telegram.org/bot6300036683:AAHH5iFy9GlOqSZV3A7z37e_uAyPBho9p44/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: '953061764',
            text: `ЗАЯВКА НА ЗВОНОК\nНомер: +${phone}`
        }),
    })

    if (!response.ok) {
        throw new Error('Ошибка при отправке запроса в бота')
    }

    const data = await response.json()
    return data
}
