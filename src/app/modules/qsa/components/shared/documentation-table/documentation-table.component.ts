import {Component, Input} from '@angular/core';
import {DocumentationDataParameters} from '../../../model/documentation/documentation.data.parameters';

@Component({
    selector: 'documentation-table-component',
    templateUrl: './documentation-table.component.html',
    styleUrls: ['./documentation-table.component.css']
})
export class DocumentationTableComponent {

    @Input() body: Array<DocumentationDataParameters>;

}
