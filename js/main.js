// Функция для расчета ежемесячного платежа
function calculatePayment() {
    // Получаем входные значения
    var amount = document.getElementById("amount").value;
    var interest = document.getElementById("interest").value;
    var years = document.getElementById("years").value;
    var ent = document.getElementById("ent").value;

    // Рассчитываем ежемесячную процентную ставку и количество платежей
    var monthlyInterest = interest / 100 / 12;
    var payments = years * 12;
    var payment = payments / 12;

    // Рассчитываем ежемесячный платеж
    var x = Math.pow(1 + monthlyInterest, payments);
    var loanAmount = amount - ent;
    var monthlyPayment = (loanAmount * x * monthlyInterest) / (x - 1);
    var monthlyIncome = (monthlyPayment * 1.7).toFixed(2);

    // Округляем ежемесячный платеж до двух знаков после запятой
    monthlyPayment = monthlyPayment.toFixed(2);

    // Рассчитываем общую сумму платежа
    var totalPayment = (monthlyPayment * payments).toFixed(2);

    // Рассчитаем сумму переплат
    var totalInterest = (totalPayment - loanAmount).toFixed(2);

    ///В ПОГАШЕНИЕ ПРОЦЕНТОВ
    var procents = totalInterest / years;

    ///В ПОГАШЕНГИЕ ДОЛГА
    var debt = ((totalPayment / years) - procents) / payments;

    ////ПЛАТЕЖ
    var paying = (totalPayment / years) / payments;

    ///ОСТАТОК ДОЛГА

    var remaidner = amount - ent;



    // Показываем результаты
    var html = "<div class='tltle_main'>" + "<span class='sum_1'>" + monthlyPayment + "</span>" + "<div class='title'>" + "Ваш ежемесячный платеж" + "</div>" + "</div>";
    html +=
        "<p>Кредит: <span class='sum'>" +
        loanAmount +
        "</span></p>";
    html +=
        "<p>Проценты + кредит: <span class='sum'>" + totalPayment + "</span></p>";
    html += "<p>Проценты: <span class='sum'>" + totalInterest + "</span></p>";
    html += "<p>Необходимый доход: <span class='sum'>" + monthlyIncome + "</span></p>";
    html += "<p class='button-content'>" + "<input type='submit' value='Вывести график платежей' onclick = 'showPaymentSchedule'>" + "</input>";

    // Обновляем раздел результатов
    document.getElementById("results").innerHTML = html;


    //ДОБАВЛЯЕМ В ФУНКЦИЮ ТАБЛИЦЫ
    displayPaymentSchedule(payments, monthlyPayment, loanAmount, payment, procents, debt, paying, remaidner);

}







// Добавляем обработчик события input для слайдера

document.getElementById("amount-slider").addEventListener("input", function () {
    // Получаем текущее значение слайдера
    var sliderValue = document.getElementById("amount-slider").value;

    // Обновляем значение поля ввода "Сумма кредита"
    document.getElementById("amount").value = sliderValue;

    // Пересчитываем платеж при каждом изменении слайдера
    calculatePayment();
});

document.getElementById("second-slider").addEventListener("input", function () {
    // Получаем текущее значение слайдера
    var sliderValue = document.getElementById("second-slider").value;

    // Обновляем значение поля ввода "Срок кредита"
    document.getElementById("years").value = sliderValue;

    // Пересчитываем платеж при каждом изменении слайдера
    calculatePayment();
});

document.getElementById("third-slider").addEventListener("input", function () {
    // Получаем текущее значение слайдера
    var sliderValue = document.getElementById("third-slider").value;

    // Обновляем значение поля ввода "Процентная ставка" с использованием текущего значения слайдера
    document.getElementById("interest").value = sliderValue;

    // Пересчитываем платеж при каждом изменении слайдера
    calculatePayment();
});


document.getElementById("more-slider").addEventListener("input", function () {
    // Получаем текущее значение слайдера
    var sliderValue = document.getElementById("more-slider").value;

    // Обновляем значение поля ввода "Процентная ставка" с использованием текущего значения слайдера
    document.getElementById("ent").value = sliderValue;

    // Пересчитываем платеж при каждом изменении слайдера
    calculatePayment();
});


// Прикрепляем функцию расчета платежа к событию отправки формы
document.getElementById("loan-form").addEventListener("submit", function (e) {
    e.preventDefault();
    calculatePayment();
});



// ГЕНЕРАЦИЯ ТАБЛИЦЫ


function displayPaymentSchedule(payments, monthlyPayment, loanAmount, payment, procents, debt, paying, remaidner) {
    var tableBody = document.getElementById("paymentScheduleBody");
    tableBody.innerHTML = ""; // Clear previous entries

    // 
    for (var i = 1; i <= payments; i++) {
        var newRow = tableBody.insertRow();

        // 
        var cellNumber = newRow.insertCell(0);
        var cellDate = newRow.insertCell(1);
        var cellRemaidner = newRow.insertCell(2);
        var cellRepaymentdebt = newRow.insertCell(3);
        var cellRepaymentprocents = newRow.insertCell(4);
        var cellPaying = newRow.insertCell(5);


        // ДАТА 
        var paymentDate = new Date();
        paymentDate.setMonth(paymentDate.getMonth() + i);

        remaidner -= debt;

        // ЗНАЧЕНИЯ
        cellNumber.textContent = i;
        cellDate.textContent = paymentDate.toLocaleDateString(); // ДАТА ПЛАТЕЖА
        cellRemaidner.textContent = remaidner.toFixed(2); // ОСТАТОК ДОЛГА
        cellRepaymentdebt.textContent = debt.toFixed(2); // В ПОГАШЕНИЕ ДОЛГА
        cellRepaymentprocents.textContent = procents.toFixed(2); // В ПОГАШЕНИЕ ПРОЦЕНТОВ
        cellPaying.textContent = paying.toFixed(2); // ПЛАТЕЖ
    }
}

//ЕСЛИ ПОНАДОБИТСЯ КНОПКА
document.getElementById("showPaymentSchedule").addEventListener("click", function () {



    calculatePayment();
});
