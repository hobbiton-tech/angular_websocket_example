import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { TodoViewComponent } from './todo-view/todo-view.component';

@NgModule({
  declarations: [
    TodosComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    TodoViewComponent,
  ],
  imports: [CommonModule, TodosRoutingModule],
})
export class TodosModule {}
