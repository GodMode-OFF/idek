var isMonthlyView = true;
        var date = new Date();
        var events = {};
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
                date.setMonth(date.getMonth() - 1);
                createMonthlyCalendar();
            } else {
                date.setDate(date.getDate() - 7);
                createWeeklyCalendar();
            }
            showCurrentDate();
        }

        function next() {
            if (isMonthlyView) {
                date.setMonth(date.getMonth() + 1);
                createMonthlyCalendar();
            } else {
                date.setDate(date.getDate() + 7);
                createWeeklyCalendar();
            }
            showCurrentDate();
        }

        function createMonthlyCalendar() {
            var calendarBody = document.getElementById('calendar-body');
            calendarBody.innerHTML = '';
            var month = date.getMonth();
            var year = date.getFullYear();
            var firstDay = (new Date(year, month)).getDay();
            var daysInMonth = 32 - new Date(year, month, 32).getDate();

            document.getElementById('monthAndYear').innerHTML = months[month] + ' ' + year;

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
                        if (events[year] && events[year][month] && events[year][month][dateToday]) {
                            cell.appendChild(document.createTextNode(' ' + events[year][month][dateToday]));
                        }
                        if (dateToday === date.getDate() && year === date.getFullYear() && month === date.getMonth()) {
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
            var day = date.getDay();
            var dateToday = date.getDate();
            var startOfWeek = dateToday - day;
            var month = date.getMonth();
            var year = date.getFullYear();

            document.getElementById('monthAndYear').innerHTML = 'Week of ' + months[month] + ' ' + startOfWeek + ', ' + year;

            var row = document.createElement('tr');
            for (var i = 0; i < 7; i++) {
                var cell = document.createElement('td');
                var cellText = document.createTextNode(startOfWeek + i);
                cell.appendChild(cellText);
                if (events[year] && events[year][month] && events[year][month][startOfWeek + i]) {
                    cell.appendChild(document.createTextNode(' ' + events[year][month][startOfWeek + i]));
                }
                if (startOfWeek + i === date.getDate() && year === date.getFullYear() && month === date.getMonth()) {
                    cell.className = 'today';
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }

        function showCurrentDate() {
            var currentDate = new Date();
            document.getElementById('currentDate').innerHTML = 'Today is: ' + days[currentDate.getDay()] + ', ' + months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
        }

        createMonthlyCalendar();
        showCurrentDate();