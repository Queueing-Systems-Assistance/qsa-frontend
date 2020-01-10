import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DocumentationData} from '../../model/documentation/documentation.data';
import {Logger} from '../../services/logger';

@Component({
    selector: 'documentation-component',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {

    public dataDocumentation = Array<DocumentationData>();
    public loadedExamples = new Map<string, string>();

    constructor(private http: HttpClient) {
        this.loadConfig();
    }

    public readExamples(): void {
        this.dataDocumentation.forEach(data => {
            data.examples.forEach(fileName => {
                if (fileName) {
                    Logger.i(this, 'Loading file', fileName);
                    this.http.get<string>(fileName).subscribe(fileData => {
                        this.loadedExamples.set(fileName, fileData);
                    });
                }
            });
        });
    }

    private loadConfig(): void {
        let documentationResourceConfigFile = 'assets/doc/documentation.json';
        Logger.i(this, 'Loading file', documentationResourceConfigFile);
        this.http.get<any[]>(documentationResourceConfigFile).subscribe(fileData => {
            this.dataDocumentation = fileData;
            this.readExamples();
        });
    }

}
