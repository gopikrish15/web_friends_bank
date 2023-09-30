import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../services/transaction.service';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {

  transactionForm: FormGroup;
  queryParams: any = {};
  tableDataList: any;
  page: number = 1;
  totalCount1: number = 0;
  length: number = 10;
  limit: number = 5;
  offset: number = 0;
  currentPage: number = 1;
  id: any;
  isSubmitted: boolean = false;
  isUpdate: boolean;
  tableDataList1: any;
  totalCreditAmount: any; 
  route: any;
  transaction: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private transactionservice: TransactionService,
    private memberService: MemberService

  ) { this.queryParams = {
    offset: this.offset,
    limit: this.limit
  }}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      memberName: [''],
      date: [''],
      amount: [''],
      payment_method: [''],
      payment_status: [''],
      payment_type: [''],
    });

    this.getMembers(this.queryParams);
    this.getAllTransactions(this.queryParams);
    this.loadPage();
  }

  getAllTransactions(obj: any) {
    this.transactionservice.getAllTransactions(this.queryParams).subscribe(res => {
      this.tableDataList1 = res.transactions;
      this.totalCount1 = res.totalCount;
      this.totalCreditAmount = res.totalAmount;

      // res.transactions.forEach((transaction) => {
      //   if (transaction.payment_status === 'Pending') {
      //     const createdDateTime = new Date(transaction.createdAt);
      //     const delay = 120000;
      //     setTimeout(() => {
      //       transaction.penalty += 100;
      //     }, createdDateTime.getTime() + delay - Date.now());
      //   }
      // });
    },
      error => {
        console.log("data", error)
      });
  }

  onFormSubmit() {
    this.modalService.dismissAll();
    if (this.id) {
      this.transactionservice.updateTransaction(this.id, this.transactionForm.value)
        .subscribe({
          next: ((result) => {
            this.getAllTransactions(this.queryParams);
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
    this.transactionservice.createTransaction(this.transactionForm.value).subscribe(
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
    this.transactionForm.reset();
  }

  openCreateModal(transactionBox: any, id: any) {
    this.id = undefined;
    this.isUpdate = false;
    this.isSubmitted = false;
    this.resetForm();
    this.modalService.open(transactionBox, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'md',
      windowClass: 'modal-holder',
    });

    if (id) {
      this.id = id;
      this.isUpdate = true;
      this.transactionservice.getTransactionById(id).subscribe({
        next: (result) => {
          this.transactionForm.patchValue(result);
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
    this.transactionservice.deleteTransactions(this.id).subscribe({
      next:(res:any) => {
        this.toastrService.success("Deleted", "Deleted successfully");
        this.getAllTransactions(this.queryParams);
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
    this.getAllTransactions(this.queryParams);
  }



}
