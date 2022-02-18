//  Реалізувати друкарську машинку.
//          У вас є текст "Hello World".
//          Ваша функція має друкувати цей текст по 1 символу в браузері.
//          КОЖНА нова буква має бути з РАНДОМНОЮ затримкою від 0.1 до 1 секунди.
//          Цим самим ви маєте симулювати написання даного тексту юзером.
//          Приклад: "Hello"
//  Затримки:
//  H (затримка 0.6)
//  e (затримка 0.1)
//  l (затримка 0.3)
//  l (затримка 0.7)
//  о (затримка 1)

const form = document.getElementsByTagName("form")[0];

form.onsubmit = function (event) {
    event.preventDefault();

    const h1 = document.getElementsByTagName("h1")[0];
    let hW = document.getElementsByTagName("input")[0].value;

    async function async() {
        try {
            for (let i = 0; i < hW.length; i++) {
                function letter0(hw = hW[i]) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (hw) {
                                (hw === " ") ? h1.innerHTML += "<i>&nbsp;</i>" : h1.innerText += hw;
                                return resolve(hw);
                            } else return reject('Щось не так');
                        }, Math.ceil(Math.random() * (100 - 99) + 99));
                    });
                }

                await letter0();
            }
        } catch (e) {
            console.error(e);
        }
    }

    async();
};