import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  form: FormGroup;
  file: File;
  preview: string;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    const description = this.form.get('description').value;
    const allowComments = this.form.get('allowComments').value;
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
