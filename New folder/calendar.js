var isMonthlyView = true;
        var currentDate = new Date();
        var calendarEvents = {};
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        function toggleView() {
            var calendar = document.getElementById('calendar');
            var viewToggleButton = document.getElementById('viewToggleButton');
            if (isMonthlyView) {
                calendar.className = 'weekly-view';
                createWeeklyCalendar();
                viewToggleButton.textContent = 'Monthly View';
            } else {
                calendar.className = 'monthly-view';
                createMonthlyCalendar();
                viewToggleButton.textContent = 'Weekly View';
            }
            isMonthlyView = !isMonthlyView;
            showCurrentDate();
        }

        function prev() {
            if (isMonthlyView) {
                currentDate.setMonth(currentDate.getMonth() - 1);
                createMonthlyCalendar();
            } else {
                currentDate.setDate(currentDate.getDate() - 7);
                createWeeklyCalendar();
            }
            showCurrentDate();
        }

        function next() {
            if (isMonthlyView) {
                currentDate.setMonth(currentDate.getMonth() + 1);
                createMonthlyCalendar();
            } else {
                currentDate.setDate(currentDate.getDate() + 7);
                createWeeklyCalendar();
            }
            showCurrentDate();
        }

        function createMonthlyCalendar() {
            var calendarBody = document.getElementById('calendar-body');
            calendarBody.innerHTML = '';
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            var firstDay = (new Date(year, month)).getDay();
            var daysInMonth = 32 - new Date(year, month, 32).getDate();

            document.getElementById('monthAndYear').innerHTML = monthNames[month] + ' ' + year;

            var dateToday = 1;
            for (var i = 0; i < 6; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay || dateToday > daysInMonth) {
                        var cell = document.createElement('td');
                        var cellText = document.createTextNode('');
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    } else {
                        var cell = document.createElement('td');
                        var cellText = document.createTextNode(dateToday);
                        cell.appendChild(cellText);
                        if (calendarEvents[year] && calendarEvents[year][month] && calendarEvents[year][month][dateToday]) {
                            cell.appendChild(document.createTextNode(' ' + calendarEvents[year][month][dateToday]));
                        }
                        if (dateToday === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                            cell.className = 'today';
                        }
                        row.appendChild(cell);
                        dateToday++;
                    }
                }
                calendarBody.appendChild(row);
            }
        }

        function createWeeklyCalendar() {
            var calendarBody = document.getElementById('calendar-body');
            calendarBody.innerHTML = '';
            var day = currentDate.getDay();
            var dateToday = currentDate.getDate();
            var startOfWeek = dateToday - day;
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            var daysInMonth = 32 - new Date(year, month, 32).getDate();

            document.getElementById('monthAndYear').innerHTML = 'Week of ' + monthNames[month] + ' ' + startOfWeek + ', ' + year;

            var row = document.createElement('tr');
            for (var i = 0; i < 7; i++) {
                var cell = document.createElement('td');
                if (startOfWeek + i >= 1 && startOfWeek + i <= daysInMonth) {
                    var cellText = document.createTextNode(startOfWeek + i);
                    cell.appendChild(cellText);
                    if (calendarEvents[year] && calendarEvents[year][month] && calendarEvents[year][month][startOfWeek + i]) {
                        cell.appendChild(document.createTextNode(' ' + calendarEvents[year][month][startOfWeek + i]));
                    }
                    if (startOfWeek + i === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                        cell.className = 'today';
                    }
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }

        function showCurrentDate() {
            var today = new Date();
            document.getElementById('currentDate').innerHTML = 'Today is: ' + dayNames[today.getDay()] + ', ' + monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
        }

        createMonthlyCalendar();
        showCurrentDate();