import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompañiaComponent } from './compañia.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'compañia',
      urls: [
        { title: '', url: '/compañia' },
        { title: 'compañia' }
      ]
    },
    component: CompañiaComponent
  }
];

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompañiaComponent]
})
export class CompañiaModule { }





