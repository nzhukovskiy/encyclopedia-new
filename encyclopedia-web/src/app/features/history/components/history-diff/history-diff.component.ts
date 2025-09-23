import {Component, Input} from '@angular/core';
import {SideBySideDiffComponent} from 'ngx-diff';

@Component({
  selector: 'app-history-diff',
  imports: [SideBySideDiffComponent],
  templateUrl: './history-diff.component.html',
  styleUrl: './history-diff.component.scss'
})
export class HistoryDiffComponent {

    @Input() previous?: any;
    @Input() next?: any;
    @Input() contentType: 'plain' | 'html' | 'json' = 'plain';
    @Input() propertyName?: string;

    protected formatPropertyForDiff(value: any): string {
        if (typeof value === 'string') {
          switch (this.contentType) {
            case 'json':
              return this.formatJsonForDiff(value);
            case 'html':
              return this.htmlToText(value);
            case 'plain':
            default:
              return value;
          }
        }

        if (typeof value === 'object' && value !== null) {
          return JSON.stringify(value, null, 2);
        }

        return String(value);
    }

    private isJsonString(str: string): boolean {
        try {
            const parsed = JSON.parse(str);
            return typeof parsed === 'object' && parsed !== null;
        } catch {
            return false;
        }
    }

    private formatJsonForDiff(jsonString: string): string {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed, null, 2);
        } catch {
            return jsonString;
        }
    }

    protected htmlToText(html: string) {
        return html
            .replace(/></g, '>\n<')
            .replace(/(<\/[^>]+>)/g, '$1\n')
            .split('\n')
            .filter(line => line.trim())
            .join('\n');
    }

    shouldShowDiff(): boolean {
        const prev = this.coerceEmptyToNull(this.previous);
        const next = this.coerceEmptyToNull(this.next);

        if (prev === null && next === null) {
            return false;
        }

        return !this.areEqual(prev, next);
    }

    private coerceEmptyToNull(value: any): any {
        return value == null || value === '' ? null : value;
    }

    private areEqual(a: any, b: any): boolean {
        if (a === b) return true;
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;

        const aStr = typeof a === 'object' ? JSON.stringify(a) : String(a);
        const bStr = typeof b === 'object' ? JSON.stringify(b) : String(b);
        return aStr === bStr;
    }
}
