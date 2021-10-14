import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenCountryValidator(
  validCountryNames: string[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !validCountryNames.includes(control.value);
    return forbidden ? { forbiddenCountry: control.value } : null;
  };
}
