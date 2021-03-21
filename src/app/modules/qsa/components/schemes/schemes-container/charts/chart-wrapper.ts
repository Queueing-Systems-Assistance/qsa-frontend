export default function (Highcharts) {
    const H = Highcharts
    H.wrap(H.Chart.prototype, 'getChartHTML', function () {
        let ret = this.container.innerHTML
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
        $.each($('.highcharts-tooltip-for-export'), function (i, t) {
            ret += t.outerHTML.split('&nbsp;').join(' ').split('<br>').join('<br/>')
        })
        return ret
    })
}
