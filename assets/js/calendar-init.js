function initGoogleCalendar() {
    const calendarFrame = document.getElementById('googleCalendar');
    if (calendarFrame) {
        calendarFrame.src = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ29bnmXfuJ1UZuI-0uQpR7bBEA-r7j-nOsfg-kgjESu-Jw2LM5U8dxoRk4PccQHMH71X11gaObU?gv=true";
    }
}

// Load calendar when document is ready
document.addEventListener('DOMContentLoaded', initGoogleCalendar); 