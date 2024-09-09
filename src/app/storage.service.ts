import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getItem<T>(key: string): T | null {
    key = key.startsWith(STORAGE_KEY_PREFIX) ? key : STORAGE_KEY_PREFIX + '.' + key

    const storedValue = localStorage.getItem(key)
    if (!storedValue) {
      return null
    }

    return JSON.parse(storedValue)
  }

  setItem<T>(key: string, value: T) {
    key = key.startsWith(STORAGE_KEY_PREFIX) ? key : STORAGE_KEY_PREFIX + '.' + key

    const serializedValue = JSON.stringify(value)

    localStorage.setItem(key, serializedValue)
  }
}

const STORAGE_KEY_PREFIX = 'tinaciousdesign.colour-tools'
