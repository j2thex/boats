// Google Calendar API configuration
const CALENDAR_CONFIG = {
  apiKey: '{{ site.google_calendar.api_key }}',
  calendarId: '{{ site.google_calendar.calendar_id }}',
};

class BookingCalendar {
  constructor() {
    this.availableSlots = [];
    this.loadGoogleAPI();
  }

  loadGoogleAPI() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js?key=' + CALENDAR_CONFIG.apiKey;
    script.onload = () => {
      this.loadAvailableSlots();
    };
    document.body.appendChild(script);
  }

  async loadAvailableSlots() {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    try {
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_CONFIG.calendarId}/events?` + new URLSearchParams({
        key: CALENDAR_CONFIG.apiKey,
        timeMin: today.toISOString(),
        timeMax: thirtyDaysFromNow.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
      }));

      const data = await response.json();
      this.availableSlots = this.processSlots(data.items || []);
      this.updateDatePicker();
    } catch (error) {
      console.error('Error loading calendar slots:', error);
    }
  }

  processSlots(events) {
    // Process events to determine available slots
    // This is a simplified version - you'll want to add your business logic here
    const bookedSlots = events.map(event => ({
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date)
    }));

    return this.generateAvailableSlots(bookedSlots);
  }

  generateAvailableSlots(bookedSlots) {
    // Generate available slots based on your business hours and booked slots
    // This is a simplified example
    const availableSlots = [];
    const workingHours = {
      start: 9, // 9 AM
      end: 17   // 5 PM
    };

    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    for (let date = new Date(today); date <= thirtyDaysFromNow; date.setDate(date.getDate() + 1)) {
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
        for (let hour = workingHours.start; hour < workingHours.end; hour++) {
          const slotStart = new Date(date);
          slotStart.setHours(hour, 0, 0, 0);
          
          if (!this.isSlotBooked(slotStart, bookedSlots)) {
            availableSlots.push(slotStart);
          }
        }
      }
    }

    return availableSlots;
  }

  isSlotBooked(slotStart, bookedSlots) {
    return bookedSlots.some(bookedSlot => {
      return slotStart >= bookedSlot.start && slotStart < bookedSlot.end;
    });
  }

  updateDatePicker() {
    const datePicker = document.getElementById('date');
    if (!datePicker) return;

    // Disable all dates first
    datePicker.addEventListener('input', (e) => {
      const selectedDate = new Date(e.target.value);
      const availableTimesForDate = this.getAvailableTimesForDate(selectedDate);
      this.updateTimeSlots(availableTimesForDate);
    });

    // Set min date to today and max date to 30 days from now
    datePicker.min = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    datePicker.max = maxDate.toISOString().split('T')[0];
  }

  getAvailableTimesForDate(date) {
    return this.availableSlots.filter(slot => {
      return slot.toDateString() === date.toDateString();
    });
  }

  updateTimeSlots(availableTimes) {
    const timeSelect = document.getElementById('timeSlot');
    if (!timeSelect) {
      this.createTimeSelect(availableTimes);
      return;
    }

    timeSelect.innerHTML = '';
    availableTimes.forEach(time => {
      const option = document.createElement('option');
      option.value = time.toISOString();
      option.textContent = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSelect.appendChild(option);
    });
  }

  createTimeSelect(availableTimes) {
    const dateGroup = document.querySelector('[for="date"]').parentElement;
    const timeGroup = document.createElement('div');
    timeGroup.className = 'form-group';
    
    const label = document.createElement('label');
    label.htmlFor = 'timeSlot';
    label.textContent = 'Available Times';

    const select = document.createElement('select');
    select.id = 'timeSlot';
    select.name = 'timeSlot';
    select.required = true;

    timeGroup.appendChild(label);
    timeGroup.appendChild(select);
    dateGroup.after(timeGroup);

    this.updateTimeSlots(availableTimes);
  }
} 