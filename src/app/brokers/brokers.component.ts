import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css'],
})
export class BrokersComponent implements OnInit {
  //variables
  SockJS: any;
  Stomp: any;
  stompClient: any;
  brokers: any;
  broker: any;

  //form
  getBrokerForm: FormGroup;

  //set headers
  headers = new HttpHeaders().set('Authorization', 'luse@secure123!');

  token_url = 'http://localhost:8080/auth/token';
  websocket_url = 'http://localhost:8080/broker';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //form init
    this.getBrokerForm = this.formBuilder.group({
      broker_id: ['', Validators.required],
    });

    //get token
    this.getToken();
    setTimeout(() => {
      this.sendAllBrokersRequest();
    }, 800);
  }
  //get token
  getToken() {
    console.log('getting token');
    this.http
      .get(this.token_url, { headers: this.headers })
      .subscribe((token_data) => {
        console.log('access_token: ' + token_data);
        this.connectToWebsocket(token_data);
      });
  }

  //connect to websocket
  connectToWebsocket(access_token) {
    var socket = new SockJS(this.websocket_url + '?auth=' + access_token);
    const stomp_this = this; //seth this so stomp can recognise it

    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log('connected: ' + frame);
      stomp_this.stompClient.subscribe('/brokers/all', function (data) {
        if (data.body) {
          stomp_this.brokers = JSON.parse(data.body); //parse the json data as object
        }
      });
      stomp_this.stompClient.subscribe('/brokers/get/result', function (data) {
        if (data.body) {
          stomp_this.broker = JSON.parse(data.body); //parse the json data as object
        }
      });
    });
  }

  sendAllBrokersRequest() {
    this.stompClient.send('/app/brokers');
  }

  sendGetBrokerRequest() {
    console.log('broker id: ' + this.getBrokerForm.value.broker_id);
    let id = this.getBrokerForm.value.broker_id;
    this.stompClient.send('/app/brokers/get', {}, JSON.stringify({ id: id }));
  }
}
