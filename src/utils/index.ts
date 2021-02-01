import { Todo, TodoStatus } from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getMonthNameByMonthNumber(mm: any) {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return months[mm];
}

function getDayNameByDayNumber(dd: any) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  return days[dd];
}

const today: Date = new Date();
const dayNumber = today.getDay();
export const day: string =
  dayNumber < 10 ? `0${dayNumber.toString()}` : dayNumber.toString();
export const month: string = getMonthNameByMonthNumber(
  today.getMonth().toString()
);
export const dayName: string = getDayNameByDayNumber(dayNumber);
export const year: string = today.getFullYear().toString();
