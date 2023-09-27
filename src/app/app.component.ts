import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'aprimerose-task-angular';
  form;
  loading: boolean = false;
  errorMessages = {
    name: {
      required: 'This field is required',
      pattern:
        'Invalid name format. Please enter a valid name without special characters or numbers.',
    },
    email: {
      required: 'This field is required',
      pattern:
        'Invalid email format. Please enter a valid email address (e.g. example@email.com).',
    },
    message: {
      required: 'This field is required',
      maxLength: 'Character limit exceeded! Maximum allowed is 120.',
    },
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
        ],
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      message: ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  async onSubmit() {
    this.loading = true;
    await new Promise((r) => setTimeout(r, 1000));
    this.loading = false;
    alert(JSON.stringify(this.form.value, null, 2));
    this.form.reset();
  }
}
