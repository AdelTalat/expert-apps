import { OnInit, AfterViewInit, Component, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['expert-name', 'email', 'country', 'joined-date', 'actions'];
  dataSource = new MatTableDataSource<any>();
  noData;
  name: string;
  email: string;
  countery: string;
  date: string;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('dialog', { static: false }) template: TemplateRef<HTMLElement>;

  constructor(
            public dialogRef: MatDialogRef<any>,
            public dialog: MatDialog,
            private userService: UsersService
    ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers() {
    this.userService.get().subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res;
    }, error => {
      this.noData = error;
      console.log(error);
    });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.template, {
      width: '350px',
    });
  }

  onSubmit(form: NgForm) {
    let data;
    if (form.valid) {
      data = {
        name: form.value.name,
        email: form.value.email,
        address: {
          city: form.value.countery
        },
        phone: form.value.date
      };
      this.dataSource = new MatTableDataSource([...this.dataSource.data, data]);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
      form.reset();
      this.dialog.closeAll();
    }
  }

}
