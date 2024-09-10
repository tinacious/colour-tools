import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  copyText(text: string, callback: (success: boolean) => void) {
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text, callback);
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      callback(true)
    }, function (err) {
      console.error('async: failed to copy', err);
      callback(false)
    });
  }

  private fallbackCopyTextToClipboard(text: string, callback: (success: boolean) => void) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      callback(true)
    } catch (err) {
      console.error('fallback: failed to copy', err);
      callback(false)
    }

    document.body.removeChild(textArea);
  }
}
