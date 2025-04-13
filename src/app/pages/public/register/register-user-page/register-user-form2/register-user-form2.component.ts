import { InputPasswordComponent } from './../../../../../components/inputs/input-password/input-password.component';
import { Component, signal } from '@angular/core';
import { ImgTopComponent } from '../../../../../components/img-top/img-top.component';
import { Router, RouterLink } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataFormService } from 'src/app/service/utils/data-form.service';
import { ButtonModule } from 'primeng/button';
import { RegisterusersService } from 'src/app/service/registerusers/registerusers.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/service/auth/auth.service';
import { matchPasswordValidator } from 'src/app/utils/validators/match-password.validator';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register-user-form2',
  standalone: true,
  imports: [
    InputPasswordComponent,
    RouterLink,
    ImgTopComponent,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
  ],
  providers: [Validators, MessageService],
  templateUrl: './register-user-form2.component.html',
  styleUrl: '../../styles/form-page-syles.scss',
})
export class RegisterUserForm2Component {
  formClient: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formsControl: any;
  invalidForm = signal<boolean | undefined>(true);

  constructor(
    private fb: FormBuilder,
    private _dataFormService: DataFormService,
    private _registerUserService: RegisterusersService,
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService
  ) {
    this.formsControl = this._dataFormService.getSharedData();
    this.formClient = fb.group(
      {
        name: this.formsControl.name,
        email: ['', [Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[A-Za-z]).{8,}$')],
        ],
        repitPassword: ['', Validators.required],
        address: this.formsControl.address,
        phone: this.formsControl.phone,
      },
      {
        validators: matchPasswordValidator('password', 'repitPassword'),
      }
    );

    this.formClient.valueChanges.subscribe({
      next: ()=>{
        this.invalidForm.set(this.formClient.get("password")?.invalid ||  this.formClient.hasError('mismatch'))

        console.log(this.invalidForm())
      }
    })
  }
}
