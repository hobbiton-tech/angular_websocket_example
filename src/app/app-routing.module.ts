import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokersComponent } from './brokers/brokers.component';

const routes: Routes = [
  { path: 'brokers', component: BrokersComponent },
  /*{
    path: 'todos',
    loadChildren: () =>
      import('./todos/todos.module').then((m) => m.TodosModule),
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
