import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-token',
  templateUrl: './dialog-token.component.html',
  styleUrls: ['./dialog-token.component.scss']
})
export class DialogTokenComponent implements OnInit {

  public token: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {},
              private dialogRef: MatDialogRef<DialogTokenComponent>
  ) { }

  ngOnInit(): void {
  }

  public onConfirm(): void {
    this.dialogRef.close(this.token);
  }
}

