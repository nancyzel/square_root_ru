function round(str) {
    ind = str.length;
    while (str[ind - 1] == '0') ind--;
    if (str[ind - 1] == '.') return str.substring(0, ind - 1);
    return str.substring(0, ind);
}

function toPoint(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ",") {
            return str.substring(0, i) + "." + str.substring(i + 1);
        }
    }
    return str;
}

function sqrt_real() {
    
    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let num = document.querySelector("#data").value;

    num = toPoint(num);

    if (String(num).slice(-2) === "pi") {
        num = String(num).slice(0, -2);
        if (num == "") {
            num = Math.PI;
        }
        else if (num == "-") {
            num = -Math.PI;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "Ошибка ввода. Введено не число или несколько чисел.";
            return;
        }
        else {
            num = num * Math.PI;
        }
    }
    if (String(num).slice(-1) === "e") {
        num = String(num).slice(0, -1);
        if (num == "") {
            num = Math.E;
        }
        else if (num == "-") {
            num = -Math.E;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "Ошибка ввода. Введено не число или несколько чисел.";
            return;
        }
        else {
            num = num * Math.E;
        }
    }

    if (precision === "") {
        precision = 0;
    }

    if (isNaN(num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Ошибка ввода. Введено не число или несколько чисел.";
        return;
    }
    if (num === "") {
        document.querySelector(".name1").innerHTML = "Ничего не введено. Попробуйте использовать числа";
        return;
    }
    if (num == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "Арифметический " : "Алгебраический ") + "квадратный корень из числа 0 равен 0.\nТочность округления " + precision + " знаков после запятой.";
        return;
    }

    if (Math.abs(num) > 1e308) {
        document.querySelector(".name1").innerHTML = "Введено слишком большое число. Пожалуйста, введите число, чей модуль меньше 1e308.";
        return;
    }

    if (precision != Math.floor(precision)) {
        document.querySelector(".name1").innerHTML = "Введена нецелая точность. Пожалуйста, введите целое число.";
        return;
    }

    if (precision < 0) {
        document.querySelector(".name1").innerHTML = "Введена отрицательная точность. Введите пожалуйста число от 0 до 50.";
        return;
    }

    if (precision > 50) {
        document.querySelector(".name1").innerHTML = "Введена слишком большая точность. Введите пожалуйста число от 0 до 50.";
        return;
    }

    if (Math.abs(num) < 1e-100 && Math.abs(num) != 0) {
        document.querySelector(".name1").innerHTML = "Ошибка. Модуль введённого числа меньше чем 1e-100. Пожалуйста, введите число, чей модуль больше чем 1e-100 либо 0.";
        return;
    }
    
    let neg = false;

    if (num < 0) {
        if (arithm) {
            document.querySelector(".name1").innerHTML = "Решений в действительных числах нет";
            return;
        }
        neg = true;
        num = - num;
    }

    sqr = Math.sqrt(num);
    let s = (sqr == sqr.toFixed(precision)) ? sqr : round(sqr.toFixed(precision));

    if (neg) {
        if (sqr == 1) s = "i";
        else s += "i";
    }

    if (!arithm) {
        s = s + " и -" + s;
    }

    s += "."

    document.querySelector(".name1").innerHTML = ((arithm) ? "Арифметический " : "Алгебраический ") + "квадратный корень из числа " + ((neg) ? "-" : "") + num + " равен " + s + "\nТочность округления " + precision + " знаков после запятой.";
    
}