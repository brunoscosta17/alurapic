import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { switchMap, tap } from 'rxjs/operators';

import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment.interface';

@Component({
    templateUrl: 'photo-comments.component.html',
    selector: 'app-photo-comments',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent {

    @Input() photoId: number;
    form: FormGroup;
    
    comments$: Observable<PhotoComment[]>;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.form = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save() {
        const comment = this.form.get('comment').value as string;
        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
            .pipe(tap(() => {
                this.form.reset();
            }));
    }

}