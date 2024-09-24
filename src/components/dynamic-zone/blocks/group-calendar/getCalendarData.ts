import type { DiplomaT, ExamT, GroupSingleT, RangeDatesT } from "@/lib/types/entities"
import { convertUTCDateToLocalDate, dateRange, matrixObjectsToArray, matrixToArray } from "@/lib/utils"

export function getGroupCalendarDates(data: GroupSingleT) {

  // EXAMS //
  const examsDates = data.attributes.exams.map(item => 
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())


  // TESTS //
  const testsDates = data.attributes.tests.map(item => 
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())


  // STATE EXAMS //
  const stateExamsDates = data.attributes.stateExams.map(item =>
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())


  // DIPLOMAS //
  const diplomasDates = data.attributes.diplomas.map(item =>
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())


  // EDU PRACTICES //
  const eduPracticesDatesMatrix = data.attributes.eduPractices.map(item => {
    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [
      convertUTCDateToLocalDate(
        new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate())
      )
    ]
    return dates
  })
  const eduPracticesDates = matrixToArray(eduPracticesDatesMatrix)
  .sort((a,b) => a.getTime() - b.getTime())


  // INTERNSHIPS //
  const internshipsDatesMatrix = data.attributes.internships.map(item => {
    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [
      convertUTCDateToLocalDate(
        new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate())
      )
    ]
    return dates
  })
  const internshipsDates = matrixToArray(internshipsDatesMatrix)
  .sort((a,b) => a.getTime() - b.getTime())


  // PRE-GRADUATE PRACTICES //
  const preGraduatePracticesDatesMatrix = data.attributes.preGraduatePractices.map(item => {
    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [
      convertUTCDateToLocalDate(
        new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate())
      )
    ]
    return dates
  })
  const preGraduatePracticesDates = matrixToArray(preGraduatePracticesDatesMatrix)
  .sort((a,b) => a.getTime() - b.getTime())


  // HOLIDAYS //
  const holidaysDatesMatrix = data.attributes.holidays.map(item => {
    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [
      convertUTCDateToLocalDate(
        new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate())
      )
    ]
    return dates
  })
  const holidaysDates = matrixToArray(holidaysDatesMatrix)
  .sort((a,b) => a.getTime() - b.getTime())

  return {
    examsDates,
    testsDates,
    stateExamsDates,
    diplomasDates,
    eduPracticesDates,
    internshipsDates,
    preGraduatePracticesDates,
    holidaysDates
  }
}




export function getGroupCalendarData(data: GroupSingleT): {
  exams: ExamT[]
  tests: ExamT[]
  stateExams: DiplomaT[]
  diplomas: DiplomaT[],
  eduPractices: RangeDatesT[],
  internships: RangeDatesT[],
  preGraduatePractices: RangeDatesT[],
  holidays: RangeDatesT[]
} {

  // EXAMS //
  const exams = data.attributes.exams.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })


  // TESTS //
  const tests = data.attributes.tests.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })


  // STATE EXAMS //
  const stateExams = data.attributes.stateExams.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })


  // DIPLOMAS //
  const diplomas = data.attributes.diplomas.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })


  // EDU PRACTICES //
  const eduPracticesMatrix = data.attributes.eduPractices.map(item => {
    const dateStart = convertUTCDateToLocalDate(new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate()))
    const dateEnd = item.dateEnd
      ? convertUTCDateToLocalDate(new Date(item.dateEnd.getFullYear(), item.dateEnd.getMonth(), item.dateEnd.getDate()))
      : null

    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [ dateStart ]

    return { dates, description: item.description, dateStart, dateEnd }
  })
  const eduPractices = matrixObjectsToArray(eduPracticesMatrix)
  .sort((a,b) => a.date.getTime() - b.date.getTime())


  // INTERNSHIPS //
  const internshipsMatrix = data.attributes.internships.map(item => {
    const dateStart = convertUTCDateToLocalDate(new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate()))
    const dateEnd = item.dateEnd
      ? convertUTCDateToLocalDate(new Date(item.dateEnd.getFullYear(), item.dateEnd.getMonth(), item.dateEnd.getDate()))
      : null

    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [ dateStart ]

    return { dates, description: item.description, dateStart, dateEnd }
  })
  const internships = matrixObjectsToArray(internshipsMatrix)
  .sort((a,b) => a.date.getTime() - b.date.getTime())


  // PRE-GRADUATE PRACTICES //
  const preGraduatePracticesMatrix = data.attributes.preGraduatePractices.map(item => {
    const dateStart = convertUTCDateToLocalDate(new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate()))
    const dateEnd = item.dateEnd
      ? convertUTCDateToLocalDate(new Date(item.dateEnd.getFullYear(), item.dateEnd.getMonth(), item.dateEnd.getDate()))
      : null

    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [ dateStart ]

    return { dates, description: item.description, dateStart, dateEnd }
  })
  const preGraduatePractices = matrixObjectsToArray(preGraduatePracticesMatrix)
  .sort((a,b) => a.date.getTime() - b.date.getTime())


  // HOLIDAYS //
  const holidaysMatrix = data.attributes.holidays.map(item => {
    const dateStart = convertUTCDateToLocalDate(new Date(item.dateStart.getFullYear(), item.dateStart.getMonth(), item.dateStart.getDate()))
    const dateEnd = item.dateEnd
      ? convertUTCDateToLocalDate(new Date(item.dateEnd.getFullYear(), item.dateEnd.getMonth(), item.dateEnd.getDate()))
      : null

    let dates: Date[]

    if (item.dateEnd) {
      dates = dateRange(
        item.dateStart, 
        item.dateEnd,
      )
    }
    else dates = [ dateStart ]

    return { dates, description: item.description, dateStart, dateEnd }
  })
  const holidays = matrixObjectsToArray(holidaysMatrix)
  .sort((a,b) => a.date.getTime() - b.date.getTime())

  return {
    exams,
    tests,
    stateExams,
    diplomas,
    eduPractices,
    internships,
    preGraduatePractices,
    holidays
  }
}



