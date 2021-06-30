import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: 'signin.component.html'
})
export class SignInComponent implements OnInit {

    fromUrl: string;

    form: FormGroup;

    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute
            .queryParams
            .subscribe(params => this.fromUrl = params['fromUrl']);

        this.form = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowswe() && this.userNameInput.nativeElement.focus();
    }

    login() {

        const userName = this.form.get('userName').value;
        const password = this.form.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => this.fromUrl
                    ? this.router.navigateByUrl(this.fromUrl)
                    : this.router.navigate(['user', userName]),
                error => {
                    console.error(error.message);
                    this.form.reset();
                    this.platformDetectorService.isPlatformBrowswe() && this.userNameInput.nativeElement.focus();
                }
    }

}