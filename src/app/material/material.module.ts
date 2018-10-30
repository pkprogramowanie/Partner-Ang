import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatDialogModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatCardModule,
    Material.MatGridListModule,
    Material.MatNativeDateModule,
    Material.MatPaginatorModule,
    Material.MatSnackBarModule,
    Material.MatSortModule,
    Material.MatTableModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
  ],
  exports: [
    Material.MatButtonModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatDialogModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatCardModule,
    Material.MatGridListModule,
    Material.MatNativeDateModule,
    Material.MatPaginatorModule,
    Material.MatSnackBarModule,
    Material.MatSortModule,
    Material.MatTableModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
  ],
  declarations: []
})
export class MaterialModule { }
