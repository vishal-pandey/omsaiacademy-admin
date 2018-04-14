import { Component, OnInit, Inject } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(private ds: DownloadService, public dialog: MatDialog) { }

  englishlist:any;
  otherlist:any;

  english = "english";
  other = "other";

  getEnglishList(){
  	this.ds.getFileList("english").subscribe((r:any)=>{
  		this.englishlist = r;
  		console.log(r);
  	})
  }

  getOtherList(){
  	this.ds.getFileList("other").subscribe((r:any)=>{
  		this.otherlist = r;
  		console.log(r);
  	})
  }

  ngOnInit() {
  	this.getEnglishList();
  	this.getOtherList();
  }


  uploadFile(folder){
  	let dialogRef = this.dialog.open(FileUpload, {
      width: '500px',
      height: '200px',
      data: folder
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEnglishList();
      this.getOtherList();
    });
  }

  deleteFile(file, folder){
  	let dialogRef = this.dialog.open(FileDelete, {
      width: '500px',
      height: '200px',
      data: {"file":file, "folder": folder}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEnglishList();
      this.getOtherList();
    });
  }





}




@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.html',
  styleUrls: ['./file-upload.css']
})
export class FileUpload implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FileUpload>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ds: DownloadService,
    public snackBar: MatSnackBar
    ) { }

  	
  	ngOnInit(){
  		
  	}

  	uploading:boolean = false;

	  onNoClick(): void {
	    this.dialogRef.close();
	  }

	  uploadFile(file, folder){
	  	this.uploading = true;
	  	this.ds.uploadFile(file, folder).subscribe((r:any)=>{
	  		if (r == "Uploaded") {
	  			this.uploading = false;
	  			this.onNoClick();
  				this.snackBar.open("File Uploaded", "close", {
	  				duration: 1000
	  			})
	  		}else{
	  			console.log(r);
	  		}
	  	})
	  }

}

@Component({
  selector: 'file-delete',
  templateUrl: './file-delete.html',
  styleUrls: ['./file-delete.css']
})
export class FileDelete implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FileDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ds: DownloadService,
    public snackBar: MatSnackBar
    ) { }

  	
  	ngOnInit(){
  		
  	}

  	deleteFile(file, folder){
  		this.ds.deleteFile(file, folder).subscribe((r:any)=>{
	  		if (r == "success") {
	  			this.onNoClick();
  				this.snackBar.open("File Deleted", "close", {
	  				duration: 1000
	  			})
	  		}else{
	  			console.log(r);
	  		}
	  	})
  	}

	  onNoClick(): void {
	    this.dialogRef.close();
	  }

}
