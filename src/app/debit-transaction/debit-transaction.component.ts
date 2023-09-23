import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from 'src/app/services/member.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DebitService } from '../services/debit.service';

@Component({
  selector: 'app-debit-transaction',
  templateUrl: './debit-transaction.component.html',
  styleUrls: ['./debit-transaction.component.scss']
})
export class DebitTransactionComponent {


  debitForm: FormGroup;
  queryParams: any = {};
  tableDataList: any;
  page: number = 1;
  totalCount2: number = 0;
  length: number = 10;
  limit: number = 5;
  offset: number = 0;
  currentPage: number = 1;
  id: any;
  isSubmitted: boolean = false;
  isUpdate: boolean;
  tableDataList2: any;
  totalDebitAmount: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private transactionservice: TransactionService,
    private memberService: MemberService,
    private debitService: DebitService

  ) { this.queryParams = {
    offset: this.offset,
    limit: this.limit
  }}

  ngOnInit(): void {
    this.debitForm = this.fb.group({
      memberName: [''],
      date: [''],
      amount: [''],
      payment_method: [''],
      payment_status: [''],
      payment_type: [''],
    });

    this.getMembers(this.queryParams);
    this.getAllDebits(this.queryParams);
    this.loadPage();
  }

  getAllDebits(obj: any) {
    this.debitService.getAllDebits(this.queryParams).subscribe(res => {
      this.tableDataList2 = res.debits;
      this.totalDebitAmount = 0;

    for (const debit of this.tableDataList2) {
      if (debit.payment_type === 'received') {
          this.totalDebitAmount += debit.amount;
      }
    }
      this.totalCount2 = res.totalCount;
    },
      error => {
        console.log("data", error)
      });
  }

  onFormSubmit() {
    this.modalService.dismissAll();
    if (this.id) {
      this.debitService.updateDebit(this.id, this.debitForm.value)
        .subscribe({
          next: ((result) => {
            this.getAllDebits(this.queryParams);
            this.isSubmitted = false;
            this.resetForm();
            this.modalService.dismissAll();
            this.toastrService.success('Success', "Updated Successfully", { closeButton: true });
            setTimeout(() => {
              window.location.reload();
            }, 3000);

          }),
          error: (error) => {
            this.toastrService.error(error.error.message);
          }
        });
    } else {
    this.debitService.createDebit(this.debitForm.value).subscribe(
      (rsp) => {
        this.toastrService.success("Transaction Crearted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (error) => {
        this.toastrService.error(error.message);
      }
    )};
  }

  resetForm(): void {
    this.debitForm.reset();
  }

  openCreateModal(debitBox: any, id: any) {
    this.id = undefined;
    this.isUpdate = false;
    this.isSubmitted = false;
    this.resetForm();
    this.modalService.open(debitBox, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'md',
      windowClass: 'modal-holder',
    });

    if (id) {
      this.id = id;
      this.isUpdate = true;
      this.debitService.getDebitById(id).subscribe({
        next: (result) => {
          this.debitForm.patchValue(result);
        }
      });
    }
  }

  deleteUserModal(modal: any, id: any) {
    this.id = id;
    this.modalService.open(modal, {
      backdrop: "static",
      keyboard: false,
      centered: false,
      size: "md",
      windowClass: "modal-holder",
    });
  }

  onDelete(){
    this.debitService.deleteDebits(this.id).subscribe({
      next:(res:any) => {
        this.toastrService.success("Deleted", "Deleted successfully");
        this.getAllDebits(this.queryParams);
        this.modalService.dismissAll();
      },
      error: (error) => {
        this.toastrService.error(error.error.message);
      }
    });
  }

  getMembers(obj: any) {
    this.memberService.getMembers(this.queryParams).subscribe(res => {
      this.tableDataList = res.members;
    },
      error => {
        console.log("data", error)
      });
  }

  loadPage(page?: any) {
    this.page = page.page? page.page : 1;
    this.offset = (this.page - 1) * this.limit;
    this.queryParams['offset'] = this.offset;
    this.getAllDebits(this.queryParams);
  }

}
