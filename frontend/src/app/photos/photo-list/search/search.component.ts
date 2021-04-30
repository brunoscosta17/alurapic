import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    @Input() value: string = '';

    @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();

    debounce: Subject<string> = new Subject<string>();

    ngOnInit(): void {
    this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter));
    }

    ngOnDestroy(): void {
    this.debounce.unsubscribe();
    }

}