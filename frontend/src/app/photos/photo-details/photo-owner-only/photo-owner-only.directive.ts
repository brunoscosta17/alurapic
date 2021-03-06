import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';
import { Photo } from '../../photo/photo.interface';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownedPhoto: Photo;
    @Input() fatherNode;

    constructor(
        private el: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService) {

    }

    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(user => {
                if(!user || user.id.toString() !== this.ownedPhoto.userId.toString()) {
                    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                }
                // if (!user || user.id.toString() !== this.ownedPhoto.userId.toString()){
                //     this.renderer.removeChild(this.fatherNode, this.el.nativeElement);
                // }
            });
    }

}