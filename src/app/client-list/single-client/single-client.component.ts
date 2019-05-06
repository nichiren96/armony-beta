import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/Client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.css']
})
export class SingleClientComponent implements OnInit {

  clientForm: FormGroup;
  client: Client;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private clientService: ClientsService,
              private router: Router) { }

  ngOnInit() {
  
    const id = this.route.snapshot.params['id'];
    this.clientService.getSingleClient(+id).then(
      (client: Client) => {
        this.client = client;
      }
    );
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

  onUpdateClient() {
    const nationality = this.clientForm.get('nationality').value;
    const sex = this.clientForm.get('sex').value;
    const firstname = this.clientForm.get('firstname').value;
    const lastname = this.clientForm.get('lastname').value;
    const phone = this.clientForm.get('phone').value;
    const passport = this.clientForm.get('passport').value;
    const remark = this.clientForm.get('remark').value;

    const client = new Client(sex, nationality, firstname, lastname, phone, passport, remark);

    this.clientService.updateClient(client);

    this.router.navigate(['/clients'])
  }


  onBack() {
    this.router.navigate(['/clients']);
  }

}
