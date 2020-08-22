import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class FormsValidator {

    static emptyString(control: AbstractControl){
        if(control.value){
            if(control.value.trim() == ""){
                return { "emptyString": true}
            }
        }
        return null;
    }

    static onlyNumbers(control: AbstractControl){
        if(control.value){
            if(!/^\d+$/.test(control.value)){
                return { "onlyNumbers": true}
            }
        }
        return null;
    }
}