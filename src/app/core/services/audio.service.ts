import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();
  private progressSubject = new Subject<number>();
  private currentTimeSubject = new Subject<number>();
  private durationSubject = new Subject<number>();

  constructor() {
    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration > 0) {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressSubject.next(progress);
        this.currentTimeSubject.next(this.audio.currentTime);
        this.durationSubject.next(this.audio.duration);
      }
    });
  }

  play(url: string): void {
    if (this.audio.src !== url) {
      this.audio.src = url;
    }
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  getProgressObservable(): Observable<number> {
    return this.progressSubject.asObservable();
  }

  getCurrentTimeObservable(): Observable<number> {
    return this.currentTimeSubject.asObservable();
  }

  getDurationObservable(): Observable<number> {
    return this.durationSubject.asObservable();
  }
}
