import { Component, OnInit, Inject } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private shs: ScheduleService, public dialog: MatDialog) { }



  displayedColumns = ['sno', 'batch', 'btime', 'day', 'edit', 'delete'];
  schedule:any;
  dataSource:any;

  getList(){
  	this.shs.getSchedule().subscribe((r:any)=>{
  		this.schedule = r;
  		this.dataSource = r;
  	})
  }


  ngOnInit() {
  	this.shs.getSchedule().subscribe((r:any)=>{
  		this.schedule = r;
  		this.dataSource = r;
  	})
  }

  edit(id){
  	let dialogRef = this.dialog.open(BatchEdit, {
      width: '600px',
      height: '600px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getList();
    });
  }

  delete(id){
  	let dialogRef = this.dialog.open(BatchDelete, {
      width: '400px',
      height: '200px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getList();
    });
  }

  add(){
  	let dialogRef = this.dialog.open(BatchAdd, {
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getList();
    });
  }


}




@Component({
  selector: 'batch-edit',
  templateUrl: './batch-edit.html',
  styleUrls: ['./batch-edit.css']
})
export class BatchEdit implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BatchEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private shs: ScheduleService,
    public snackBar: MatSnackBar
    ) { }

  	theBatch:any;
  	
  	updating:any;

  	ngOnInit(){
  		this.updating = true;
  		this.shs.getTheSchedule(this.data).subscribe((r:any)=>{
  			this.theBatch = JSON.parse(r);
  			this.updating = false;
  		})
  	}

  	updateSchedule(id, batch, btime, day){
  		this.updating = true;
  		this.shs.updateSchedule(id, batch, btime, day).subscribe((r:any)=>{
  			this.shs.getTheSchedule(this.data).subscribe((r:any)=>{
	  			this.theBatch = JSON.parse(r);
	  			this.updating = false;
	  			this.snackBar.open("Updated", "close",{
	  				duration: 2500
	  			});
	  		})
  		})
  	}

  	onNoClick(): void {
	    this.dialogRef.close();
	  }

}


@Component({
  selector: 'batch-delete',
  templateUrl: './batch-delete.html',
  styleUrls: ['./batch-delete.css']
})
export class BatchDelete implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BatchDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private shs: ScheduleService,
    public snackBar: MatSnackBar
    ) { }

  	

  	ngOnInit(){
  		
  	}

  	deleteSchedule(id){
  		this.shs.deleteSchedule(id).subscribe((r:any)=>{
  			if (r == "success") {
  				this.snackBar.open("Deleted", "close",{
	  				duration: 2500
	  			});
  				this.onNoClick();
  			}
  		})
  	}

  	onNoClick(): void {
	    this.dialogRef.close();
	  }
  	

}



@Component({
  selector: 'batch-add',
  templateUrl: './batch-add.html',
  styleUrls: ['./batch-add.css']
})
export class BatchAdd implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BatchAdd>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private shs: ScheduleService,
    public snackBar: MatSnackBar
    ) { }

  	updating:boolean = false;

  	ngOnInit(){
  		
  	}

  	addSchedule(batch, btime, day){
  		this.updating = true;
  		this.shs.addSchedule(batch, btime, day).subscribe((r:any)=>{
  			if (r == "success") {
  				this.updating = false;
  				this.onNoClick();
  				this.snackBar.open("Deleted", "close",{
	  				duration: 2500
	  			});
  			}
  		})
  	}

  	onNoClick(): void {
	    this.dialogRef.close();
	  }

}

