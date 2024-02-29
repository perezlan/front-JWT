import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    PagesModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
