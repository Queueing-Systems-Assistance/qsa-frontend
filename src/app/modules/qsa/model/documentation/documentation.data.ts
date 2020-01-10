import {DocumentationDataParameters} from './documentation.data.parameters';

export class DocumentationData {

    nameKey: string;
    requestType: string;
    requestURL: string;
    parameters: Array<DocumentationDataParameters>;
    body: Array<DocumentationDataParameters>;
    examples: Array<string>;

}
