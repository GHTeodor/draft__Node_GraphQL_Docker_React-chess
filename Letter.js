
//  Реалізувати друкарську машинку.
//          У вас є текст "Hello World".
//          Ваша функція має друкувати цей текст по 1 символу в браузері.
//          КОЖНА нова буква має бути з РАНДОМНОЮ затримкою від 0.1 до 1 секунди.
//          Цим самим ви маєте симулювати написання даного тексту юзером.
//          Приклад: "Hello"
//  Затримки:
//          H (затримка 0.6)
//  e (затримка 0.1)
//  l (затримка 0.3)
//  l (затримка 0.7)
//  о (затримка 1)

let hW = "Привіт світ";

function letter0(hw = hW[0]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter1(hw = hW[1]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter2(hw = hW[2]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter3(hw = hW[3]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter4(hw = hW[4]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter5(hw = hW[5]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter6(hw = hW[6]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter7(hw = hW[7]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter8(hw = hW[8]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter9(hw = hW[9]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

function letter10(hw = hW[10]) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hw) {
                document.write(hw);
                return resolve(hw);
            } else {
                return reject('Щось не так');
            }
        }, Math.ceil(Math.random() * (1000 - 99) + 99));
    });
}

async function async(){
    try {
        let async0 = await letter0();
        let async1 = await letter1();
        let async2 = await letter2();
        let async3 = await letter3();
        let async4 = await letter4();
        let async5 = await letter5();
        let async6 = await letter6();
        let async7 = await letter7();
        let async8 = await letter8();
        let async9 = await letter9();
        let async10 = await letter10();

    } catch (e) {
        console.error(e);
    }
}
async();