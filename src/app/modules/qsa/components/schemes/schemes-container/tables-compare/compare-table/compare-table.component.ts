import {Component, Input} from '@angular/core';
import {TableViewCompare} from '../../../../../model/table/table.view-compare';
import {SystemFeature} from '../../../../../model/system/system.feature';
import {TableView} from '../../../../../model/table/table.view';
import {SystemFeatureValue} from '../../../../../model/system/system.feature.value';

@Component({
    selector: 'compare-table-component',
    templateUrl: './compare-table.component.html'
})
export class CompareTableComponent {

    public FIRST_TABLE = 0;
    public SECOND_TABLE = 1;

    @Input() tableViewCompare: TableViewCompare;

    public getReadableValue(tableNumber: number, systemFeature: SystemFeature): string {
        let value = this.getSystemFeatureValueToDisplay(tableNumber, systemFeature);
        let result = '';
        if (value === undefined) {
            result = '-';
        } else if (isNaN(value)) {
            result = 'cannotCalculate';
        }
        return result;
    }

    public getSystemFeatureValueToDisplay(tableNumber: number, systemFeature: SystemFeature): number {
        let tableView = this.getTableViewBasedOnIndex(tableNumber);
        return tableView.systemFeatureValues
            .filter(systemFeatureValue => systemFeatureValue.systemFeature.id === systemFeature.id)
            .map(systemFeatureValue => systemFeatureValue.values[0])
            [0];
    }

    public getSystemFeatures(): SystemFeature[] {
        let result = new Array<SystemFeature>();
        result = result.concat(this.getSystemFeaturesDistinct(this.tableViewCompare.tableView1.systemFeatureValues, result));
        result = result.concat(this.getSystemFeaturesDistinct(this.tableViewCompare.tableView2.systemFeatureValues, result));
        return result;
    }

    public getSystemFeaturesDistinct(systemFeatureValues: SystemFeatureValue[], result: SystemFeature[]): SystemFeature[] {
        return result.concat(systemFeatureValues
            .map(systemFeatureValue => systemFeatureValue.systemFeature)
            .filter(systemFeature => !this.isSystemFeaturesAlreadyAdded(systemFeature, result)));
    }

    private isSystemFeaturesAlreadyAdded(systemFeature: SystemFeature, systemFeatures: SystemFeature[]): boolean {
        let contains = false;
        systemFeatures.forEach(systemFeatureFromArray => {
            if (systemFeatureFromArray.id === systemFeature.id) {
                contains = true;
            }
        });
        return contains;
    }

    private getTableViewBasedOnIndex(index: number): TableView {
        if (index === this.FIRST_TABLE) {
            return this.tableViewCompare.tableView1;
        } else {
            return this.tableViewCompare.tableView2;
        }
    }
}
