import { Component } from '@angular/core'
import * as Highcharts from 'highcharts/highstock'
import { ChartData } from '../../../../../model/chart/chart.data'
import { Logger } from '../../../../../services/logger'
import { SeriesOptionsType } from 'highcharts'
import { NumberService } from 'src/app/modules/qsa/services/number.service'

@Component({
    selector: 'chart-figure-component',
    templateUrl: './chart-figure.component.html'
})
export class ChartFigureComponent {
    constructor(private numberService: NumberService) {}

    Highcharts = Highcharts
    chartOptions: Highcharts.Options

    public removeChart(): void {
        this.chartOptions = undefined
    }

    public createChart(xAxisName: string, value: ChartData): void {
        this.chartOptions = {
            exporting: {
                enabled: true
            },
            credits: {
                enabled: false
            },
            rangeSelector: {
                enabled: false,
                selected: 1
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                useHTML: true,
                enabled: true
            },
            tooltip: {
                formatter: function () {
                    let tooltip = ''
                    this.points.forEach(function (yAxis) {
                        tooltip +=
                            '<strong>' +
                            yAxis.series.name +
                            ':</strong> ' +
                            yAxis.y.toFixed(3).replace(/\.?0*$/, '') +
                            '<br/>'
                    })
                    tooltip +=
                        '<br><strong>' + xAxisName + ':</strong> ' + this.points[0].x.toFixed(3).replace(/\.?0*$/, '')
                    return tooltip
                },
                shared: true,
                useHTML: true,
                shape: 'square'
            },
            navigator: {
                enabled: true,
                xAxis: {
                    type: 'category',
                    labels: {
                        formatter: function () {
                            return this.value.toFixed(3).replace(/\.?0*$/, '') + '<br/>'
                        }
                    }
                }
            },
            yAxis: {
                opposite: false,
                title: {
                    text: null
                }
            },
            title: {
                text: value.systemElement.name
            },
            xAxis: {
                type: 'category',
                title: {
                    enabled: 'true',
                    text: xAxisName,
                    style: {
                        fontWeight: 'normal'
                    }
                },
                labels: {
                    formatter: function () {
                        return this.value.toFixed(3).replace(/\.?0*$/, '') + '<br/>'
                    }
                }
            },
            series: this.createDataForChart(value)
        }
    }

    public getNumValue(value: string): number {
        return this.numberService.isNumber(value) ? Number.parseFloat(value) : Number.NaN
    }

    private createDataForChart(chartData: ChartData): Array<SeriesOptionsType> {
        const datasets = []
        let count = 0
        chartData.systemOutputs.forEach(systemFeatureValue => {
            const datas = []
            chartData.labels.forEach((label, index) => {
                datas.push([label, this.getNumValue(systemFeatureValue.values[index])])
            })
            datasets.push({
                name: systemFeatureValue.name,
                data: datas,
                visible: count++ <= 3,
                showInNavigator: true,
                showInLegend: true
            })
        })
        Logger.i(this, 'Loaded chart data', chartData)
        return datasets
    }
}
