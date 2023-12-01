/* eslint-disable react/prop-types */
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfDay
} from "date-fns";
import { it } from 'date-fns/locale'
import { useEffect, useRef, useState } from "react";

function setClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Classi iniziali per posizionare i giorni diddio
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

function CustomDatePicker({ onDateChange }) {
  const today = startOfDay(new Date());
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [isOpen, setIsOpen] = useState(false);

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const customPickerRef = useRef(null);
  const inputTextRef = useRef(null);

  function handleClickOutside(event) {
    if (customPickerRef.current && !customPickerRef.current.contains(event.target) && !inputTextRef.current.contains(event.target)) {
        setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
    
  }, [])

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
    // start: startOfWeek(firstDayCurrentMonth), PER VEDERE I GIORNI PRIMA DEL MESE SELEZIONATO
    // end: endOfWeek(endOfMonth(firstDayCurrentMonth)), PER VEDERE I GIORNI DOPO IL MESE SELEZIONATO
  });

  function goToPreviousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function goToNextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function toggleCalendar() {
    const nextCalendarState = !isOpen;
    setIsOpen(nextCalendarState);
  }

  function selectDayFromCalendar(day) {
    setSelectedDay(day);
    onDateChange({ day });
  }

  return (
    <>
      <input
        ref={inputTextRef}
        type="text"
        onClick={() => toggleCalendar()}
        readOnly
        placeholder={format(startOfDay(new Date()), "yyyy-MM-dd")}
        onChange={onDateChange}
        value={format(startOfDay(selectedDay), "yyyy-MM-dd")}
        className="block w-auto rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
      />
      {isOpen && (
        <div className="max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6 relative" ref={customPickerRef}>
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="p-6 custom-shadow overlay-calendar">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, "MMMM yyyy", { locale: it }).toUpperCase()}
                </h2>
                <button
                  type="button"
                  onClick={toggleCalendar}
                  className="-my-1.5 flex mr-1.5 flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close Calendar</span>
                  <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={goToNextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>DOM</div>
                <div>LUN</div>
                <div>MAR</div>
                <div>MER</div>
                <div>GIO</div>
                <div>VEN</div>
                <div>SAB</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={
                      setClasses(dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => selectDayFromCalendar(day)}
                      className={setClasses(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) && isToday(day) && "text-red-500",
                        !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && "text-gray-900",
                        !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && "text-gray-400",
                        isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                        isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomDatePicker;