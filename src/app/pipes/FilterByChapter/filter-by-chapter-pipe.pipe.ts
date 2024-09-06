import { Pipe, PipeTransform } from '@angular/core';
import {Subject } from '../../interfaces';

@Pipe({
  name: 'filteSubjectsrByChapter',
  standalone: true
})
export class FilterSubjectsByChapterPipe implements PipeTransform {

  transform(value: Subject[]|null, selectedChapterId : string ): Subject[]{
    return value?.filter((v) => v.id === selectedChapterId) || [];
    
  }

}