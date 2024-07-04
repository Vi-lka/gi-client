import type { EventDayT } from "@/lib/types/entities";
import { getDateIndx } from "@/lib/utils";

export default function getItemData({
  currentDate,
  duplicates,
  datesByEventId,
  eventsDays
}:{
  currentDate: Date, 
  duplicates: Date[],
  datesByEventId: {
    id: string;
    dates: Date[];
  }[],
  eventsDays: {
    eventId: string;
    days: EventDayT[]
  }[],
}) {
  const duplicateIndx = getDateIndx(currentDate, duplicates);

  const eventsInCurrentDate = datesByEventId.map(item => {
    const finded = item.dates.find(date => date.toDateString() === currentDate.toDateString())
    if (finded) return item.id
    else return undefined
  }).filter(item => item) as string[]

  // Find data for card
  const items = eventsDays.map(item => {
    const finded = item.days.find(day => day.date.toDateString() === currentDate.toDateString())
    return { eventId: item.eventId, itemData: finded }
  })
  .filter(item => item)
  .filter(item => eventsInCurrentDate.includes(item.eventId)) 
  .sort((a,b) => {
    return Number(a.eventId) - Number(b.eventId);
  }) as Array<{
    eventId: string;
    itemData: EventDayT | undefined;
  }>

  return { duplicateIndx, items }
}