import type { DiplomaT, ExamT, GroupSingleT } from "@/lib/types/entities"
import { convertUTCDateToLocalDate, dateRange, matrixToArray } from "@/lib/utils"

export function getGroupCalendarDates(data: GroupSingleT) {
  const examsDates = data.attributes.exams.map(item => 
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())

  const testsDates = data.attributes.tests.map(item => 
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())

  const stateExamsDates = data.attributes.stateExams.map(item =>
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())

  const diplomasDates = data.attributes.diplomas.map(item =>
    convertUTCDateToLocalDate(new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()))
  ).sort((a,b) => a.getTime() - b.getTime())

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
    holidaysDates
  }
}




export function getGroupCalendarData(data: GroupSingleT): {
  exams: ExamT[]
  tests: ExamT[]
  stateExams: DiplomaT[]
  diplomas: DiplomaT[]
} {
  const exams = data.attributes.exams.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })

  const tests = data.attributes.tests.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })

  const stateExams = data.attributes.stateExams.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })

  const diplomas = data.attributes.diplomas.map(item => {
    const {date, ...rest} = item
    const convertedDate = convertUTCDateToLocalDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    return {
      date: convertedDate,
      ...rest
    }
  })

  return {
    exams,
    tests,
    stateExams,
    diplomas
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
    eduPractices: Date[];
    internships: Date[];
    holidays: Date[];
  },
  type: "exam" | "test" | "stateExam" | "diploma" | "eduPractice" | "internship" | "holiday"
}) {
  switch (type) {
    case "exam":
      const findedExam = cardsData.exams.filter(item => item.date.toDateString() === date.toDateString())
      return findedExam;

    case "test":
      const findedTest = cardsData.tests.filter(item => item.date.toDateString() === date.toDateString())
      return findedTest;

    case "stateExam":
      const findedStateExam = cardsData.stateExams.find(item => item.date.toDateString() === date.toDateString())
      return findedStateExam;

    case "diploma":
      const findedDiploma = cardsData.diplomas.find(item => item.date.toDateString() === date.toDateString())
      return findedDiploma;

    case "eduPractice":
      const findedEduPractice = cardsData.eduPractices.find(dt => dt.toDateString() === date.toDateString())
      return findedEduPractice;

    case "internship":
      const findedInternship = cardsData.internships.find(dt => dt.toDateString() === date.toDateString())
      return findedInternship;
      
    case "holiday":
      const findedHoliday = cardsData.holidays.find(dt => dt.toDateString() === date.toDateString())
      return findedHoliday;

    default:
      return undefined;
  }
}



export function getCalendarLabels(dict: Dictionary) {
  return [
    {title: dict.CalendarGroups.exams, color: "bg-exams/90"},
    {title: dict.CalendarGroups.tests, color: "bg-tests/90"},
    {title: dict.CalendarGroups.stateExams, color: "bg-stateExams/90"},
    {title: dict.CalendarGroups.diplomas, color: "bg-diplomas/90"},
    {title: dict.CalendarGroups.eduPractices, color: "bg-eduPractices/90"},
    {title: dict.CalendarGroups.internships, color: "bg-internships/90"},
    {title: dict.CalendarGroups.holidays, color: "bg-holidays/90"},
  ]
}