import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidaor } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user.interface';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponment implements OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignupService,
        private router: Router) {}
    
    ngOnInit(): void {
        const fn = this.userNotTakenValidatorService.checkUserNameTaken();
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            userName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40),
                    lowerCaseValidaor
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
        })
    }

    
    signup() {
        const newUser = this.form.getRawValue() as NewUser;
        this.signupService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                error => console.log(error)
            );
    }

}