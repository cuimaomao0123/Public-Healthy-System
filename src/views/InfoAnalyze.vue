<template>
  <div>
<!--    面包屑导航-->
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/infoAnalyze' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">数据管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>数据分析</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
<!--四个扇形图-->
    <div class="panel">
      <el-card id="panel01" style="width: 390px;height: 270px"></el-card>
      <el-card id="panel02" style="width: 390px;height: 270px"></el-card>
      <el-card id="panel03" style="width: 390px;height: 270px"></el-card>
      <el-card id="panel04" style="width: 390px;height: 270px"></el-card>
    </div>
<!--    total区域-->
    <div class="total">
      <el-card class="card" style="width: 390px;height:80px">
        <div class="box">
        <div>
          <span class="el-icon-bank-card icon"></span>
        </div>
        <div class="number">
          <span class="one">16,150</span>
          <span class="two">total</span>
        </div>
        </div>
      </el-card>
      <el-card class="card" style="width: 390px;height: 80px">
        <div class="box">
        <div>
          <span class="el-icon-money icon"></span>
        </div>
        <div class="number">
          <span class="one">25,550</span>
          <span class="two">suspicious</span>
        </div>
        </div>
      </el-card>
      <el-card class="card" style="width: 390px;height: 80px">
      <div class="box">
        <div>
          <span class="el-icon-box icon"></span>
        </div>
        <div class="number">
          <span class="one">11,225</span>
          <span class="two">observe</span>
        </div>
      </div>
      </el-card>
      <el-card class="card" style="width: 390px;height: 80px">
      <div class="box">
        <div>
          <span class="el-icon-coin icon"></span>
        </div>
        <div class="number">
          <span class="one">72,525</span>
          <span class="two">recovery </span>
        </div>
      </div>
      </el-card>
    </div>
