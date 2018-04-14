import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private gs: GalleryService, public dialog: MatDialog) { }

  glist:any;
  olist:any;

  slider = "slider";
  other = "other";

  getSliderList(){
  	this.gs.getSliderList().subscribe((r:any)=>{
  		this.glist = r;
  	})
  }

  getOtherList(){
  	this.gs.getOtherList().subscribe((r:any)=>{
  		this.olist = r;
  	})
  }

  ngOnInit() {
  	this.getSliderList();
  	this.getOtherList();
  }

  uploadSlider(folder){
  	let dialogRef = this.dialog.open(UploadSlider, {
      width: '500px',
      height: '200px',
      data: folder
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSliderList();
      this.getOtherList();
    });
  }

  deleteSliderImg(img){
  	let dialogRef = this.dialog.open(DeleteImg, {
      width: '500px',
      height: '300px',
      data: {"img":img, "folder": "slider"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSliderList();
    });
  }

  deleteOtherImg(img){
  	let dialogRef = this.dialog.open(DeleteImg, {
      width: '500px',
      height: '300px',
      data: {"img":img, "folder": "other"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOtherList();
    });
  }

}


@Component({
  selector: 'upload-slider',
  templateUrl: './upload-slider.html',
  styleUrls: ['./upload-slider.css']
})
export class UploadSlider implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadSlider>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private gs: GalleryService,
    public snackBar: MatSnackBar
    ) { }

  	uploading:boolean = false;
  	

  	ngOnInit(){
  	
  	}

  	uploadSliderImg(photo:any, folder){
  		this.uploading = true;
  		this.gs.uploadPhoto(photo, folder).subscribe((r:any)=>{
  			if (r == "Uploaded") {
  				this.uploading = false
  				this.onNoClick();
  				this.snackBar.open("Upoto Uploaded", "close", {
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


@Component({
  selector: 'delete-img',
  templateUrl: './delete-img.html',
  styleUrls: ['./delete-img.css']
})
export class DeleteImg implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteImg>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private gs: GalleryService,
    public snackBar: MatSnackBar
    ) { }

  	uploading:boolean = false;
  	

  	ngOnInit(){
  	
  	}

  	deleteSliderImg(img, folder){
  		this.gs.deleteSliderImg(img, folder).subscribe((r:any)=>{
  			if (r == "success") {
  				this.onNoClick();
  				this.snackBar.open("Photo Deleted", "close", {
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
