import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PhotoModule } from '../photo/photo.module';
import { PhotoFormComponent } from './photo-form.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-click/immediate-click.module';

@NgModule({
    declarations: [
        PhotoFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        VMessageModule,
        PhotoModule,
        ImmediateClickModule
    ]
})
export class PhotoFormModule {

}