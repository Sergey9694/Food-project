const postData = async (url, data) => {
    //Внутри делаем запрос и сразу же можем обработать те данные которые пришли
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

// Функция получения данных из меню из сервера (db.json) 
const getResource = async (url) => {
    const res = await fetch(url);

    // Если в запросе что-то пошло не так, то я выкину ошибку. Если выкинуть ошибку в ручном режиме то сработает блок кода .catch()
    if (!res.ok) {
        // Объект ошибки
        throw new Error(`Coold not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {
    postData
};

export {
    getResource
};