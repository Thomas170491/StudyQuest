import { Pipe, PipeTransform } from '@angular/core';
import { Exercise } from '../interfaces';

@Pipe({
  name: 'filterbySubjectId',
  standalone: true
})
export class FilterbySubjectIdPipe implements PipeTransform {
  transform(value: Exercise[]|null, SubjectId : string): Exercise[]{
    if (value && SubjectId) {
      return value.filter((v) => v.subjectId === SubjectId);
    }
    return []
  } 
}
