import { notFound } from "next/navigation";
import { WeekendsT } from "../types/entities";
import fetchData from "./fetchData";

export const getWeekends = async (): Promise<WeekendsT> => {
  const query = /* GraphGL */ `
    query GetWeekends {
      weekend {
        data {
          attributes {
            days { 
              dateStart 
              dateEnd 
              description 
            }
          }
        }
      }
    }
  `;

  const json = await fetchData<{ 
    data: { 
      weekend: {
        data: WeekendsT | null
      }; 
    }; 
  }>({ 
    query, 
    error: `Failed to fetch Weekends`,
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (json.data.weekend.data === null) notFound();

  const weekends = WeekendsT.parse(json.data.weekend.data);

  return weekends;
};