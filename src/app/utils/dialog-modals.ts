import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogTokenComponent } from '@app/shared/dialog-token/dialog-token.component';
import { ApiService } from '@app/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class DialogModals {

    constructor(private dialog: MatDialog, private router: Router, private service: ApiService) { }

    public error(message: string, secondMessage?: string, callback?: Function): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                icon: "warning",
                message: message,
                secondMessage: secondMessage,
                confirmationText: "Ok",
                title: "Atenção",
                type: "warning",
                showCancel: false
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if(callback){
                    callback();
                }
            }
        });
    }

    public warning(message: string, secondMessage?: string, callback?: Function): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                icon: "warning",
                message: message,
                secondMessage: secondMessage,
                confirmationText: "Ok",
                title: "Atenção",
                type: "warning",
                showCancel: true
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if(callback){
                    callback();
                }
            }
        });
    }

    public succes(message: string, secondMessage?: string, callback?: Function): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                icon: "check",
                message: message,
                secondMessage: secondMessage,
                confirmationText: "Ok",
                title: "Atenção",
                type: "success",
                showCancel: false
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if(callback instanceof Function){
                    callback();
                }
            }
        });
    }

    public loginError(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                icon: "warning",
                message: "Login necessário para continuar.",
                confirmationText: "Login",
                title: "Atenção",
                type: "warning"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigateByUrl("login");
            }
        });
    }

    public authenticateUser(user: any, callback?: Function): void {
        const dialogRef = this.dialog.open(DialogTokenComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.service.ConfirmToken(result, user.email).subscribe(response => {
                    if (response) {
                        user.isConfirmed = response;
                        sessionStorage.setItem('user', JSON.stringify(user));
                        this.succes("Confirmação realizada com sucesso!", null, callback());
                    }
                });
            }
        });
    }
}