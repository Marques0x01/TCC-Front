import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';



@Injectable()
export class Utils {

    public hasError(form: FormGroup, field: string, error: string): boolean {
        if (form.get(field).errors && form.get(field).errors[error]) {
            return form.get(field).errors[error];
        }
    }

    public resetForm(form: FormGroup): void {
        form.reset()
        Object.keys(form.controls).forEach(key => {
            form.get(key).setErrors(null);
        });
        form.markAsUntouched();
    }

    public isFormValid(form: FormGroup): boolean {
        return form.valid && form.touched;
    }

    public orderArray(array: Array<any>, field: string) {
        return array.sort((a, b) => {
            if (a[field] > b[field]) {
                return 1;
            }
            if (a[field] < b[field]) {
                return -1;
            }
            return 0;
        });
    }
}