export function getDayData({
  date,
  cardsData,
  type
}: {
  date: Date, 
  cardsData: {
    exams: ExamT[];
    tests: ExamT[];
    stateExams: DiplomaT[];
    diplomas: DiplomaT[];
    eduPractices: RangeDatesT[];
    preGraduatePractices: RangeDatesT[];
    internships: RangeDatesT[];
    holidays: RangeDatesT[];
  },
  type: "exam" | "test" | "stateExam" | "diploma" | "eduPractice" | "internship" | "preGraduatePractices" | "holiday"
}): ExamT[] | DiplomaT | RangeDatesT | undefined {
  switch (type) {
    case "exam":
      const findedExams = cardsData.exams.filter(item => item.date.toDateString() === date.toDateString())
      return findedExams;

    case "test":
      const findedTests = cardsData.tests.filter(item => item.date.toDateString() === date.toDateString())
      return findedTests;

    case "stateExam":
      const findedStateExam = cardsData.stateExams.find(item => item.date.toDateString() === date.toDateString())
      return findedStateExam;

    case "diploma":
      const findedDiploma = cardsData.diplomas.find(item => item.date.toDateString() === date.toDateString())
      return findedDiploma;

    case "eduPractice":
      const findedEduPractice = cardsData.eduPractices.find(dt => dt.date.toDateString() === date.toDateString())
      return findedEduPractice;

    case "internship":
      const findedInternship = cardsData.internships.find(dt => dt.date.toDateString() === date.toDateString())
      return findedInternship;

    case "preGraduatePractices":
      const findedPreGraduatePractices = cardsData.preGraduatePractices.find(dt => dt.date.toDateString() === date.toDateString())
      return findedPreGraduatePractices;
      
    case "holiday":
      const findedHoliday = cardsData.holidays.find(dt => dt.date.toDateString() === date.toDateString())
      return findedHoliday;

    default:
      return undefined;
  }
}



export function getCalendarLabels(dict: Dictionary) {
  return [
    [
      {title: dict.CalendarGroups.tests, color: "border-4 border-tests"},
      {title: dict.CalendarGroups.exams, color: "bg-exams"},
      {title: dict.CalendarGroups.stateExams, color: "border-4 border-stateExams"},
      {title: dict.CalendarGroups.diplomas, color: "bg-diplomas"},
    ],
    [
      {title: dict.CalendarGroups.eduPractices, color: "border-[3px] border-dashed border-eduPractices"},
      {title: dict.CalendarGroups.internships, color: "border-[3px] border-dashed border-internships"},
      {title: dict.CalendarGroups.preGraduatePractices, color: "border-[3px] border-dashed border-preGraduatePractices"},
    ],
    [
      {title: dict.CalendarGroups.holidays, color: "text-holidays", number: true},
      {title: dict.CalendarGroups.weekends, color: "text-destructive", number: true},
      {title: dict.CalendarGroups.info, color: "info"},
    ]
  ]
}