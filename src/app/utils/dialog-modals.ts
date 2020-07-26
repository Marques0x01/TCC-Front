import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class DialogModals {

    constructor(private dialog: MatDialog, private router: Router) { }

    error(message: string): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                icon: "warning",
                message: message,
                confirmationText: "Ok",
                title: "Atenção",
                type: "warning",
                showCancel: false
            }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    loginError(): void {
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

}