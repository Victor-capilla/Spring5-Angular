import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

/** @title Datepicker selected value */
@Component({
  selector: 'app-date-picker',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['date-picker.component.css'],
})
export class DatePickerComponent {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
}