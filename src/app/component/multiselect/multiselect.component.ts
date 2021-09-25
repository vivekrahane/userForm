import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HOBBIES } from './multiselect.model';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {
  public dropDownPanel:boolean = false;
  selectOptions:any;
  @Input() selectedHobbies:string = ' ';
  hobbies:any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.hobbies = HOBBIES.map(hobby => ({...hobby}));
  }

  onChange: any = () => {}
  onTouch: any = () => {}
  
  writeValue(value: any){
    this.selectOptions = value
  }

  registerOnChange(fn: any){
    this.onChange = fn;
    this.hobbies = HOBBIES.map(hobby => ({...hobby}));
    let check:string[] = this.selectedHobbies.split(',');
    check.forEach(element => {
      this.hobbies.filter(ele => ele.label == element).map(option => option.selected = true);
    });
    
    this.selectOptions = this.hobbies.filter(ele => ele.selected == true).map(option => option.label).toString();
    this.onChange(this.selectOptions);
  }

  registerOnTouched(fn: any){
  }

  selectdHobbies(hobby:any){
    this.hobbies.filter(ele => ele == hobby).map(option => option.selected = !option.selected);
    this.selectOptions = this.hobbies.filter(ele => ele.selected == true).map(option => option.label).toString();
    this.onChange(this.selectOptions);
  }

}
