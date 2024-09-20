import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from '../../interfaces';

@Pipe({
  name: 'filterSubjectsByChapter',
  standalone: true
})
export class FilterSubjectsByChapterPipe implements PipeTransform {

  transform(value: Subject[]|null, selectedChapterId : string): Subject[]{
    if (value && selectedChapterId) {
      return value.filter((v) => v.chapterId === selectedChapterId);
    }
    
    return [];
  } 
}