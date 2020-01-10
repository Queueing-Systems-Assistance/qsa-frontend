import {Component, Input} from '@angular/core';
import {TableView} from '../../../../../model/table/table.view';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportCsvModal} from '../../../../modals/export-csv/export-csv.modal';
import {SystemView} from '../../../../../model/system/system.view';

@Component({
    selector: 'tab-table-component',
    templateUrl: './tab-table.component.html'
})
export class TabTableComponent {

    @Input() systemView: SystemView;
    @Input() systemTableView: TableView;

    constructor(private modalService: NgbModal) {
    }

    public exportToCSV(): void {
        const modalRef = this.modalService.open(ExportCsvModal);
        modalRef.componentInstance.systemTableView = this.systemTableView;
        modalRef.componentInstance.systemView = this.systemView;
    }
}
