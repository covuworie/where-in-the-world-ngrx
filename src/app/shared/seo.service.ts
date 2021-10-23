import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  // public properties
  static readonly appTitle = 'Where in the world?';

  // public methods
  constructor(private title: Title, private meta: Meta) {}

  setMetaTag(name: string, content: string) {
    this.meta.updateTag({ name, content });
  }

  set Title(title: string) {
    this.title.setTitle(title);
  }
}
