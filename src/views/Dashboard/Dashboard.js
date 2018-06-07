import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Label,
  Input,
  FormGroup,
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
} from 'reactstrap';
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Main Chart

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// var elements = 27;
// var data1 = [];
// var data2 = [];
// var data3 = [];

// for (var i = 0; i <= elements; i++) {
//   data1.push(random(50, 200));
//   data2.push(random(80, 100));
//   data3.push(65);
// }




//Random Numbers
function randomica(elements, min, max) {
  console.log(elements, min, max);
  var data_random = [];
  for (var i = 0; i <= elements; i++){
    data_random.push( Math.random() * (max - min) + min );
  }
  return data_random;
}


function sen(tam, set_point, alongamento){
  var seno = [];
  for (var i = 0; i <= tam; i++){
    seno.push(alongamento*(Math.sin(set_point*Math.PI*i/(tam/(tam/10)))));
  }
  return seno;
}

function quadratica(a,b,c){
  var quadra = [];
  for (var i = 0; i <= 100; i++){
    quadra.push((a*Math.pow(i/10, 2) + b*(i/10) + c));
  }
  return quadra;
}

function label_len(tam){
  var label = [];
  for (var i = 0; i <= tam; i++){
  label.push(i);
  }
  return label;
 } 
// function printfun(){ console.log('PRINTI AIAIAIA');}

var mainChart = {
      labels: 0,
        datasets: [
        {
        label: 'My Second dataset',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        data: 0,
        },
      ],
    }

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          maxTicksLimit: 5,
          stepSize: 1,
          //max: 10,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 1,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.gerar = this.gerar.bind(this);
    this.sinFun = this.sinFun.bind(this);
    this.quadFun = this.quadFun.bind(this);
    this.normFun = this.normFun.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      dado: mainChart,
      par1: 0,
      par2: 1,
      par3: 1,
      funType: 'Sin',
    };

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  upValuePar1(e1){
    this.state.par1 = this.setState( {par1 : e1.target.value}); 
  }
  upValuePar2(e2){
    this.state.par2 = this.setState( {par2 : e2.target.value}); 
  }
  upValuePar3(e3){
    this.state.par3 = this.setState( {par3 : e3.target.value}); 
  }

  gerar() {
    console.log(this.state.par1, this.state.par2, this.state.par3);

    if(this.state.funType == 'Quadratic'){
      //var label = label_len(10);
      var q = quadratica(this.state.par1, this.state.par2, this.state.par3);

      var mainChart = {
        labels: q,
          datasets: [
          {
          label: 'My Second dataset',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          data: q,
          },
        ],
      }

    }
    else if(this.state.funType == 'Random'){
      var label = label_len(this.state.par1);
      var q = randomica(this.state.par1, this.state.par2, this.state.par3);

      var mainChart = {
        labels: label,
          datasets: [
          {
          label: 'My Second dataset',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          data: q,
          },
        ],
      }
    }
    else{

      var sin = sen(this.state.par1, this.state.par2, this.state.par3);
      var label = label_len(this.state.par1);

      var mainChart = {
        labels: label,
          datasets: [
          {
          label: 'My Second dataset',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          data: sin,
          },
        ],
      }
    }

    this.state.dado = this.setState( {dado : mainChart});   

  }

  sinFun(){
    this.state.funType = this.setState( {funType : 'Sin'});
  }

  quadFun(){
    this.state.funType = this.setState( {funType : 'Quadratic'});
  }

  normFun(){
    this.state.funType = this.setState( {funType : 'Random'});
  }

  render() {

    return (

      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row> 
                  <Col md="2">
                    <Button>
                      Functions
                      <ButtonGroup>
                        <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                          <DropdownToggle caret className="p-0" color="transparent">
                            <i></i>
                          </DropdownToggle>
                          <DropdownMenu left>
                            <DropdownItem onClick={this.sinFun}>Sin</DropdownItem>
                            <DropdownItem onClick={this.quadFun}>Quadratic</DropdownItem>
                            <DropdownItem onClick={this.normFun}>Random</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </ButtonGroup>
                    </Button>
                  </Col>

                    <Col xs="2" md="3">
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Param 1:</InputGroupText>
                          </InputGroupAddon>
                          <Input value={this.state.par1} onChange={e1 => this.upValuePar1(e1)} type="text" size="10" id="ccnumber" name="parametro1" autoComplete="name"/>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs="2" md="3">
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Param 2:</InputGroupText>
                          </InputGroupAddon>
                          <Input value={this.state.par2} onChange={e2 => this.upValuePar2(e2)} type="text" size="10" id="ccnumber" name="parametro2" autoComplete="name"/>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs="2" md="3">
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Param 3:</InputGroupText>
                          </InputGroupAddon>
                          <Input value={this.state.par3} onChange={e3 => this.upValuePar3(e3)} type="text" size="10" id="ccnumber" name="parametro3" autoComplete="name"/>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  <Button className="icon-control-play" onClick={this.gerar} size="lg">GO!</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle className="mb-0">{this.state.funType} Grafic</CardTitle>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={this.state.dado} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

