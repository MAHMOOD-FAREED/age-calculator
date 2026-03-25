let userDay = document.getElementsByClassName('day');
let userMonth = document.getElementsByClassName('month');
let userYear = document.getElementsByClassName('year');
let submitBtn = document.getElementById('submitBtn');

let form = document.getElementById("myForm")
// Get error message elements
let dayError = document.querySelector('.day-error');
let monthError = document.querySelector('.month-error');
let yearError = document.querySelector('.year-error');

// Clear all errors
function clearErrors() {
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
    
    if (userDay[0]) userDay[0].classList.remove('error');
    if (userMonth[0]) userMonth[0].classList.remove('error');
    if (userYear[0]) userYear[0].classList.remove('error');
}

// Get days in a month
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Validate inputs
function validateInputs(day, month, year) {
    let isValid = true;
    let currentDate = new Date();
    
    // Validate Day - check if the input field is empty first
    if (!userDay[0] || userDay[0].value === "") {
        dayError.textContent = "This field is required";
        if (userDay[0]) userDay[0].classList.add('error');
        isValid = false;
    } else if (isNaN(day) || day === "") {
        dayError.textContent = "Must be a valid day";
        if (userDay[0]) userDay[0].classList.add('error');
        isValid = false;
    } else if (day < 1 || day > 31) {
        dayError.textContent = "Must be a valid day (1-31)";
        if (userDay[0]) userDay[0].classList.add('error');
        isValid = false;
    }
    
    // Validate Month
    if (!userMonth[0] || userMonth[0].value === "") {
        monthError.textContent = "This field is required";
        if (userMonth[0]) userMonth[0].classList.add('error');
        isValid = false;
    } else if (isNaN(month) || month === "") {
        monthError.textContent = "Must be a valid month";
        if (userMonth[0]) userMonth[0].classList.add('error');
        isValid = false;
    } else if (month < 1 || month > 12) {
        monthError.textContent = "Must be a valid month (1-12)";
        if (userMonth[0]) userMonth[0].classList.add('error');
        isValid = false;
    }
    
    // Validate Year
    if (!userYear[0] || userYear[0].value === "") {
        yearError.textContent = "This field is required";
        if (userYear[0]) userYear[0].classList.add('error');
        isValid = false;
    } else if (isNaN(year) || year === "") {
        yearError.textContent = "Must be a valid year";
        if (userYear[0]) userYear[0].classList.add('error');
        isValid = false;
    } else if (year > currentDate.getFullYear()) {
        yearError.textContent = "Must be in the past";
        if (userYear[0]) userYear[0].classList.add('error');
        isValid = false;
    } else if (year < 1000 || year > 9999) {
        yearError.textContent = "Must be a valid year";
        if (userYear[0]) userYear[0].classList.add('error');
        isValid = false;
    }
    
    // Validate date exists (e.g., no Feb 30)
    if (isValid && month >= 1 && month <= 12 && day >= 1) {
        let daysInMonth = getDaysInMonth(month, year);
        if (day > daysInMonth) {
            dayError.textContent = `Must be a valid day (${month}/${year} has ${daysInMonth} days)`;
            if (userDay[0]) userDay[0].classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Add event listener to the form
form.addEventListener('submit', function(e) {
    // e.preventDefault();
    calculateAge();
});

// Also add click event to the button directly in case form submit doesn't work
if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        calculateAge();
    });
}

function calculateAge() {
    clearErrors();
    
    // Check if elements exist
    if (!userDay[0] || !userMonth[0] || !userYear[0]) {
        console.error("Input elements not found");
        return;
    }
    
    let birthDay = parseInt(userDay[0].value);
    let birthMonth = parseInt(userMonth[0].value);
    let birthYear = parseInt(userYear[0].value);
    
    // Validate inputs
    if (!validateInputs(birthDay, birthMonth, birthYear)) {
        // Reset results on error
        const showYear = document.getElementById('showYear');
        const showMonth = document.getElementById('showMonth');
        const showDay = document.getElementById('showDay');
        
        if (showYear) showYear.textContent = '--';
        if (showMonth) showMonth.textContent = '--';
        if (showDay) showDay.textContent = '--';
        return;
    }
    
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    
    let ageYears = currentYear - birthYear;
    let ageMonths = currentMonth - birthMonth;
    let ageDays = currentDay - birthDay;
    
    // Adjust days if negative
    if (ageDays < 0) {
        ageMonths--;
        let daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
        ageDays += daysInPrevMonth;
    }
    
    // Adjust months if negative
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }
    
    // Display results
    const showYear = document.getElementById('showYear');
    const showMonth = document.getElementById('showMonth');
    const showDay = document.getElementById('showDay');
    
    if (showYear) showYear.textContent = ageYears;
    if (showMonth) showMonth.textContent = ageMonths;
    if (showDay) showDay.textContent = ageDays;
}