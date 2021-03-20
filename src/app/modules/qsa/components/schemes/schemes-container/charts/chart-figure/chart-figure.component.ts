import { Component, ElementRef, ViewChild } from '@angular/core'
import * as Highcharts from 'highcharts/highstock'
import { ChartData } from '../../../../../model/chart/chart.data'
import { Logger } from '../../../../../services/logger'
import { SeriesOptionsType } from 'highcharts'
import { NumberService } from 'src/app/modules/qsa/services/number.service'
import HC_exporting from 'highcharts/modules/exporting'
import HC_exportData from 'highcharts/modules/export-data'
import customWrap from '../chart-wrapper'

HC_exporting(Highcharts)
HC_exportData(Highcharts)
customWrap(Highcharts)

function getSymbol(symbol) {
    switch (symbol) {
        case 'circle':
            return '●'
        case 'diamond':
            return '♦'
        case 'square':
            return '■'
        case 'triangle':
            return '▲'
        case 'triangle-down':
            return '▼'
        default:
            return ''
    }
}

@Component({
    selector: 'chart-figure-component',
    templateUrl: './chart-figure.component.html'
})
export class ChartFigureComponent {
    constructor(private numberService: NumberService) {}

    @ViewChild('chartWrapperContainer') chartWrapperContainer: ElementRef

    Highcharts = Highcharts
    chartOptions: Highcharts.Options
    checkx = []
    clone = []

    public removeChart(): void {
        this.chartOptions = undefined
    }

    public createChart(xAxisName: string, value: ChartData, yAxisGridEnabled: boolean): void {
        const numberService = this.numberService
        const checkx = this.checkx
        const clone = this.clone
        this.chartOptions = {
            exporting: {
                enabled: true,
                allowHTML: true,
                sourceWidth: this.chartWrapperContainer.nativeElement.offsetWidth
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
                margin: 12,
                verticalAlign: 'middle',
                useHTML: true,
                enabled: true
            },
            tooltip: {
                formatter() {
                    let tooltip = ''
                    this.points.forEach(function (yAxis) {
                        const symbol = getSymbol((yAxis.series as any).symbol)
                        tooltip +=
                            '<span style="color:' +
                            (yAxis.series as any).color +
                            '">' +
                            symbol +
                            '&nbsp;</span><strong>' +
                            yAxis.series.name +
                            ':</strong> ' +
                            numberService.getSimplestForm('' + yAxis.y) +
                            '<br/>'
                    })
                    tooltip +=
                        '<br/><strong>' +
                        xAxisName +
                        ':</strong> ' +
                        numberService.getSimplestForm('' + this.points[0].x)
                    return tooltip
                },
                shared: true,
                split: false,
                useHTML: true,
                shape: 'square',
                borderRadius: 3,
                borderColor: 'gray',
                backgroundColor: 'white'
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: true,
                margin: 25,
                xAxis: {
                    type: 'category',
                    labels: {
                        formatter() {
                            return numberService.getSimplestForm('' + this.value) + '<br/>'
                        }
                    },
                    startOnTick: true,
                    endOnTick: true,
                    gridLineWidth: 1
                }
            },
            yAxis: {
                opposite: false,
                gridLineWidth: yAxisGridEnabled ? 1 : 0
            },
            xAxis: {
                gridLineWidth: 1,
                tickWidth: 0,
                startOnTick: true,
                endOnTick: true,
                type: 'category',
                labels: {
                    formatter: function () {
                        return numberService.getSimplestForm('' + this.value) + '<br/>'
                    }
                },
                crosshair: true
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (event) {
                                const x = checkx.indexOf(event.point.x)
                                if (x >= 0) {
                                    $(clone[x]).remove()
                                    clone.splice(x, 1)
                                    checkx.splice(x, 1)
                                } else {
                                    const cloneDiv = (this.series.chart.tooltip as any).label.div.cloneNode(true)
                                    $(cloneDiv).addClass('highcharts-tooltip-for-export')
                                    this.series.chart.container.appendChild(cloneDiv)
                                    $.each($('.highcharts-tooltip-for-export > span'), function (i, span) {
                                        $(span).css({
                                            padding: '5px',
                                            border: '1px solid #3DACD9',
                                            'box-shadow': '2px 2px 2px #888888',
                                            'z-index': '9999 !important',
                                            'background-color': 'white',
                                            'border-color': 'gray'
                                        })
                                    })
                                    checkx.push(event.point.x)
                                    clone.push(cloneDiv)
                                }
                            }
                        }
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
