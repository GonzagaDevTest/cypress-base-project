const moment = require("moment");

class DateTimeUtils {
    today() {
        return new AbstractDate().unFormated();
    };

    yesterday() {
        return this.updateDayTo(this.today(), -1);
    };

    updateMonthTo = (refDate, qtMonths) => {
        const dtChanged = moment(refDate)
            .utcOffset(this.OFF_SET_SP)
            .add(qtMonths, "months")
            .format()
            .split("T")[0];
        return dtChanged;
    };

    updateDayTo = (refDate, qtdDays) => {
        const dtChanged = new AbstractDate(refDate)
        .unFormated()
            .add(qtdDays, "days")
            .format()
            .split("T")[0];
        return dtChanged;
    };

    updateMonthAndDaysTo(
        refDate,
        qtdMonths,
        qtdDays
    ) {
        let date = new AbstractDate(refDate).unFormated().add(qtdMonths, "months");

        date = date.add(qtdDays, "days");
        return date.toISOString().split("T")[0];
    };

    currentDateTime() {
        return (
            new AbstractDate()
            .unFormated().format().slice(0, 10) +
            " " +
            new AbstractDate().unFormated().format().slice(12, 16)
        );
    };

    updateHours = (refDate, qtdHours) => {
        const dtChanged = new AbstractDate(refDate).unFormated()
            .add(qtdHours, "hours")
            .format()
            .split("T");
        return dtChanged[0] + " " + dtChanged[1].slice(0, 5);
    };

    updateMinutes = (refDate, qtdMinutes) => {
        const dtChanged = new AbstractDate(refDate).unFormated()
            .add(qtdMinutes, "minutes")
            .format()
            .split("T");
        return dtChanged[0] + " " + dtChanged[1].slice(0, 5);
    };

    isToday(date) {
        const localDate = new AbstractDate(date).unFormated().format().split("T")[0];
        return this.today() === localDate;
    };

    calcAge(dtNascimento) {
        return new AbstractDate(date).unFormated().diff(dtNascimento, "years");
    };
}

class AbstractDate{
    OFF_SET_SP = "-03:00"
    constructor(dtRef){
        this.date = moment(dtRef).utcOffset(this.OFF_SET_SP)
    }

    formated(){
        return this.date.format().slice(0, 10);
    }
    unFormated(){
        return this.date;
    }
}

module.exports = DateTimeUtils