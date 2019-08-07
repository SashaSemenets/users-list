import { FormControl, FormGroup, Validators } from '@angular/forms';

export class UserFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    const messages: string[] = [];
    if (this.errors) {
      for (const errorName in this.errors) {
        if (errorName === 'required') {
          messages.push(`You must enter a ${this.label}`);
        } else if (errorName === 'minlength') {
          messages.push(`A ${this.label} must be at least ${this.errors.minlength.requiredLength} characters`);
        } else if (errorName === 'maxlength') {
          messages.push(`A ${this.label} must be no more than ${this.errors.maxlength.requiredLength} characters`);
        } else if (errorName === 'pattern') {
          messages.push(`The ${this.label} contains illegal characters`);
        }
      }
    }
    return messages;
  }
}

export class UserFormGroup extends FormGroup {
  constructor() {
    super({
      _id: new UserFormControl('Id', 'id', null, Validators.nullValidator),
      balance: new UserFormControl('Balance', 'balance', 0, Validators.compose([
        Validators.required, Validators.minLength(1), Validators.pattern('[,.0-9]*')
      ])),
      name: new UserFormControl('Name', 'name', '', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.pattern('[A-z ]*')
      ])),
      age: new UserFormControl('Age', 'age', 0, Validators.compose([
        Validators.required, Validators.pattern('[0-9]*')
      ])),
      email: new UserFormControl('Email', 'email', '', Validators.compose([
        Validators.required, Validators.email, Validators.pattern('[0-z\-._@]*')
      ])),
      phone: new UserFormControl('Phone', 'phone', '', Validators.compose([
        Validators.required, Validators.minLength(9)
      ])),
      address: new UserFormControl('Address', 'address', '', Validators.compose([
        Validators.required, Validators.pattern('[0-z, ]*')
      ])),
      about: new UserFormControl('About', 'about', '', Validators.compose([
        Validators.required, Validators.pattern('[0-z,]+$')
      ])),
      tags: new UserFormControl('Tags', 'tags', [], Validators.nullValidator),
      company: new UserFormControl('Company', 'company', '', Validators.required),
      eyeColor: new UserFormControl('Eye Color', 'eyeColor', '', Validators.compose([
        Validators.required, Validators.pattern('[A-z]+$')
      ])),
      gender: new UserFormControl('Gender', 'gender', 'male', Validators.required),
      isActive: new UserFormControl('Active', 'isActive', true, Validators.required),
      latitude: new UserFormControl('Latitude', 'latitude', 0, Validators.required),
      longitude: new UserFormControl('Longitude', 'longitude', 0, Validators.required)
    });
  }

  get updateAnnotationControls(): UserFormControl[] {
    return Object.keys(this.controls).map(k => this.controls[k] as UserFormControl);
  }

  getFormValidationMessages(form: any): string[] {
    const messages: string[] = [];
    this.updateAnnotationControls.forEach(c => c.getValidationMessages()
        .forEach(m => messages.push(m)));
    return messages;
  }
}
