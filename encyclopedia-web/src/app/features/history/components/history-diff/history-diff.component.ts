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
        const prev = this.normalizeEmptyValue(this.previous);
        const next = this.normalizeEmptyValue(this.next);

        if (prev === null && next === null) {
            return false;
        }

        return !this.areEqual(prev, next);
    }

    private normalizeEmptyValue(value: any): any {
        if (value == null) return null;

        if (typeof value === 'string' && value.trim() === '') return null;

        if (Array.isArray(value) && value.length === 0) return null;

        if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return null;

        return value;
    }

    private areEqual(a: any, b: any): boolean {
        if (a === null && b === null) return true;

        if (a === null || b === null) return false;

        const aStr = this.stringifyForComparison(a);
        const bStr = this.stringifyForComparison(b);

        return aStr === bStr;
    }

    private stringifyForComparison(value: any): string {
        if (value == null) return 'null';

        if (typeof value === 'object') {
            return this.stableStringify(value);
        }

        return String(value);
    }

    private stableStringify(obj: any): string {
        if (Array.isArray(obj)) {
            return '[' + obj.map(item => this.stableStringify(item)).join(',') + ']';
        }

        if (typeof obj === 'object' && obj !== null) {
            const sortedKeys = Object.keys(obj).sort();
            const keyValuePairs = sortedKeys.map(key => {
                return `"${key}":${this.stableStringify(obj[key])}`;
            });
            return `{${keyValuePairs.join(',')}}`;
        }

        return JSON.stringify(obj);
    }
}
