import { Component, EventEmitter,  Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})

export class InputComponent {

  @Input() intype!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() control!: FormControl;
  
  @Input() SelectList!: string[];
  @Input() CheckboxOptions!: string[];
  
  @Input() option = "show";
  @Input() required = false;

  @Output() selectedCheckbox= new EventEmitter<string | null>();

  constructor( ) { }

  selectedCheckboxIndex: number | null = null;

  onCheckboxClick(option: string) {
    if (this.control.value === option) {
      this.control.setValue(null); // Deselect
      this.selectedCheckbox.emit(null);
    } else {
      this.control.setValue(option); // Select new option
      this.selectedCheckbox.emit(option);
    }
  }

}
