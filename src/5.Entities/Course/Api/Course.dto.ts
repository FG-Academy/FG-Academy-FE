import { Category, Course } from "../Model";

export interface CoursesResponse extends Course {
  category: Category;
}
