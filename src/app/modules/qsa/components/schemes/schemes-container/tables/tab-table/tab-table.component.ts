import {Component, Input} from '@angular/core';
import {TableView} from '../../../../../model/table/table.view';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportCsvModal} from '../../../../modals/export-csv/export-csv.modal';
import {SystemView} from '../../../../../model/system/system.view';
import { CalculationModal } from '../../../../modals/calculation/calculation.modal';
import { AboutModal } from '../../../../modals/about/about.modal';
import { Logger } from 'src/app/modules/qsa/services/logger';
import { NotificationService } from 'src/app/modules/qsa/services/notification.service';

@Component({
    selector: 'tab-table-component',
    templateUrl: './tab-table.component.html'
})
export class TabTableComponent {

    @Input() systemView: SystemView;
    @Input() systemTableView: TableView;

    constructor(private modalService: NgbModal,
                private notificationService: NotificationService) {
    }

    public exportToCSV(): void {
        const modalRef = this.modalService.open(ExportCsvModal);
        modalRef.componentInstance.systemTableView = this.systemTableView;
        modalRef.componentInstance.systemView = this.systemView;
    }

    public showCalculationModal() {
        //Currently only System MM1 is supported
        if(this.systemView.id === "systemMM1"){
            const modalRef = this.modalService.open(CalculationModal);
            Logger.i(this, 'Modalref: ', modalRef);
        }else{
            this.notificationService.showToastInfo("This feature is currently supported in System MM1 only");
        } 
    }
}
