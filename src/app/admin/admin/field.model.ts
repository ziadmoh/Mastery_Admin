export interface Field {
    id?: string;
    name?: string;
    numberOfCourses?: number;
    courses?:{id:string,
              name:string,
              type:string,
              img:string,
              discription:string,
              teacherName:string,
              numberOfStudents:number}[]
  }
  