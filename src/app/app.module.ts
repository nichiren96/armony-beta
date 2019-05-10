import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { SingleCompanyComponent } from './company-list/single-company/single-company.component';
import { CompanyFormComponent } from './company-list/company-form/company-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { CompaniesService } from './services/companies.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './product-list/single-product/single-product.component';
import { ProductFormComponent } from './product-list/product-form/product-form.component';
import { ProductsService } from './services/products.service';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-list/order-form/order-form.component';
import { SingleOrderComponent } from './order-list/single-order/single-order.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-list/client-form/client-form.component';
import { SingleClientComponent } from './client-list/single-client/single-client.component';
import { FooterComponent } from './footer/footer.component';
import { ClientsService } from './services/clients.service';
import { CategoryListComponent } from './category-list/category-list.component';
import { SingleCategoryComponent } from './category-list/single-category/single-category.component';
import { CategoryFormComponent } from './category-list/category-form/category-form.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { SingleHotelComponent } from './hotel-list/single-hotel/single-hotel.component';
import { HotelFormComponent } from './hotel-list/hotel-form/hotel-form.component';
import { RoomListComponent } from './room-list/room-list.component';
import { SingleRoomComponent } from './room-list/single-room/single-room.component';
import { RoomFormComponent } from './room-list/room-form/room-form.component';
import { CategoriesService } from './services/categories.service';
import { HotelsService } from './services/hotels.service';
import { RoomsService } from './services/rooms.service';
import { FaresService } from './services/fares.service';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingFormComponent } from './booking-list/booking-form/booking-form.component';
import { BookingsService } from './services/bookings.service';
import { SingleBookingComponent } from './booking-list/single-booking/single-booking.component';
import { FareListComponent } from './fare-list/fare-list.component';
import { SingleFareComponent } from './fare-list/single-fare/single-fare.component';
import { FareFormComponent } from './fare-list/fare-form/fare-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './loader/loader.component';
import { SearchBookingComponent } from './booking-list/search-booking/search-booking.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'products', canActivate: [AuthGuardService], component: ProductListComponent },
  { path: 'products/new', canActivate: [AuthGuardService], component: ProductFormComponent },
  { path: 'products/view/:id', canActivate: [AuthGuardService], component: SingleProductComponent },
  { path: 'clients', canActivate: [AuthGuardService], component: ClientListComponent},
  { path: 'clients/new', canActivate: [AuthGuardService], component: ClientFormComponent},
  { path: 'clients/view/:id', canActivate: [AuthGuardService], component: SingleClientComponent},
  { path: 'categories', canActivate: [AuthGuardService], component: CategoryListComponent},
  { path: 'categories/new', canActivate: [AuthGuardService], component: CategoryFormComponent},
  { path: 'categories/view/:id', canActivate: [AuthGuardService], component: SingleCategoryComponent},
  { path: 'hotels', canActivate: [AuthGuardService], component: HotelListComponent},
  { path: 'hotels/new', canActivate: [AuthGuardService], component: HotelFormComponent},
  { path: 'hotels/view/:id', canActivate: [AuthGuardService], component: SingleHotelComponent},
  { path: 'rooms', canActivate: [AuthGuardService], component: RoomListComponent},
  { path: 'rooms/new', canActivate: [AuthGuardService], component: RoomFormComponent},
  { path: 'rooms/view/:id', canActivate: [AuthGuardService], component: SingleRoomComponent},
  { path: 'bookings', canActivate: [AuthGuardService], component: BookingListComponent},
  { path: 'bookings/new', canActivate: [AuthGuardService], component: BookingFormComponent},
  { path: 'bookings/view/:id', canActivate: [AuthGuardService], component: SingleBookingComponent},
  { path: 'fares', canActivate: [AuthGuardService], component: FareListComponent},
  { path: 'fares/new', canActivate: [AuthGuardService], component: FareFormComponent},
  { path: 'fares/view/:id', canActivate: [AuthGuardService], component: SingleFareComponent},
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full'},
  { path: '**', redirectTo: 'auth/signin'},
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CompanyListComponent,
    SingleCompanyComponent,
    CompanyFormComponent,
    SidebarComponent,
    HeaderComponent,
    ProductListComponent,
    SingleProductComponent,
    ProductFormComponent,
    OrderListComponent,
    OrderFormComponent,
    SingleOrderComponent,
    ClientListComponent,
    ClientFormComponent,
    SingleClientComponent,
    FooterComponent,
    CategoryListComponent,
    SingleCategoryComponent,
    CategoryFormComponent,
    HotelListComponent,
    SingleHotelComponent,
    HotelFormComponent,
    RoomListComponent,
    SingleRoomComponent,
    RoomFormComponent,
    BookingListComponent,
    BookingFormComponent,
    SingleBookingComponent,
    FareListComponent,
    SingleFareComponent,
    FareFormComponent,
    DashboardComponent,
    LoaderComponent,
    SearchBookingComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    CompaniesService,
    ProductsService,
    AuthGuardService,
    ClientsService,
    CategoriesService,
    HotelsService,
    RoomsService,
    FaresService,
    BookingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
