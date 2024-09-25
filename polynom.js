
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

function sqrt_polynom() {
    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let arg_a = document.querySelector("#arg_a").value;
    let arg_b = document.querySelector("#arg_b").value;
    let arg_c = document.querySelector("#arg_c").value;

    arg_a = toPoint(arg_a);
    arg_b = toPoint(arg_b);
    arg_c = toPoint(arg_c);

    if (precision === "") {
        precision = 0;
    }

    if (isNaN(arg_a) || isNaN(arg_b) || isNaN(arg_c) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Ошибка ввода. Введено не число или несколько чисел.";
        return;
    }
    if (arg_a === "" || arg_b === "" || arg_c === "") {
        document.querySelector(".name1").innerHTML = "Ничего не введено. Попробуйте использовать числа";
        return;
    }

    if (arg_a * arg_c < 0) {
        document.querySelector(".name1").innerHTML = "Очень жаль. Взятие корня у этого многочлена невозможно.";
        return;
    }

    if (Math.abs(arg_a) > 1e308 || Math.abs(arg_b) > 1e308 || Math.abs(arg_c) > 1e308) {
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

    if (Math.abs(arg_a) < 1e-100 && Math.abs(arg_a) != 0 || Math.abs(arg_b) < 1e-100 && Math.abs(arg_b) != 0 || Math.abs(arg_c) < 1e-100 && Math.abs(arg_c) != 0) {
        document.querySelector(".name1").innerHTML = "Ошибка. Модуль введённого числа меньше чем 1e-100. Пожалуйста, введите число, чей модуль больше чем 1e-100 либо 0.";
        return;
    }

    if (arg_a == 0 && arg_c == 0 && arg_b != 0) {
        if (arg_b < 0) {
            s = ((-arg_b == 1) ? "" : Math.sqrt(-arg_b)) + "ix^0.5";
        }
        else {
            s = ((arg_b == 1) ? "" : Math.sqrt(arg_b)) + "x^0.5";
        }

        if (!arithm) {
            s = s + " и -" + s;
        }

        document.querySelector(".name1").innerHTML = ((arithm) ? "Арифметический " : "Алгебраический ") + "квадратный корень из многочлена " + ((Math.abs(arg_b) == 1) ? ((arg_b < 0) ? "-" : "") : arg_b) + "x равен " + s + ".\nТочность округления " + precision + " знаков после запятой.";
        return;
    }

    kompl = false;

    if (arg_a < 0) {
        if (arithm) {
            document.querySelector(".name1").innerHTML = "Очень жаль. Взятие корня у этого многочлена невозможно.";
            return;
        }
        kompl = true;
        arg_a = -arg_a;
        arg_b = -arg_b;
        arg_c = -arg_c;
    }

    k1 = Math.sqrt(arg_a);
    k2 = Math.sqrt(arg_c);

    

    if (4 * arg_a * arg_c != arg_b * arg_b) {
        document.querySelector(".name1").innerHTML = "Очень жаль. Взятие корня у этого многочлена невозможно.";
        return;
    }

    if (k1 == 0 && k2 == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "Арифметический " : "Алгебраический ") + "квадратный корень из многочлена 0 равен 0" + "\nТочность округления " + precision + " знаков после запятой.";
        return;
    }

    neg = false;

    if (arg_b < 0) {
        neg = true;
    }

    if (k2 == 0) {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x";
    }
    else if (k1 == 0) {
        s = ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)))
    }
    else {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x " + ((neg) ? "- " : "+ ") + ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)));
    }

    if (kompl || !arithm) {
        s = "(" + s + ")";
        if (kompl) {
            s += "i";
        } 
        if (!arithm) {
            s = s + " и -" + s;
        }
    }

    document.querySelector(".name1").innerHTML = ((arithm) ? "Арифметический " : "Алгебраический ") + "квадратный корень из многочлена " + ((kompl) ? "-" : "") +"(" + ((arg_a == 0) ? "" : ((arg_a == 1) ? "" : arg_a) + "x^2") + ((arg_b == 0) ? "" : ((arg_b > 0) ? " + " : " - ") + ((Math.abs(arg_b) == 1) ? "" : Math.abs(arg_b)) + "x") + ((arg_c == 0) ? "" : ((arg_a == 0 && arg_b == 0) ? "" : " + ") + arg_c) + ") равен " + s + ".\nТочность округления " + precision + " знаков после запятой.";
}