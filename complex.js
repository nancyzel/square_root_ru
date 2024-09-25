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

function sqrt_complex() {
    let precision = document.querySelector("#precision").value;
    let real_num = document.querySelector("#real_num").value;
    let imagine_num = document.querySelector("#imagine_num").value;

    real_num = toPoint(real_num);
    imagine_num = toPoint(imagine_num);

    if (precision === "") {
        precision = 0;
    }

    if (isNaN(real_num) || isNaN(imagine_num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Ошибка ввода. Введено не число или несколько чисел.";
        return;
    }
    if (real_num === "" || imagine_num === "") {
        document.querySelector(".name1").innerHTML = "Ничего не введено. Попробуйте использовать числа";
        return;
    }
    if (imagine_num == 0) {
        document.querySelector(".name1").innerHTML = "Ноль в мнимой части.\nПредлагаю ввести тоже самое на страничке для действительных чисел.";
        return;
    }

    if (Math.abs(real_num) > 1e308 || Math.abs(imagine_num) > 1e308) {
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

    if (Math.abs(real_num) < 1e-100 && Math.abs(real_num) != 0 || Math.abs(imagine_num) < 1e-100 && Math.abs(imagine_num) != 0) {
        document.querySelector(".name1").innerHTML = "Ошибка. Модуль введённого числа меньше чем 1e-100. Пожалуйста, введите число, чей модуль больше чем 1e-100 либо 0.";
        return;
    }

    arg1 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2))) / 2 + real_num / 2);
    arg2 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2)) - real_num) / 2) * (imagine_num / Math.abs(imagine_num));

    let s = ((arg1 == arg1.toFixed(precision)) ? arg1 : round(arg1.toFixed(precision))) + ((arg2 > 0) ? " + " : " - ") + ((Math.abs(arg2) == 1) ? "" : ((Math.abs(arg2) == Math.abs(arg2).toFixed(precision)) ? Math.abs(arg2) : round(Math.abs(arg2).toFixed(precision)))) + "i";

    s = "(" + s + ") и -(" + s + ")";

    document.querySelector(".name1").innerHTML = "Квадратный корень из числа (" + ((real_num != 0) ? real_num + ((imagine_num > 0) ? " + " : " - ") : ((imagine_num > 0) ? "" : "-")) + ((Math.abs(imagine_num) == 1) ? "" : Math.abs(imagine_num)) + "i) равен " + s + ".\nТочность округления " + precision + " знаков после запятой.";
}