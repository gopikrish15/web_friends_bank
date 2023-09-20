import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../services/memberservice';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  formData = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    date_of_birth: '',
    plan: ''
  };

  queryParams: any = {};
  tableDataList: any;
  page: number = 1;
	totalCount: number = 0;
	length: number = 10;
	limit: number = 5;
	offset: number = 0;
  currentPage: number = 1;
 

  constructor(
    private router : Router,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private memberService: MemberService
  ){
    this.queryParams = {
			offset: this.offset,
			limit: this.limit
		}
  }

  ngOnInit(): void{
    
    this.getMembers(this.queryParams);
    this.loadPage();
  }

  onSubmit() {
    this.modalService.dismissAll();
    this.memberService.createMembers(this.formData).subscribe(
      (rsp) => {
        this.toastrService.success("Customer Profile Crearted Successfully");
        setTimeout(() => {
					window.location.reload();
				}, 3000);
        this.router.navigate(["/members"]);
        
      },
      (error) => {
        this.toastrService.error(error.message);
      }
    );
  }

  getMembers(obj: any){
    this.memberService.getMembers(this.queryParams).subscribe(res => {
			this.tableDataList = res.members;
			this.totalCount = res.totalCount;
      
		},
			error => {
				console.log("data", error)
			});
  }


  openCreateModal(content: any) {
    this.modalService.open(content, {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    size: 'md',
    windowClass: 'modal-holder',
    });
}

closeModal(){
  this.modalService.dismissAll();
}

loadPage(page?: any) {
 
  this.offset = (this.page - 1) * this.limit;
  this.queryParams['offset'] = this.offset;
  this.getMembers(this.queryParams);
}

}