<!--    折线图与柱状图-->
    <div class="lineAndBar">
      <el-card id="line" style="width: 650px;height: 380px;padding-top:20px"></el-card>
      <el-card id="bar" style="width: 950px;height: 380px"></el-card>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "InfoAnalyse",
    mounted() {
      this.getPanel01()
      this.getPanel02()
      this.getPanel03()
      this.getPanel04()
      this.getLine()
      this.getBar()
    },
    methods:{
      getPanel01(){
        let myChart = echarts.init(document.getElementById('panel01'))
        let bgColor = '#fff';
        let title = '总量';
        let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
        let echartData = [{
          name: "A类",
          value: "3720"
        },
          {
            name: "B类",
            value: "2920"
          },
          {
            name: "C类",
            value: "2200"
          },
          {
            name: "D类",
            value: "1420"
          }
        ];

        let formatNumber = function(num) {
          let reg = /(?=(\B)(\d{3})+$)/g;
          return num.toString().replace(reg, ',');
        }
        let total = echartData.reduce((a, b) => {
          return a + b.value * 1
        }, 0);

        let option = {
          backgroundColor: bgColor,
          color: color,
          title: [{
            text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
            top: 'center',
            left: 'center',
            textStyle: {
              rich: {
                name: {
                  fontSize: 10,
                  fontWeight: 'normal',
                  color: '#666666',
                  padding: [10, 0]
                },
                val: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#333333',
                }
              }
            }
          },{
            text: '单位：个',
            top: 20,
            left: 20,
            textStyle: {
              fontSize: 10,
              color:'#666666',
              fontWeight: 400
            }
          }],
          series: [{
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '50%'],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: bgColor,
                borderWidth: 2
              }
            },
            labelLine: {
              normal: {
                length: 0,
                length2: 100,
                lineStyle: {
                  color: '#e6e6e6'
                }
              }
            },
            label: {
              normal: {
                formatter: params => {
                  return (
                    '{icon|●}{name|' + params.name + '}{value|' +
                    formatNumber(params.value) + '}'
                  );
                },
                padding: [0 , -120, 25, -110],
                rich: {
                  icon: {
                    fontSize: 16
                  },
                  name: {
                    fontSize: 14,
                    padding: [0, 10, 0, 4],
                    color: '#666666'
                  },
                  value: {
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#333333'
                  }
                }
              }
            },
          }]
        };
        myChart.setOption(option)
        window.addEventListener("resize",function(){
          myChart.resize();
        })
      },
      getPanel02(){
        let myChart = echarts.init(document.getElementById('panel02'))
        var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']
        let option = {
          title: {
            text: '来源地',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: 18
            }
          },
          tooltip: {
            trigger: 'item'
          },
          series: [{
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['24%', '45%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              show: true,
              position: 'outside',
              formatter: '{a|{b}：{d}%}\n{hr|}',
              rich: {
                hr: {
                  backgroundColor: 't',
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12]
                },
                a: {
                  padding: [-30, 15, -20, 15]
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 10,
                lineStyle: {
                  width: 1
                }
              }
            },
            data: [{
              'name': '北京',
              'value': 5600
            }, {
              'name': '上海',
              'value': 3600
            }, {
              'name': '广州',
              'value': 1500
            }, {
              'name': '深圳',
              'value': 2000
            }, {
              'name': '未知',
              'value': 899
            }, {
              'name': '海外',
              'value': 4000
            }],
          }]
        };
        myChart.setOption(option)
        window.addEventListener("resize",function(){
          myChart.resize();
        })
      },
      getPanel03(){
        let myChart = echarts.init(document.getElementById('panel03'))
        let innerFontColor = '#FFFFFF';
        let outerFontColor = '#666666';
        let scale = 1;
        let echartData = {
          inner: [{
            value: 700,
            unit: '个',
            name: '有清楚认知'
          },
            {
              value: 679,
              unit: '个',
              name: '不太了解'
            },
            {
              value: 1548,
              unit: '个',
              name: '完全不知道'
            }
          ],
          outer: [{
            value: 310,
            unit: '个',
            name: '去过省外'
          },
            {
              value: 234,
              unit: '个',
              name: '没去过省外'
            },
            {
              value: 335,
              unit: '个',
              name: '出国过'
            },
            {
              value: 548,
              unit: '个',
              name: '没出门'
            },
            {
              value: 351,
              unit: '个',
              name: '有感冒'
            },
            {
              value: 247,
              unit: '个',
              name: '曾经患病'
            }
          ]
        }

        let legend1 = echartData.inner.map(v => v.name);
        let legend2 = echartData.outer.map(v => v.name);
        let legendData = [...legend1, ...legend2];

        let option = {
          backgroundColor: '#fff',
          color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80",
            "#8d98b3", "#FFEA01", "#B8D07C", "#fca4bb", "#dc69aa",
            "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050",
            "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"
          ],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: [0, '35%'],
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: echartData.inner
          },
            {
              name: '访问来源',
              type: 'pie',
              radius: ['45%', '55%'],
              data: echartData.outer,
              labelLine: {
                normal: {
                  length: 20,
                  length2: 130,
                  lineStyle: {
                    color: '#e6e6e6'
                  }
                }
              },
              label: {
                normal: {
                  formatter: params => {
                    return (
                      '{icon|●}{name|' + params.name + '}{percent|'+ params.percent.toFixed(1) +'%}{value|' +
                      (params.value) + '}'
                    );
                  },
                  padding: [0, -170, 25, -175],
                  rich: {
                    color: '#333',
                    icon: {
                      fontSize: 12
                    },
                    name: {
                      fontSize: 10,
                      padding: [0, 5, 0, 5],
                      color: '#666666'
                    },
                    percent: {
                      color: '#f60',
                      padding: [0, 5, 0, 0],
                    },
                    value: {
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#333333'
                    }
                  }
                }
              },
            }
          ]
        };
        myChart.setOption(option)
        window.addEventListener("resize",function(){
          myChart.resize();
        })
      },
      getPanel04(){
        let myChart = echarts.init(document.getElementById('panel04'))
        let option = {
          title: {
            text: '666',
            left: 'center',
            top: '49%',
            textStyle: {
              fontSize: 16,
              color: '#3C4353',
              fontStyle: 'normal',
              fontWeight: '400',
              fontFamily: 'PingFangSC-Regular,PingFang SC;',
            }
          },
          color: ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
            name: '统计',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
              show: true,
              formatter: '{d}%',
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [{
              value: 25,
              name: 'rose1'
            },
              {
                value: 20,
                name: 'rose2'
              },
              {
                value: 15,
                name: 'rose3'
              },
              {
                value: 10,
                name: 'rose4'
              },
              {
                value: 8,
                name: 'rose5'
              },
              {
                value: 3,
                name: 'rose6'
              },
            ]
          }, {
            name: '占位',
            type: 'pie',
            silent: true,
            center: ['50%', '50%'],
            radius: 30,
            hoverAnimation: false,
            label: {
              show: false,
              position: 'center'
            },
            data: [{
              value: 1,
              name: '占位2'
            },

            ],
            itemStyle: {

              normal: {
                color: '#fff',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
              },
            }
          }, ]
        };
        myChart.setOption(option)
        window.addEventListener('resize',function () {
          myChart.resize()
        })
      },
      getLine(){
        let myChart = echarts.init(document.getElementById('line'))
        const xAxisData = ["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"]
        let option = {
          "textStyle": {
            "fontFamily": "Din-Light"
          },
          "color": ["#123dac", "#73e2e2", "#ff7e85", "#9b52ff", "#fac524", "#46caff", "#a1e867", "#10b2b2", "#ec87f7", "#f4905a", "#00baba", "#facf24", "#e89d67", "#23c6c6", "#fa8699", "#40b7fc", "#006d75", "#595959", "#f4764f", "#a640fc", "#fda23f", "#2d7ae4", "#5092ff", "#9351ed", "#8a89fe", "#df89e8", "#2797ff", "#6ad089", "#7c92e8 "],
          "title": {
            "text": "",
            "left": "47%",
            "textStyle": {
              "fontSize": 24
            }
          },
          "legend": {
            "data": [{
              "name": "疑似病情",
              "icon": "path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z"
            }, {
              "name": "确诊人数",
              "icon": "path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z"
            }, {
              "name": "治愈人数",
              "icon": "path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z"
            }],
            "left": "left",
            "selected": {
              "白起": true,
              "李泽言": true,
              "许墨": true
            },
            "itemWidth": 10,
            "itemHeight": 10,
            "itemGap": 10,
            "textStyle": {
              "color": "#898989",
              "lineHeight": 15
            },
            "type": "scroll",
          },
          "tooltip": {
            "backgroundColor": "#fff",
            "trigger": "axis",
            "axisPointer": {
              "type": "none"
            },
            "textStyle": {
              "color": "#565656",
              "lineHeight": 28
            },
            "confine": true,
            "padding": 12,
            "extraCssText": "box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;max-height: 100%;",
            "formatter": {
              "_custom": {
                "type": "function",
                "display": "<span>ƒ</span> (params)"
              }
            }
          },
          "grid": {
            "left": 30,
            "right": 10,
            "top": 70,
            "bottom": 80
          },
          "xAxis": {
            "type": "category",
            "boundaryGap": true,
            "data": xAxisData,
            "axisLabel": {
              "color": "#a0a9bc",
              //X轴标签 label 做了特殊处理，防止左右溢出
              formatter: (value, index) => {
                if (index === 0 || index === xAxisData.length - 1) {
                  return "";
                }
                return value;
              }
            },
            "axisLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            }
          },
          "yAxis": {
            "name": "",
            "nameTextStyle": {
              "color": "gray"
            },
            "type": "value",
            "axisLabel": {
              "color": "#a0a9bc",
              "inside": true,
              "margin": 0,
              "verticalAlign": "bottom"
            },
            "splitLine": {
              "lineStyle": {
                "type": "dashed"
              }
            },
            "minInterval": 1,
            "axisLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            }
          },
          "series": [{
            "name": "疑似病情",
            "data": [43, 58, 195, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 604, 17, 0, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "type": "line",
            "smooth": true,
            "smoothMonotone": "x",
            "cursor": "pointer",
            "showSymbol": false,
            "lineStyle": {
              "shadowColor": "rgba(18,61,172,0.5)",
              "shadowBlur": 10
            }
          }, {
            "name": "确诊人数",
            "data": [23, 39, 118, 71, 116, 89, 58, 71, 51, 146, 31, 41, 61, 485, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "type": "line",
            "smooth": true,
            "smoothMonotone": "x",
            "cursor": "pointer",
            "showSymbol": false,
            "lineStyle": {
              "shadowColor": "rgba(115,226,226,0.5)",
              "shadowBlur": 10
            }
          }, {
            "name": "治愈人数",
            "data": [20, 37, 91, 72, 68, 67, 54, 42, 42, 115, 41, 33, 64, 312, 4, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "type": "line",
            "smooth": true,
            "smoothMonotone": "x",
            "cursor": "pointer",
            "showSymbol": false,
            "lineStyle": {
              "shadowColor": "rgba(255,126,133,0.5)",
              "shadowBlur": 10
            }
          }]
        };
        myChart.setOption(option)
        window.addEventListener('resize',function () {
          myChart.resize()
        })
      },
      getBar(){
        let myChart = echarts.init(document.getElementById('bar'))
        var colorArr = [
          {
            top: '#FF9A22',//黄色
            bottom: '#FFD56E'
          },
          {
            top: '#2750FF',//蓝色
            bottom: '#6AB4FF'
          }
        ];
        let option = {
          backgroundColor: '#fff',
          grid: {
            top: '15%',
            right: '10%',
            left: '10%',
            bottom: '12%'
          },
          xAxis: [{
            type: 'category',
            color: '#59588D',
            data: ['2018-05', '2018-09', '2019-01', '2019-05', '2019-09','2020-05'],
            axisLabel: {
              margin: 20,
              color: '#999',
              textStyle: {
                fontSize: 18
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(107,107,107,0.37)',
              }
            },
            axisTick: {
              show: false
            },
          }],
          yAxis: [{
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%',
              color: '#999',
              textStyle: {
                fontSize: 18
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(107,107,107,0.37)',
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(131,101,101,0.2)',
                type: 'dashed',
              }
            }
          }],
          series: [{
            type: 'bar',
            data: [90, 74, 39, 44, 85,100],
            barWidth: '50px',
            itemStyle: {
              normal: {
                color: function(params) {
                  let num = colorArr.length;
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                    offset: 0,
                    color: colorArr[params.dataIndex % num].top // 0% 处的颜色
                  },{//可根据具体情况决定哪根柱子显示哪种颜色
                    offset: 1,
                    color: colorArr[params.dataIndex % num].bottom // 100% 处的颜色
                  }],false)
                },
                barBorderRadius: [30, 30, 0, 0],
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333',
                position: 'top',
              }
            }
          }]
        };
        myChart.setOption(option)
        window.addEventListener('resize',function () {
          myChart.resize()
        })
      }
    }
  }
</script>

<style scoped>
  .panel{
    margin-top: 30px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
  .total{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 10px;
  }
  .total .box{
    display: flex;
  }
  .total .box .icon{
    font-size: 50px;
    margin-left: 40px;
    margin-right: 100px;
    color: rgba(240,155,34);
  }
  .total .box .number{
    display: flex;
    flex-direction: column;
  }
  .number .one{
    font-size: 30px;
  }
  .number .two{
    margin-left: 20px;
    font-size: 18px;
    color: #6b6b6b;
  }
  .lineAndBar{
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;
  }

</style>