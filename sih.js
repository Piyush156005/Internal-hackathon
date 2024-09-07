var icon = document.getElementById("icon");

icon.onclick = function() {
    // Add the rotation class to start the fade-out effect
    icon.classList.add("rotate");
    
    // Change the icon image after the fade-out effect starts
    setTimeout(function() {
        // Toggle dark_theme class
        document.body.classList.toggle("dark_theme");

        // Change the icon source based on the theme
        if (document.body.classList.contains("dark_theme")) {
            icon.src = "img/sun.png";  // Switch to sun icon
        } else {
            icon.src = "img/moon.png";  // Switch to moon icon
        }

        // Reset the rotation and fade-in effect
        icon.classList.remove("rotate");

        // Trigger a reflow to apply the fade-in effect immediately
        void icon.offsetWidth;
    }, 250);  // Short delay to match the fade-out transition
};
// calendar js




const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('monthYear');
const eventList = document.getElementById('eventList');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Store events as an object where keys are date strings and values are arrays of events
let events = {};

// Display the calendar for the current month/year
function displayCalendar(month, year) {
    daysContainer.innerHTML = '';

    // Update the month and year display correctly using the passed-in month and year
    monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add blanks before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('div');
        daysContainer.appendChild(blank);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.setAttribute('data-date', new Date(year, month, day).toISOString().split('T')[0]);

        // Highlight the current day
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('current-day');
        }

        // Add event listener for adding/viewing events
        dayElement.addEventListener('click', function () {
            displayEvents(this.getAttribute('data-date'));
        });

        daysContainer.appendChild(dayElement);
    }
}

// Display the events for the selected date
function displayEvents(date) {
    const eventsOnDay = events[date] || [];
    eventList.innerHTML = eventsOnDay.length ? eventsOnDay.map(event => `<li>${event}</li>`).join('') : `<li>No events</li>`;
}

// Subtract one day from a given date string (YYYY-MM-DD)
function getPreviousDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);  // Subtract one day
    return date.toISOString().split('T')[0];  // Return the adjusted date in YYYY-MM-DD format
}

// Add an event to the previous day of the selected date
function addEvent() {
    let eventDate = document.getElementById('eventDate').value;
    const eventText = document.getElementById('eventText').value;

    if (!eventDate || !eventText) {
        alert("Please enter a valid date and event description.");
        return;
    }

    // Subtract one day from the selected event date
    eventDate = getPreviousDay(eventDate);

    // Initialize the array if no events exist for this date
    if (!events[eventDate]) {
        events[eventDate] = [];
    }

    // Add the new event to the existing array for that date
    events[eventDate].push(eventText);

    // Clear the input fields
    document.getElementById('eventDate').value = '';
    document.getElementById('eventText').value = '';

    // Update the event display
    displayEvents(eventDate);
}

// Move to the previous month
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar(currentMonth, currentYear);
}

// Move to the next month
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar(currentMonth, currentYear);
}

// Initial display of the current month's calendar
displayCalendar(currentMonth, currentYear);
