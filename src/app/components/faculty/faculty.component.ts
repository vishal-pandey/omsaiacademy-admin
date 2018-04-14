import { Component, OnInit, Inject } from '@angular/core';
import { FacultyService } from '../../services/faculty.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  constructor(private fs: FacultyService, public dialog: MatDialog) { }

  faculty:any;

  ngOnInit() {
  	this.fs.getList().subscribe((resylt:any)=>{
  		this.faculty = resylt;
  	})
  }

  openEdit(id): void {
    let dialogRef = this.dialog.open(FacultyEdit, {
      width: '600px',
      height: '600px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fs.getList().subscribe((resylt:any)=>{
	  		this.faculty = resylt;
	  	})
    });
  }

  openAdd(): void {
    let dialogRef = this.dialog.open(FacultyAdd, {
      width: '600px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fs.getList().subscribe((resylt:any)=>{
	  		this.faculty = resylt;
	  	})
    });
  }

  openDelete(id): void {
    let dialogRef = this.dialog.open(FacultyDelete, {
      width: '400px',
      height: '200px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fs.getList().subscribe((resylt:any)=>{
	  		this.faculty = resylt;
	  	})
    });
  }

}

@Component({
  selector: 'faculty-edit',
  templateUrl: './faculty-edit.html',
  styleUrls: ['./faculty-edit.css']
})
export class FacultyEdit implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FacultyEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fs: FacultyService,
    public snackBar: MatSnackBar
    ) { }

  	teacher:any;
  	updating:boolean;

  	ngOnInit(){
  		this.updating = true;
  		this.fs.getTeacher(this.data).subscribe((result:any)=>{
  			this.teacher = JSON.parse(result);
  			this.updating = false;
  		})
  	}

  	sendUpdate(id, name, mobile, quali, about){
  		this.updating = true;
  		this.fs.updateTeacher(id, name, mobile, quali, about).subscribe((result:any)=>{
  			if (result == "success") {
  				this.fs.getTeacher(this.data).subscribe((result:any)=>{
		  			this.teacher = JSON.parse(result);
		  			this.updating = false;
		  			this.snackBar.open("Teacher Updated", "close", {
		  				duration: 1000
		  			})
		  		})
  			}
  		})
  	}

	  onNoClick(): void {
	    this.dialogRef.close();
	  }

    uploadPhoto(photo:any, id:string){
      this.fs.uploadPhoto(photo, id).subscribe((result:any)=>{
        if (result == "Uploaded") {
          this.snackBar.open("Photo Updated", "close", {
            duration: 1000
          })
        }
      });
    }

}




@Component({
  selector: 'faculty-add',
  templateUrl: './faculty-add.html',
  styleUrls: ['./faculty-add.css']
})
export class FacultyAdd implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FacultyAdd>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fs: FacultyService,
    public snackBar: MatSnackBar
    ) { }

  	ngOnInit(){
  		
  	}

  	addTeacher(id, name, mobile, quali, about){
  		if (name) {
	  		this.fs.addTeacher(id, name, mobile, quali, about).subscribe((result:any)=>{
	  			if (result == "success") {
	  				this.snackBar.open("New Teacher Added", "close",{
		  				duration: 2500
		  			});
	  				this.onNoClick();
	  			}
	  		})
  		}else{
  			this.snackBar.open("Please Insert Name", "close",{
  				duration: 2500
  			});
  		}
  	}

	  onNoClick(): void {
	    this.dialogRef.close();
	  }

}





@Component({
  selector: 'faculty-delete',
  templateUrl: './faculty-delete.html',
  styleUrls: ['./faculty-delete.css']
})
export class FacultyDelete implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FacultyDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fs: FacultyService,
    public snackBar: MatSnackBar
    ) { }

  	ngOnInit(){
  		
  	}

  	deleteTeacher(id){
  		this.fs.deleteTeacher(id).subscribe((result:any)=>{
  			if (result == "success") {
  				this.snackBar.open("Teacher Deleted", "close",{
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
  selector: 'snackbar',
  templateUrl: 'snackbar.html',
  styles: [`.example-pizza-party { color: hotpink; }`],
})
export class Snackbar {
	
}
