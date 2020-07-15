import { Component, Input } from '@angular/core'
import { DocumentationData } from '../../../model/documentation/documentation.data'

@Component({
    selector: 'documentation-example-component',
    templateUrl: './documentation-example.component.html',
})
export class DocumentationExampleComponent {
    @Input() data: DocumentationData
    @Input() loadedExamples = new Map<string, string>()
}
