import { GroupCourseEnum } from "./types/entities";

export default function getCourseName(course: GroupCourseEnum, dict: Dictionary) {
    switch (course) {
        case "bachelor_1": return dict.Inputs.course.bachelor_1
        case "bachelor_2": return dict.Inputs.course.bachelor_2
        case "bachelor_3": return dict.Inputs.course.bachelor_3
        case "bachelor_4": return dict.Inputs.course.bachelor_4
        case "magistracy_1": return dict.Inputs.course.magistracy_1
        case "magistracy_2": return dict.Inputs.course.magistracy_2
        case "postgraduate_1": return dict.Inputs.course.postgraduate_1
        case "postgraduate_2": return dict.Inputs.course.postgraduate_2
        case "postgraduate_3": return dict.Inputs.course.postgraduate_3
    
        default: return "";
    }
}