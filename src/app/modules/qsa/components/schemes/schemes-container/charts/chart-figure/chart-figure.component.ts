import { Component, ElementRef, ViewChild } from '@angular/core'
import * as Highcharts from 'highcharts/highstock'
import { ChartData } from '../../../../../model/chart/chart.data'
import { Logger } from '../../../../../services/logger'
import { PointClickEventObject, SeriesOptionsType } from 'highcharts'
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

    public createChart(
        xAxisName: string,
        value: ChartData,
        yAxisGridEnabled: boolean,
        xAxisGridEnabled: boolean
    ): void {
        const checkx = this.checkx
        const clone = this.clone
        const addMarker = this.addMarker
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
                margin: 16,
                verticalAlign: 'middle',
                useHTML: true,
                enabled: true
            },
            title: {
                text: value.systemElement.name
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
                            yAxis.y.toFixed(3).replace(/\.?0*$/, '') +
                            '<br/>'
                    })
                    tooltip +=
                        '<br/><strong>' + xAxisName + ':</strong> ' + this.points[0].x.toFixed(3).replace(/\.?0*$/, '')
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
                            return this.value.toFixed(3).replace(/\.?0*$/, '') + '<br/>'
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
                gridLineWidth: xAxisGridEnabled ? 1 : 0,
                tickWidth: 0,
                startOnTick: true,
                endOnTick: true,
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
                },
                crosshair: {
                    color: 'black',
                    width: 1
                }
            },
            plotOptions: {
                series: {
                    navigatorOptions: {
                        marker: {
                            enabled: false,
                            states: {
                                select: {
                                    enabled: false
                                }
                            }
                        }
                    },
                    marker: {
                        enabled: true,
                        states: {
                            select: {
                                enabled: true,
                                lineColor: undefined,
                                fillColor: undefined,
                                lineWidth: 1,
                                radius: 5
                            }
                        }
                    },
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (event) {
                                const tooltip = checkx.indexOf(event.point.x)
                                if (tooltip >= 0) {
                                    $(clone[tooltip]).remove()
                                    clone.splice(tooltip, 1)
                                    checkx.splice(tooltip, 1)
                                    event.point.series.xAxis.removePlotLine('highcharts-plot-line-' + event.point.x)
                                    addMarker(event, this.series, false)
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
                                    event.point.series.xAxis.addPlotLine({
                                        value: event.point.x,
                                        color: 'black',
                                        zIndex: 1,
                                        width: 1,
                                        id: 'highcharts-plot-line-' + event.point.x
                                    })
                                    checkx.push(event.point.x)
                                    clone.push(cloneDiv)
                                    addMarker(event, this.series, true)
                                }
                            }
                        }
                    }
                }
            },
            series: this.createDataForChart(value)
        }
    }

    private addMarker(event: PointClickEventObject, series, shouldAdd: boolean): void {
        series.chart.series
            .filter(ser => ser.visible)
            .filter(ser => (ser as any).navigatorSeries)
            .forEach(function (ser) {
                const point = ser.points[event.point.x - 1]
                if (shouldAdd) {
                    point.select(true, true)
                } else {
                    point.select(false)
                }
            })
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
                datas.push({
                    x: label,
                    y: this.getNumValue(systemFeatureValue.values[index])
                })
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
