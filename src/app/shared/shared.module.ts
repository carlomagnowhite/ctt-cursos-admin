import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TableComponent } from "./table/table.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    TableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    TableComponent
  ]
})

export class SharedModule { }
