import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../models/Client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      nationality: ['', Validators.required],
      sex: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: ['', Validators.required],
      passport: ['', Validators.required],   
      remark: ['', Validators.required],   
    });
  }

  onSaveClient() {
    const nationality = this.clientForm.get('nationality').value;
    const sex = this.clientForm.get('sex').value;
    const firstname = this.clientForm.get('firstname').value;
    const lastname = this.clientForm.get('lastname').value;
    const phone = this.clientForm.get('phone').value;
    const passport = this.clientForm.get('passport').value;
    const remark = this.clientForm.get('remark').value;

    const newClient = new Client(sex, nationality, firstname, lastname, phone, passport, remark);

    this.clientService.createNewClient(newClient);

    this.router.navigate(['/clients'])
  }


  onBack() {
    this.router.navigate(['/clients']);
  }


}
