import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: ['Test',[Validators.required]],
    email: ['test@test.com',[Validators.required]],
    password: ['123456',[Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
  }

}
