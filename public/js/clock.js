function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function defineAccessors(object, property) {
    object['get' + capitalize(property)] = function() {
        return this[property];
    };

    var callbackProperty = 'on' + capitalize(property) + 'Change';
    object['set' + capitalize(property)] = function(newValue) {
        var changed = this[property] !== newValue;
        if (changed) {
            this[property] = newValue;
            var callback = this[callbackProperty];
            if (callback) { callback(this, newValue) }
        }
        return this;
    };
}

function Clock() {
    defineAccessors(this, 'hours');
    defineAccessors(this, 'minutes');
    defineAccessors(this, 'seconds');
    defineAccessors(this, 'milliseconds');

    var date = new Date();

    // Initial values
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.milliseconds = date.getMilliseconds();
}

function ClockView(element, clock) {
    var hoursValueEl = element.querySelector('.js-hours .js-value');
    var minutesValueEl = element.querySelector('.js-minutes .js-value');
    var secondsValueEl = element.querySelector('.js-seconds .js-value');
    var millisecondsValueEl = element.querySelector('.js-milliseconds .js-value');

    var updateHours = function() {
        hoursValueEl.innerText = clock.getHours();
    };
    var updateMinutes = function() {
        minutesValueEl.innerText = clock.getMinutes();
    };
    var updateSeconds = function() {
        secondsValueEl.innerText = clock.getSeconds();
    };
    var updateMilliseconds = function() {
        millisecondsValueEl.innerText = clock.getMilliseconds();
    };

    clock.onHoursChange = updateHours;
    clock.onMinutesChange = updateMinutes;
    clock.onSecondsChange = updateSeconds;
    clock.onMillisecondsChange = updateMilliseconds;

    updateHours();
    updateMinutes();
    updateSeconds();
    updateMilliseconds();
}

function initializeClockWidget() {
    clock = new Clock();
    var element = document.querySelector('#js-clock-widget');
    var view = new ClockView(element, clock);

    setInterval(function() {
        var date = new Date();
        clock.setMilliseconds(date.getMilliseconds());
        clock.setSeconds(date.getSeconds());
        clock.setMinutes(date.getMinutes());
        clock.setHours(date.getHours());
    }, 4);
}

var clock;
document.addEventListener('DOMContentLoaded', initializeClockWidget);