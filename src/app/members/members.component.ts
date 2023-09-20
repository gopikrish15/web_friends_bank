import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../services/memberservice';
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  memberForm: FormGroup;
  queryParams: any = {};
  tableDataList: any;
  page: number = 1;
  totalCount: number = 0;
  
  length: number = 10;
  limit: number = 5;
  offset: number = 0;
  currentPage: number = 1;
  id: any;
  entity: any;
  isSubmitted: boolean;
  isUpdate: boolean;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private memberService: MemberService
  ) {
    this.queryParams = {
      offset: this.offset,
      limit: this.limit
    }
  }

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: [''],
      plan: [''],
    });

    this.getMembers(this.queryParams);
    this.loadPage(this.page);
  }


  getMembers(obj: any) {
    this.memberService.getMembers(this.queryParams).subscribe(res => {
      this.tableDataList = res.members;
      this.totalCount = res.totalCount;
    },
      error => {
        console.log("data", error)
      });
  }


  openCreateModal(modalBox: any, id: any) {
    this.id = undefined;
    this.isUpdate = false;
    this.isSubmitted = false;
    this.resetForm();
    this.modalService.open(modalBox, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'md',
      windowClass: 'modal-holder',
    });

    if (id) {
      this.id = id;
      this.isUpdate = true;
      this.memberService.getMembersById(id).subscribe({
        next: (result) => {
          this.memberForm.patchValue(result);
        }
      });
    }
  }


  resetForm(): void {
    this.memberForm.reset();
  }


  onFormSubmit() {
    this.modalService.dismissAll();
    if (this.id) {
      this.memberService.updateMembers(this.id, this.memberForm.value)
        .subscribe({
          next: ((result) => {
            this.getMembers(this.queryParams);
            this.isSubmitted = false;
            this.resetForm();
            this.modalService.dismissAll();
            this.toastrService.success('Success', "Updated Successfully", { closeButton: true });

          }),
          error: (error) => {
            this.toastrService.error(error.error.message);
          }
        });
    } else {

    this.memberService.createMembers(this.memberForm.value).subscribe(
      (rsp) => {
        this.toastrService.success("Member Profile Crearted Successfully");
        const formValues = this.memberForm.getRawValue();
        const jsonData = JSON.stringify(formValues);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (error) => {
        this.toastrService.error(error.message);
      }
    )};
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  loadPage(page?: any) {
    this.page = page.page? page.page : 1;
    this.offset = (this.page - 1) * this.limit;
    this.queryParams['offset'] = this.offset;
    this.getMembers(this.queryParams);
  }

}
