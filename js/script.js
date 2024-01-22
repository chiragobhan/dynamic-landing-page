// Get all DOM elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    settingsIcon = document.getElementById('settings-icon');

let displayAmPm = document.getElementById('displayAmPm'),
    display12hr = document.getElementById('display12hr'),
    toggleSwitch = document.getElementsByClassName('switch');

// Toggle Am/Pm display
displayAmPm.addEventListener('change', function () {
    displayAmPm = displayAmPm.checked ? displayAmPm : !displayAmPm;
})

// Toggle 12hr clock display
display12hr.addEventListener('change', function () {
    display12hr = display12hr.checked ? display12hr : !display12hr;
})

// Toggle settings menu
settingsIcon.addEventListener('click', function () {
    for (var i = 0; i < toggleSwitch.length; i += 1) {
        toggleSwitch[i].style.display === 'none' ? toggleSwitch[i].style.display = 'inline-block' : toggleSwitch[i].style.display = 'none';
    }
})


// Add zero to single digit minutes and seconds
function putZero(timeValue) {
    return (parseInt(timeValue, 10) < 10 ? '0' : '') + timeValue;
}

// Function to display time
function displayTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Assign AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // Logic for 12hr format
    hour = hour % 12 || 12;

    // Time output
    time.innerHTML = `${display12hr ? hour : new Date().getHours()}<span>:</span>${putZero(min)}<span>:</span>${putZero(sec)} ${displayAmPm ? amPm : ''}`;

    setTimeout(displayTime, 1000);
}

// Set background image and greeting text
function setBackgroundAndGreeting() {
    let today = new Date(),
        hour = today.getHours();

    if (hour > 4 && hour < 12) {
        //Morning
        document.body.style.backgroundImage = "url('./img/morning.jpg')";
        greeting.textContent = 'Good Morning,';
    } else if (hour >= 12 && hour <= 17) {
        //Afternoon
        document.body.style.backgroundImage = "url('./img/afternoon.jpg')";
        greeting.textContent = 'Good Afternoon,';
    } else {
        //Evening
        document.body.style.color = 'white';
        settingsIcon.src = "img/setting-lines-white.png";
        document.body.style.backgroundImage = "url('./img/night.jpg')";
        greeting.textContent = 'Good Evening,';
    }
}

// Get local storage data
function getLocalData(...fieldNames) {
    fieldNames.forEach(fieldName => {
        if (localStorage.getItem(`${fieldName == name ? 'name' : 'focus'}`) === null) {
            fieldName.textContent = `[Your ${fieldName == name ? 'Name' : 'Focus'}]`;
        } else {
            fieldName.textContent = localStorage.getItem(`${fieldName == name ? 'name' : 'focus'}`);
        }
    });
}

// Set local storage data
function setLocalData(fieldName) {
    localStorage.setItem(`${fieldName == name ? 'name' : 'focus'}`, this.event.target.innerText);
    if (this.event.type === 'keypress') {
        if (this.event.keyCode == 13) {
            localStorage.setItem(`${fieldName == name ? 'name' : 'focus'}`, this.event.target.innerText);
            fieldName.blur();
        }
    }
}

// Add listeners to set data
function addListenersToSetData(...fields) {
    fields.forEach(field => {
        field.addEventListener('keypress', function () { setLocalData(field) });
        field.addEventListener('blur', function () { setLocalData(field) });
    });
}

// Execute all functions and pass parameters
setBackgroundAndGreeting();
displayTime();
getLocalData(name, focus);
addListenersToSetData(name, focus);