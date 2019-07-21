import React from 'react';
import ReactDOM from 'react-dom';
import { Doughnut } from "react-chartjs-2";
const ReactChart = window ? window.Chart : (global ? global.Window.Chart : null);
export default class DoughnutWithNumber extends Doughnut {
    constructor(props) {
        super(props);
        var originalDoughnutDraw = ReactChart.controllers.doughnut.prototype.draw;
        ReactChart.helpers.extend(ReactChart.controllers.doughnut.prototype, {
            draw: function () {
                originalDoughnutDraw.apply(this, arguments);
                var chart = this.chart.chart;
                var check = chart.config.data.isHaveValueCenter == true ? true : false;
                if (check == true) {
                    var ctx = chart.ctx;
                    var width = chart.chartArea.right - chart.chartArea.left;
                    var height = chart.chartArea.bottom - chart.chartArea.top;
                    var fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em Verdana";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    var text = chart.config.data.text,
                        textX = Math.round(width / 2 + chart.chartArea.left),
                        textY = Math.round(height / 2 + chart.chartArea.top);
                    ctx.fillText(text, textX, textY);
                }
            }
        });
    }
}